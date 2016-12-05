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
    public dateISO: any;
    public monthNames: string;
    public monthShortNames: string;
    public dayNames: string;
    public dayShortNames: string;
    public transactions: any[];

    private buttonAdd: any;
    private offset: number;
    private stepOffset: number;
    private totalCount: number;
    private limit: number;
    private date: number;


    /**
     *
     * @param element
     * @param dateService
     * @param transactionService
     */
    constructor(private element: ElementRef, private dateService: DateService, private transactionService: TransactionService) {
        this.title = 'Активность';
        this.monthNames = this.dateService.getLocaleString('monthNames');
        this.monthShortNames = this.dateService.getLocaleString('monthShortNames');
        this.dayNames = this.dateService.getLocaleString('dayNames');
        this.dayShortNames = this.dateService.getLocaleString('dayShortNames');
        this.dateISO = this.dateService.getISODate(new Date());
        this.transactions = [];

        this.offset = 0;
        this.stepOffset = 15;
        this.limit = 15;
        this.totalCount = -1;
        this.date = +new Date();
    }


    public ionViewWillEnter(): void {
        this.cleanTransactions();
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
     * @param infiniteScroll
     */
    public doInfinite(infiniteScroll: any): void {
        this.offset += this.stepOffset;
        this.getTransactions().then(
            (data) => {
                infiniteScroll.complete();
                this.forRowsTransactions(data);
            },
            (error) => {
                infiniteScroll.complete();
                console.error(`Error: ${error}`);
            }
        );
    }


    /**
     *
     * @param event
     */
    public changeDate(event): void {
        this.cleanTransactions();
        let { day, month, year } = event;
        let date = new Date(`${month.value}.${day.value}.${year.value}`);
        this.date = +date.setHours(23,59,59,59);
        this.renderTransactions();
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
                this.forRowsTransactions(data);
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
        return this.transactionService.getTransactions(this.limit, this.offset, this.date);
    }




    /**
     *
     * @param data
     */
    private forRowsTransactions(data: any): void {
        if(data != null && data.res) {
            let rows = data.res.rows;
            let items = [];
            this.totalCount = rows.length;
            for (let i = 0; i < rows.length; i++) {
                items.push(rows.item(i));
            }
            this.transactions = Array.prototype.concat(this.transactions, items);
        }
    }


    /**
     *
     */
    private cleanTransactions(): void {
        this.transactions = [];
        this.offset = 0;
        this.totalCount = -1;
        this.date = +new Date();
    }

}
