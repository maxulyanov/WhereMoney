/**
 * Created by 1 on 03.11.2016.
 */


'use strict';


import { Injectable } from "@angular/core";

import { SqlService } from './sql.service';
import { config } from '../config/';


@Injectable()
export class DbService {


    /**
     *
     * @param sqlService
     */
    constructor(private sqlService : SqlService) {}


    /**
     *
     */
    initDataBase() {
        if(config != null && config.db != null) {
            let db = config.db;
            this.sqlService.createDb(db.name);

            for(let table of db.tables) {
                this.sqlService.createTable(table.name, table.structure);
            }
        }
    }


}