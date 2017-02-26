/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:48
 */


'use strict';


export interface TransactionInterface {
    category_id: number,
    name: string,
    created: number;
    description: string;
    slug: string,
    sum: number,
    type: number,
    showLabelDate: boolean,
    inBudget: boolean
}
