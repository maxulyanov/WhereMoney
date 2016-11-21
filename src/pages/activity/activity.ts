/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 22:43
 */


'use strict';


import { Component, ElementRef } from '@angular/core';

import { DateService } from "../../services/date.service";
import { TransactionService } from "../../services/transaction.service";


@Component({
    selector: 'page-activity',
    templateUrl: 'activity.html'
})


export class ActivityPage {


    public title: string;
    public date;
    public monthNames: string;
    public monthShortNames: string;
    public dayNames: string;
    public dayShortNames: string;

    public transactions: any[];

    private buttonAdd: any;


    /**
     *
     * @param element
     * @param dateService
     */
    constructor(private element: ElementRef, private dateService: DateService, private transactionService: TransactionService) {
        this.title = 'Активность';
        this.monthNames = this.dateService.getLocaleString('monthNames');
        this.monthShortNames = this.dateService.getLocaleString('monthShortNames');
        this.dayNames = this.dateService.getLocaleString('dayNames');
        this.dayShortNames = this.dateService.getLocaleString('dayShortNames');
        this.date = this.dateService.getISODate(new Date());

        this.transactions = [];
    }


    public ionViewWillEnter(): void {
        this.renderTransactions();
    }


    /**
     *
     */
    public ionViewDidEnter(): void {
        this.buttonAdd = this.element.nativeElement.querySelector('.button-add-transaction');
        this.showButtonAddTransaction();
    }


    /**
     *
     */
    public ionViewDidLeave(): void {
        this.hideButtonAddTransaction();
    }




    /**
     *
     */
    private showButtonAddTransaction(): void {
        if(this.buttonAdd != null) {
            this.buttonAdd.classList.add('show');
        }
    }


    /**
     *
     */
    private hideButtonAddTransaction(): void {
        if(this.buttonAdd != null) {
            this.buttonAdd.classList.remove('show');
        }
    }


    /**
     *
     */
    private renderTransactions(): void {
        this.getTransactions().then(
            (data)=> {
                if(data != null && data.res) {
                    let rows = data.res.rows;
                    for (let i = 0; i < rows.length; i++) {
                        this.transactions.push(rows.item(i));
                    }
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }


    /**
     *
     * @returns {any}
     */
    private getTransactions(): any {
        return this.transactionService.getTransactions();
    }


    /**
     *
     */
    private cleanTransactions(): void {
        this.transactions = [];
    }

}
