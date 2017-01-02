/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 22:43
 */


'use strict';



import { Injectable } from "@angular/core";

import { SqlService } from './sql.service';
import { DbService } from "./db.service";


@Injectable()
export class TransactionService {


    /**
     *
     * @param sqlService
     * @param dbService
     */
    constructor(private sqlService: SqlService, private dbService: DbService) {}


    /**
     *
     * @param data
     */
    public addTransaction(data): any {
        return new Promise((resolve, reject) => {
            let { keys, mask, values } = this.dbService.prepareData(data);
            let promise = this.sqlService.query(`INSERT INTO transactions (${keys}) VALUES (${mask});`, values);
            promise.then(
                (data) => {
                    if(data.res.rowsAffected) {
                        resolve('Запись успешно добавлена');
                    }
                },
                (data) => {
                    reject(data.err.message);
                });
        });

    }


    /**
     *
     * @param limit
     * @param offset
     * @param startDate
     * @param endDate
     * @param type
     * @returns {Promise<any>}
     */
    public getTransactions(limit: number = 20, offset: number = 0, startDate: number = +new Date(), endDate: number = 0, type: any = null): any {

        let queryType: string = '';
            if(type != null) {
            queryType = `AND type = ${type}`;
        }

        return new Promise((resolve, reject) => {

            let promise = this.sqlService.query(`
                SELECT category_id, name, description, sum, created, type, slug 
                FROM transactions 
                INNER JOIN categories 
                ON transactions.category_id = categories.id
                WHERE created < ${startDate}
                AND created > ${endDate}
                ${queryType}
                ORDER BY created DESC
                LIMIT ${limit}
                OFFSET ${offset}`, []);

            promise.then(
                (data) => {
                    if(data != null && data.res) {
                        if(data != null && data.res) {
                            resolve(this.dbService.getCleanResult(data.res.rows));
                        }
                    }
                },
                (data) => {
                    reject(data.err.message);
                });
        });

    }


    /**
     *
     * @param date
     * @returns {Promise<T>}
     */
    public getCountTransactions(date: number): any {
        return new Promise((resolve, reject) => {
            this.getTransactions(2e10, 0, date).then(
                (data) => {
                    if (data != null) {
                        resolve(data.length);
                    }
                },
                (data) => {
                    reject(data.err.message);
                });
        })
    }


    /**
     *
     * @param transactions
     * @returns {number}
     */
    public getSumTransactions(transactions: any): number {
        let result: number = 0;
        for(let key in transactions) {
            if(transactions.hasOwnProperty(key)) {
                result += transactions[key].sum;
            }
        }

        return result;
    }

}