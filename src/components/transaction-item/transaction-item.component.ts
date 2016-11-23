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


    public dateCreated: string;
    public sum: string;
    public sumClass: string;


    constructor() {
        this.sumClass = '';
    }


    /**
     *
     */
    public ngAfterContentInit(): void {
        this.createDate();
        this.createSum();
    }


    /**
     *
     */
    private createDate(): void {
        let created = this.transaction.created;
        let dayMs = 1000 * 60 * 60 * 24;
        if (created) {
            let date = Utils.dateFormatting(created);
            if(date == Utils.dateFormatting(new Date())) {
                this.dateCreated = 'сегодня';
            }
            else if(Utils.dateFormatting(created - dayMs) === Utils.dateFormatting(+new Date() - (dayMs * 2))) {
                this.dateCreated = 'вчера';
            }
            else if(Utils.dateFormatting(created - dayMs) === Utils.dateFormatting(+new Date() - (dayMs * 3))) {
                this.dateCreated = 'позавчера';
            }
            else {
                this.dateCreated = date;
            }
        }
    }


    /**
     *
     */
    private createSum(): void {
        let sum = Utils.separatedBySpaceNumber(String(this.transaction.sum));
        if(this.transaction.type === 0) {
            sum = '- ' + sum;
            this.sumClass = 'is-minus';
        }
        else if(this.transaction.type === 1) {
            sum = '+ ' + sum;
            this.sumClass = 'is-plus';
        }

        this.sum = sum;
    }


}