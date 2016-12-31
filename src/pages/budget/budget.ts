/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';

import { Utils } from "../../libs/Utils";

import { UserService } from "../../services/user.service";
import { TransactionService } from "../../services/transaction.service";
import { CategoryService } from "../../services/category.service";


@Component({
    selector: 'page-budget',
    templateUrl: 'budget.html'
})


export class BudgetPage {


    public title: string;
    public overallBudget: number;
    public overallBudgetForDisplay: string;
    public leftBudget: number;
    public leftBudgetForDisplay: string;
    public totalCount: number;
    public totalSum: number;
    public categories: any[];


    /**
     *
     * @param userService
     * @param transactionService
     * @param categoryService
     */
    constructor(private userService: UserService, private transactionService: TransactionService, private categoryService: CategoryService) {
        this.title = 'Бюджет на неделю';
        this.overallBudgetForDisplay = '0';
        this.leftBudgetForDisplay = '0';
        this.totalSum = 0;
        this.totalCount = -1;
        this.categories = [];
    }


    /**
     *
     */
    public ionViewWillEnter(): void {
        this.cleanBudget();
        this.getOverallBudget().then((value) => {
            this.overallBudget = value;
            this.overallBudgetForDisplay = Utils.separatedBySpaceNumber(this.overallBudget);
            this.renderBudgetList();
        }).catch((error) => {
            console.error(error);
        })
    }


    /**
     *
     * @returns {Promise<T>}
     */
    private getOverallBudget(): any {
        let value: any;
        return new Promise((resolve, reject) => {
            this.userService.getSettings("WHERE key = 'budget'")
                .then((data) => {
                    if(data[0]) {
                        value = data[0].value;
                        return;
                    }
                    else {
                        reject('budget not found!')
                    }
                })
                .then(() => {
                    return this.getSaveRestBudget();
                })
                .then((isSave) => {
                    resolve(value);
                });
        })
    }


    /**
     *
     * @returns {Promise<T>}
     */
    private getSaveRestBudget(): any {
        return new Promise((resolve) => {
            this.userService.getSettings("WHERE key = 'saveRest'").then(
                (data) => {
                    let value: any = '0';
                    if(data[0]) {
                        value = data[0].value;
                    }
                    resolve(!!parseInt(value));
                }
            );
        });
    }


    /**
     *
     */
    private renderBudgetList(): void {
        let endDate: Date = Utils.getDateStartWeek();
        this.getTransactions(+endDate).then((transactions: any[]) => {
            let categories = this.categoryService.getCategoriesFromTransactions(transactions);
            let totalSum = 0;
            let arrayCategories: any[] = [];
            for(let key in categories) {
                if(categories.hasOwnProperty(key)) {
                    arrayCategories.push(categories[key]);
                    totalSum += categories[key].sum;
                }
            }
            this.leftBudget = this.overallBudget - totalSum;
            this.totalSum = totalSum;
            this.leftBudgetForDisplay = Utils.separatedBySpaceNumber(this.leftBudget);
            arrayCategories.sort(Utils.sortBy({
                name: 'sum',
                reverse: true
            }));
            this.categories = arrayCategories;
        }, (error) => {
            console.error(error);
        })
    }

    /**
     *
     * @param endDate
     * @returns {Promise<T>}
     */
    private getTransactions(endDate: number): any {
        return new Promise((resolve, reject) => {
            this.transactionService.getTransactions(2e10, 0, +new Date(), endDate, 0).then(
                (transactions) => {
                    this.totalCount = transactions.length;
                    resolve(transactions);
                },
                (error) => {
                    reject(error);
                }
            );
        })
    }



    /**
     *
     */
    private cleanBudget(): void {
        this.categories = [];
        this.totalCount = -1;
    }


}