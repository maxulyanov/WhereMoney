/**
 * Created by 1 on 03.11.2016.
 */


'use strict';


import { Injectable } from "@angular/core";

import { SqlService } from './sql.service';
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
     */
    constructor(private sqlService: SqlService) {
    }


    /**
     *
     */
    public initDataBase(): void {
        if (structure != null && typeof structure.dbName === 'string') {
            this.sqlService.openDb(structure.dbName);
            if(LocalStorage.get('initDataBase') == null) {
                this.createTables();
                LocalStorage.set('initDataBase', 1);
            }
        }
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
     * @param data
     * @returns {any[]}
     */
    public getCleanResult(data): any[] {
        let result: any[] = [];
        for(let i = 0; i < data.length; i++) {
            result.push(data[i]);
        }
        return result;
    }


    /**
     *
     */
    private createTables(): void {
        if (structure != null) {
            let countAllTables = structure.tables.length;
            let countCreatedTabled = 0;
            for (let table of structure.tables) {
                this.sqlService.createTable(table.name, table.structure).then(
                    () => {
                        countCreatedTabled++;
                        if(countAllTables === countCreatedTabled) {
                            this.fillBasicData();
                        }
                    },
                    (err) => {
                        console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
                    }
                );
            }
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