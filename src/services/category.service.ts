/**
 * Created by 1 on 03.11.2016.
 */


'use strict';


import { Injectable } from "@angular/core";

import { SqlService } from './sql.service';


@Injectable()
export class CategoryService {


    /**
     *
     * @param sqlService
     */
    constructor(private sqlService: SqlService) {
    }



    public getAllCategories(): any {
        return this.sqlService.query("SELECT * FROM categories", [])
    }


    public getCategories(type: number): any {
        return this.sqlService.query(`SELECT * FROM categories WHERE type = ${type}`, [])
    }


}