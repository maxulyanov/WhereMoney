/**
 * Created by 1 on 03.11.2016.
 */


'use strict';


import { Injectable } from "@angular/core";

import { SqlService } from './sql.service';
import { LocalStorage } from '../libs/LocalStorage';
import { structure } from '../db/structure';


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
     */
    private createTables(): void {
        if (structure != null) {
            for (let table of structure.tables) {
                this.sqlService.createTable(table.name, table.structure);
            }
        }
    }


}