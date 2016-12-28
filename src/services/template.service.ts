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
export class TemplateService {


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
    public addTemplate(data: any): any {
        return new Promise((resolve, reject) => {
            let { keys, mask, values } = this.dbService.prepareData(data);
            let promise = this.sqlService.query(`INSERT INTO templates (${keys}) VALUES (${mask});`, values);
            promise.then(
                (data) => {
                    if(data.res.rowsAffected) {
                        resolve('Шаблон успешно создан');
                    }
                },
                (data) => {
                    reject(data.err.message);
            });
        });
    }


    /**
     *
     * @param id
     * @param data
     * @returns {Promise<T>}
     */
    public updateTemplate(id: number, data: any): any {
        return new Promise((resolve, reject) => {
            let { category_id, description, sum } = data;
            let promise = this.sqlService.query(`
            UPDATE templates 
            SET category_id = ${category_id}, description = '${description}', sum = ${sum}
            WHERE id=${id}`);
            promise.then(
                (data) => {
                    resolve('Шаблон успешно обновлен');
                },
                (data) => {
                    reject(data.err.message);
                });
        });
    }


    /**
     *
     * @param id
     * @returns {Promise<T>}
     */
    public deleteTemplate(id: number): any {
        return new Promise((resolve, reject) => {
            let promise = this.sqlService.query(`DELETE FROM templates WHERE id=${id};`);
            promise.then(
                (data) => {
                    resolve('Шаблон успешно удален');
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
     * @returns {Promise<any>}
     */
    public getTemplates(limit: number = 100, offset: number = 0): any {
        return new Promise((resolve, reject) => {
            let promise =  this.sqlService.query(`
            SELECT t.id as templateId, t.category_id, t.description, t.sum, t.created, c.id, c.type, c.slug 
            FROM templates AS t
            INNER JOIN categories AS c
            ON t.category_id = c.id
            ORDER BY created DESC
            LIMIT ${limit}
            OFFSET ${offset}`, []);

            promise.then(
                (data) => {
                    if (data != null && data.res) {
                        let rows = data.res.rows;
                        let items = [];
                        let totalCount = rows.length;
                        for (let i = 0; i < totalCount; i++) {
                            items.push(rows.item(i));
                        }
                        resolve({
                            items, totalCount
                        });
                    }
                },
                (data) => {
                    reject(data.err.message);
                });
        });

    }


    /**
     *
     * @param id
     * @returns {Promise<any>}
     */
    public getTemplateById(id: number): any {
        return new Promise((resolve, reject) => {
            let promise =  this.sqlService.query(`
            SELECT t.id, t.category_id, t.description, t.sum, t.created, c.id, c.type
            FROM templates AS t
            INNER JOIN categories AS c
            ON t.category_id = c.id
            WHERE t.id = ${id}`, []);
            promise.then(
                (data) => {
                    if (data.res.rows.length > 0) {
                        let template = data.res.rows[0];
                        if(template) {
                            resolve(template);
                        }
                    }
                },
                (data) => {
                    reject(data.err.message);
                });
        });
    }


}