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
    public updateBudget(value: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const { year, week } = this.dateService.getWeekNumber();
            const startWeek = +this.dateService.getDateStartWeek();
            const data: any = {
                year,
                week,
                start_week: startWeek,
                value
            };

            this.getBudget(year, week)
                .then((budget: any) => {
                    let promise: Promise<any>;

                    if(budget == null) {
                        data.rest = +value;
                        this.getPreviewRest().then((previewRest) => {
                            data.rest += previewRest;
                            const { keys, mask, values } = this.dbService.prepareData(data);
                            promise = this.sqlService.query(`INSERT INTO budget (${keys}) VALUES (${mask});`, values);
                        });
                    }
                    else {
                        this.getPreviewRest().then(() => {
                            let rest = budget.rest;
                            rest += (value - budget.value);
                            promise = this.sqlService.query(`UPDATE budget SET value = ${value}, rest = ${rest} WHERE week=${week}`);
                        });
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
     * @param value
     * @returns {Promise<T>}
     */
    public updateRestBudget(value: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const { year, week } = this.dateService.getWeekNumber();

            this.getBudget(year, week).then((budget: any) => {
                const rest = budget.rest - value;
                const promise = this.sqlService.query(`UPDATE budget SET rest = ${rest} WHERE week=${week}`);
                promise.then(
                    (data) => {
                        resolve(data);
                    },
                    (data) => {
                        reject(data.err.message);
                    });
            });
        });
    }


    /**
     *
     * @param year
     * @param week
     * @returns {Promise<T>}
     */
    public getBudget(year: number, week: number): Promise<any> {
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


    /**
     *
     * @returns {Promise<T>}
     */
    public getPreviewRest(): Promise<any> {
        return new Promise((resolve) => {
            let startWeek: number = +this.dateService.getDateStartWeek();
            startWeek -= 1e3;
            const { year, week } = this.dateService.getWeekNumber(new Date(startWeek));
            this.getBudget(year, week).then((budget) => {
                resolve(budget.rest);
            }).catch(() => {
                resolve(0);
            });
        });
    }

}