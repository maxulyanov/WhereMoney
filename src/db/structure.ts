/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  13.11.2016
 * Time: 11:31
 */


'use strict';


export const structure = {
    name: 'whereMoneyDb',
    tables: [
        {
            name: 'transactions',
            structure: 'id INTEGER PRIMARY KEY, type INTEGER, category INTEGER, sum INTEGER, timestamp TIMESTAMP'
        }
    ]
}