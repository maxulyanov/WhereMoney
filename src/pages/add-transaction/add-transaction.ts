/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';


@Component({
    selector: 'page-transaction',
    templateUrl: 'add-transaction.html'
})


export class AddTransactionPage {


    public title: string;


    /**
     *
     */
    constructor() {
        this.title = 'Добавление транзакции';
    }



}
