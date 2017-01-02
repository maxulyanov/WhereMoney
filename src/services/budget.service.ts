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
import { DateService } from "./date.service";


@Injectable()
export class BudgetService {


    /**
     *
     * @param sqlService
     * @param dbService
     * @param dateService
     */
    constructor(private sqlService: SqlService, private dbService: DbService, private dateService: DateService) {}


    /**
     *
     * @param value
     * @returns {Promise<T>}
     */
    public updateBudget(value: number): any {
        return new Promise((resolve, reject) => {

            let { year, week } = this.dateService.getWeekNumber();
            let startWeek = +this.dateService.getDateStartWeek();

            let data: any = {
                year,
                week,
                start_week: startWeek,
                value
            };

            this.getBudget(year, week)
                .then((budget: number) => {
                    let { keys, mask, values } = this.dbService.prepareData(data);
                    let promise: any = null;
                    if(budget == null) {
                        promise = this.sqlService.query(`INSERT INTO budget (${keys}) VALUES (${mask});`, values);
                    }
                    else {
                        promise = this.sqlService.query(`UPDATE budget SET value = ${value} WHERE week=${week}`);
                    }
                    promise.then(
                        (data) => {
                            resolve(data);
                        },
                        (data) => {
                            reject(data.err.message);
                        });
                })
                .catch((error) => {resolve(error)});
        });
    }


    /**
     *
     * @param year
     * @param week
     * @returns {Promise<T>}
     */
    public getBudget(year: number, week: number): any {
        return new Promise((resolve, reject) => {
            let promise = this.sqlService.query(`SELECT * FROM budget WHERE year = ${year} AND week = ${week};`, []);
            promise.then(
                (data) => {
                    if(data != null && data.res) {
                        if(data != null && data.res) {
                            resolve(this.dbService.getCleanResult(data.res.rows)[0]);
                        }
                    }
                },
                (data) => {
                    reject(data.err.message);
                });
        });
    }


}