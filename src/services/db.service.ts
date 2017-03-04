/**
 * Created by 1 on 03.11.2016.
 */


'use strict';


import { Injectable } from "@angular/core";

import { SqlService } from './sql.service';
import { MigrationsService } from './migrations.service';
import { LocalStorage } from '../libs/LocalStorage';
import { Utils } from '../libs/Utils';

import { structure } from '../db/structure';
import { categories } from '../data/db/categories';
import { settings } from '../data/db/settings';
import { balance } from '../data/db/balance';



@Injectable()
export class DbService {


    /**
     *
     * @param sqlService
     * @param migrationsService
     */
    constructor(private sqlService: SqlService, private migrationsService: MigrationsService) {}


    /**
     *
     */
    public initDataBase(): any {
        return new Promise((resolve) => {
            if (structure != null && typeof structure.dbName === 'string') {
                this.sqlService.openDb(structure.dbName).then(() => {
                    if(LocalStorage.get('initDataBase') == null) {
                        this.createTables().then(() => {
                            LocalStorage.set('initDataBase', 1);
                            this.migrationsService.start().then(() => resolve())
                        });
                    }
                    this.migrationsService.start().then(() => resolve())
                });
            }
        });
    }


    /**
     *
     * @param data
     * @returns {{keys: string, values: any[], mask: string}}
     */
    public prepareData(data): any {
        return {
            keys: Object.keys(data).join(','),
            values: Utils.getObjectValues(data),
            mask: this.createMask(Object.keys(data))
        }
    }


    /**
     *
     * @param rows
     * @returns {any[]}
     */
    public getCleanResult(rows): any[] {
        let result: any[] = [];
        for(let i = 0; i < rows.length; i++) {
            result.push(rows.item(i));
        }
        return result;
    }


    /**
     *
     */
    private createTables(): any {
        if (structure != null) {
            const all = [];
            for (let table of structure.tables) {
                all.push(this.sqlService.createTable(table.name, table.structure));
            }
            return Promise.all(all).then(() => this.fillBasicData());
        }
    }


    /**
     *
     */
    private fillBasicData(): void {

        let dataGroups = [categories, settings, balance];
        let tablesName = ['categories', 'settings', 'balance'];

        dataGroups.forEach((group, index) => {
            if(Array.isArray(group)) {
                for(let item of group) {
                    let { keys, mask, values } = this.prepareData(item);
                    this.sqlService.query(`INSERT INTO '${tablesName[index]}' (${keys}) VALUES (${mask});`, values);
                }
            }
        });

    }


    /**
     *
     * @param array
     * @returns {string}
     */
    private createMask(array: any[]): string {
        let mask: string = '';
        if(array.length > 0) {
            array.forEach((item, index) => {
               if(index === 0) {
                   mask += '?';
               }
               else {
                   mask += ',?'
               }
            });
        }

        return mask;
    }


}