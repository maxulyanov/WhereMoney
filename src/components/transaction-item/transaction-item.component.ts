/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component, Input } from '@angular/core';

import { Utils } from '../../libs/Utils';
import { TransactionInterface } from "../../interfaces/transaction.interface";

@Component({
    selector: 'transaction-item-component',
    templateUrl: 'transaction-item.component.html'
})


export class TransactionItem {


    @Input() transaction: TransactionInterface;


    public categoryName: string;
    public sum: string;
    public transactionClass: string;


    constructor() {
        this.transactionClass = '';
        this.categoryName = '';
    }


    /**
     *
     */
    public ngAfterContentInit(): void {
        this.categoryName = this.transaction.name;
        this.createSum();
    }


    /**
     *
     */
    private createSum(): void {
        let sum = Utils.separatedBySpaceNumber(String(this.transaction.sum));
        if(this.transaction.type === 0) {
            sum = '- ' + sum;
            this.transactionClass = 'is-minus';
        }
        else if(this.transaction.type === 1) {
            sum = '+ ' + sum;
            this.transactionClass = 'is-plus';
        }

        this.sum = sum;
    }


}