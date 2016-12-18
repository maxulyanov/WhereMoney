/**
 * Created by 1 on 03.11.2016.
 */


'use strict';


import { Injectable } from "@angular/core";

import { SqlService } from './sql.service';
import { DbService } from './db.service';


@Injectable()
export class CategoryService {


    /**
     *
     * @param sqlService
     * @param dbService
     */
    constructor(private sqlService: SqlService, private dbService: DbService) {
    }


    /**
     *
     * @returns {Promise<T>}
     */
    public getAllCategories(): any {
        return new Promise((resolve, reject) => {
            let promise: any = this.sqlService.query("SELECT * FROM categories", []);
            promise.then(
                (data) => {
                    if(data != null && data.res) {
                        resolve( this.dbService.getCleanResult(data.res.rows));
                    }
                },
                (data) => {
                    reject(data.err.message);
                });
        });
    }


    /**
     *
     * @param type
     * @returns {Promise<T>}
     */
    public getCategories(type: number): any {
        return new Promise((resolve, reject) => {
            let promise: any = this.sqlService.query(`SELECT * FROM categories WHERE type = ${type}`, []);
            promise.then(
                (data) => {
                    if(data != null && data.res) {
                        resolve(this.dbService.getCleanResult(data.res.rows));
                    }
                },
                (data) => {
                    reject(data.err.message);
                });
        });
    }


}