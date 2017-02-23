/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  21.02.2017
 * Time: 23:30
 */


export const m1 = [
    {
        command: `CREATE TABLE IF NOT EXISTS migrations (id INTEGER PRIMARY KEY, version INTEGER)`,
        data: []
    },
    {
        command: `INSERT INTO 'migrations' (version) VALUES (?)`,
        data: [1]
    }
];