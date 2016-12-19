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
import { DbService } from './db.service';


@Injectable()
export class UserService {


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
    public getBalance(): any {
        return new Promise((resolve, reject) => {
            let promise: any = this.sqlService.query("SELECT * FROM balance WHERE id=1", []);
            promise.then(
                (data) => {
                    if(data != null && data.res) {
                        resolve(this.dbService.getCleanResult(data.res.rows)[0]);
                    }
                },
                (data) => {
                    reject(data.err.message);
            });
        });
    }


    /**
     *
     * @param value
     * @returns {Promise<T>}
     */
    public updateBalance(value: number): any {
        return new Promise((resolve, reject) => {
            let promise = this.sqlService.query(`UPDATE balance SET value = ${value} WHERE id=1`);
            promise.then(
                () => {
                    resolve();
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
    public getSettings(): any {
        return new Promise((resolve, reject) => {
            let promise: any = this.sqlService.query("SELECT * FROM settings", []);
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
     * @param data
     * @returns {Promise<T>}
     */
    public updateSettings(data): any {
        return new Promise((resolve, reject) => {
            let { value, id } = data;
            let promise = this.sqlService.query(`
            UPDATE settings 
            SET value = ${value}
            WHERE id=${id}`);
            promise.then(
                () => {
                    resolve('Ваши настройки обновлены');
                },
                (data) => {
                    reject(data.err.message);
                });
        });
    }




}