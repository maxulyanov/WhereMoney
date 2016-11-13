/**
 * Created by 1 on 03.11.2016.
 */


'use strict';


import { Injectable } from "@angular/core";

import { SqlService } from './sql.service';
import { structure } from '../db/structure';


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
    public initDataBase(): void {
       this.createTables();
    }


    /**
     *
     */
    private createTables(): void {
        if(structure != null) {
            this.sqlService.createDb(structure.name);
            for(let table of structure.tables) {
                this.sqlService.createTable(table.name, table.structure);
            }
        }
    }


}