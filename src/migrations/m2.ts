/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  21.02.2017
 * Time: 23:30
 */


export const m2 = [
    {
        command: `ALTER TABLE 'transactions' ADD inBudget INTEGER NOT NULL DEFAULT(1)`,
        data: []
    },
    {
        command: `ALTER TABLE 'templates' ADD inBudget INTEGER NOT NULL DEFAULT(1)`,
        data: []
    },
    {
        command: `INSERT INTO 'categories' (type, name, slug) VALUES (?, ?, ?)`,
        data: [0, 'Красота', 'beauty']
    },
    {
        command: `INSERT INTO 'categories' (type, name, slug) VALUES (?, ?, ?)`,
        data: [0, 'Транспорт', 'transport']
    },
    {
        command: `UPDATE 'migrations' SET version = 2 where id = 1`,
        data: []
    }
];
