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


    /**
     *
     * @param transactions
     * @returns {{}}
     */
    public getCategoriesFromTransactions(transactions: any): any {
        let categories = {};
        if (transactions.length > 0) {
            transactions.forEach((item) => {
                let slug = item.slug;
                if (categories[slug] == null) {
                    categories[slug] = {};
                    categories[slug]['name'] = item.name;
                    categories[slug]['slug'] = item.slug;
                    categories[slug]['type'] = item.type;
                    categories[slug]['sum'] = 0;
                }
                if(item.sum) {
                    categories[slug]['sum'] += item.sum;
                }

            });
        }
        return categories;
    }

}