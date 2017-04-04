/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 22:43
 */


'use strict';


import { Component } from '@angular/core';
import { Utils } from "../../libs/Utils";

import { DateService } from "../../services/date.service";
import { TransactionService } from "../../services/transaction.service";
import { BudgetService } from "../../services/budget.service";
import { UserService } from "../../services/user.service";
import { NotifyService } from "../../services/notify.service";

import { TransactionInterface } from "../../interfaces/transaction.interface";


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
    public balance: string;
    public totalCount: number;

    private offset: number;
    private stepOffset: number;
    private limit: number;
    private date: number;


    /**
     *
     * @param dateService
     * @param transactionService
     * @param notifyService
     * @param budgetService
     * @param userService
     */
    constructor(private dateService: DateService,
                private transactionService: TransactionService,
                private notifyService: NotifyService,
                private budgetService: BudgetService,
                private userService: UserService) {

        this.title = 'Активность';
        this.monthNames = this.dateService.getLocaleString('monthNames');
        this.monthShortNames = this.dateService.getLocaleString('monthShortNames');
        this.dayNames = this.dateService.getLocaleString('dayNames');
        this.dayShortNames = this.dateService.getLocaleString('dayShortNames');
        this.dateISO = this.dateService.getISODate(new Date());
        this.transactions = [];
        this.balance = '0';

        this.offset = 0;
        this.stepOffset = 15;
        this.limit = 15;
        this.totalCount = -1;
        this.date = +new Date();
    }


    /**
     *
     */
    public ionViewWillEnter(): void {
        this.cleanTransactions();
        this.renderTransactions();
        this.setCountTransactions();
        this.updateBalance();
    }



    /**
     *
     * @param infiniteScroll
     */
    public doInfinite(infiniteScroll: any): void {
        this.offset += this.stepOffset;
        this.getTransactions().then(
            (transactions)=> {
                this.transactions = this.iteratorTransactions(Array.prototype.concat(this.transactions, transactions));
                infiniteScroll.complete();
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
        let {day, month, year} = event;
        let date = new Date(`${month.value}.${day.value}.${year.value}`);
        this.date = +date.setHours(23, 59, 59, 59);
        this.renderTransactions();
        this.setCountTransactions();
    }


    /**
     *
     */
    private updateBalance(): void {
        let promise: any = this.userService.getBalance();
        promise.then(
            (result) => {
                let value = result.value;
                if (value != null) {
                    this.balance = Utils.separatedBySpaceNumber(value);
                }
            },
            (error) => {
                console.error(error);
            });
    }


    /**
     *
     */
    private renderTransactions(): void {
        this.getTransactions().then(
            (transactions)=> {
                this.transactions = this.iteratorTransactions(Array.prototype.concat(this.transactions, transactions));
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
     */
    private setCountTransactions() {
        this.transactionService.getCountTransactions(this.date).then(
            (count: number) => {
                this.totalCount = count;
            }, (err) => {
                console.error(err);
            });
    }


    /**
     *
     * @param transactions
     * @returns {TransactionInterface[]}
     */
    private iteratorTransactions(transactions: TransactionInterface[]): TransactionInterface[] {
        let savedDate = null;
        return transactions.map((transaction) => {
            this.createDate(transaction);
            this.setCanDeleted(transaction);
            this.setShowLabelDate(transaction, savedDate, (newDate) => savedDate = newDate);
            return transaction;
        });
    }


    /**
     *
     * @param transaction
     * @param savedDate
     * @param changeDate
     */
    private setShowLabelDate(transaction: TransactionInterface, savedDate, changeDate): void {
        let clearDate = new Date(transaction.created).setHours(0, 0, 0, 0);
        if(clearDate != savedDate) {
            changeDate(clearDate);
            transaction.showLabelDate = true;
        }
    }

    /**
     *
     * @param transaction
     */
    public setCanDeleted(transaction: TransactionInterface): void {
        transaction.canDeleted = this.dateService.dateIsToday(new Date(transaction.created));
    }


    /**
     *
     * @param transaction
     */
    private createDate(transaction: TransactionInterface): void {
        const created = transaction.created;
        const dayMs = 1000 * 60 * 60 * 24;

        if (created) {
            let date = Utils.dateFormatting(created);
            if(date == Utils.dateFormatting(new Date())) {
                transaction.dateCreated = 'сегодня';
            }
            else if(Utils.dateFormatting(created - dayMs) === Utils.dateFormatting(+new Date() - (dayMs * 2))) {
                transaction.dateCreated = 'вчера';
            }
            else if(Utils.dateFormatting(created - dayMs) === Utils.dateFormatting(+new Date() - (dayMs * 3))) {
                transaction.dateCreated = 'позавчера';
            }
            else {
                transaction.dateCreated = date;
            }
        }
    }


    /**
     *
     * @param event
     * @param id
     * @param position
     */
    public deleteTransaction(event: any, id: number, position: number): void {
        event.stopPropagation();
        this.transactionService.deleteTransaction(id).then((message: string) => {
            const currentTransaction = this.transactions[position];
            if(currentTransaction.inBudget && currentTransaction.type == 0) {
                this.budgetService.updateRestBudget(currentTransaction.sum);
            }

            this.userService.updateBalance(currentTransaction.sum).then(() => this.updateBalance());

            const copyTransactions = this.transactions.slice();
            copyTransactions.splice(position, 1);
            this.transactions = this.iteratorTransactions(copyTransactions);
            this.notifyService.show(message);
        });
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
