/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  04.11.2016
 * Time: 11:02
 */


'use strict';


import { Injectable } from "@angular/core";


@Injectable()
export class SqlService {


    private db: any;
    private win: any;


    /**
     *
     */
    constructor() {
        this.win = window;
    }


    /**
     *
     * @param name
     */
    openDb(name: string): void {
        //noinspection TypeScriptUnresolvedVariable
        if (this.win.sqlitePlugin) {
            //noinspection TypeScriptUnresolvedVariable
            this.db = this.win.sqlitePlugin.openDatabase({
                name: name,
                location: 2,
                createFromLocation: 0
            });

        }
        else {
            console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
            this.db = this.win.openDatabase(name, '1.0', 'database', 5 * 1024 * 1024);
        }
    }


    /**
     * Create table
     * @param name
     * @param structure
     */
    createTable(name: string, structure: string): void {
        this.query(`CREATE TABLE IF NOT EXISTS ${name} (${structure})`).catch(err => {
            console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
        });
    }


    /**
     * Perform an arbitrary SQL operation on the database. Use this method
     * to have full control over the underlying database through SQL operations
     * like SELECT, INSERT, and UPDATE.
     *
     * @param {string} query the query to run
     * @param {array} params the additional params to use for query placeholders
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    query(query: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.db.transaction((tx: any) => {
                        tx.executeSql(query, params,
                            (tx: any, res: any) => resolve({ tx: tx, res: res }),
                            (tx: any, err: any) => reject({ tx: tx, err: err }));
                    },
                    (err: any) => reject({ err: err }));
            } catch (err) {
                reject({ err: err });
            }
        });
    }


    /**
     * Get the value in the database identified by the given key.
     * @param {string} table name
     * @param {string} key the key
     * @returns {Promise<TResult>} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    get(table: string, key: string): Promise<any> {
        return this.query(`select key, value from ${table} where key = ? limit 1`, [key]).then(data => {
            if (data.res.rows.length > 0) {
                return data.res.rows.item(0).value;
            }
        });
    }


    /**
     * Set the value in the database for the given key. Existing values will be overwritten.
     * @param {string} table name
     * @param {string} key the key
     * @param {string} value The value (as a string)
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    set(table: string, key: string, value: string): Promise<any> {
        return this.query(`insert or replace into ${table}(key, value) values (?, ?)`, [key, value]);
    }


    /**
     * Remove the value in the database for the given key.
     * @param {string} table name
     * @param {string} key the key
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    remove(table: string, key: string): Promise<any> {
        return this.query(`delete from ${table} where key = ?`, [key]);
    }


    /**
     * Clear all keys/values of your database.
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    clear(): Promise<any> {
        return this.query('delete from kv');
    }
}