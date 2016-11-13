/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  13.11.2016
 * Time: 11:31
 */


'use strict';


export const structure = {
    dbName: 'whereMoneyDb',
    tables: [
        {
            name: 'transactions',
            structure: 'id INTEGER PRIMARY KEY, type INTEGER, category INTEGER, sum INTEGER, timestamp TIMESTAMP'
        },
        {
            name: 'categories',
            structure: 'id INTEGER PRIMARY KEY, type INTEGER, name TEXT, slug TEXT'
        },
        {
            name: 'settings',
            structure: 'id INTEGER PRIMARY KEY, key TEXT, value TEXT'
        },
        {
            name: 'templates',
            structure: 'id INTEGER PRIMARY KEY, type INTEGER, category INTEGER, sum INTEGER'
        }
    ]
}