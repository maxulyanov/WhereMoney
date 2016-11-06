/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


'use strict';

export const config = {

    db: {
        name: 'whereMoneyDb',
        tables: [
            {
                name: 'transactions',
                structure: 'id INTEGER PRIMARY KEY, type INTEGER, category INTEGER, sum INTEGER, timestamp TIMESTAMP'
            }
        ]
    }

};