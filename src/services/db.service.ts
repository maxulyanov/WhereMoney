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

        // fill categories
        if(Array.isArray(categories)) {
            for(let category of categories) {
                let { keys, mask, values } = this.prepareData(category);
                this.sqlService.query(`INSERT INTO 'categories' (${keys}) VALUES (${mask});`, values);
            }
        }

        // fill settings



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