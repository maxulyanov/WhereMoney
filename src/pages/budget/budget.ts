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
import { DateService } from "../../services/date.service";
import { BudgetService } from "../../services/budget.service";


@Component({
    selector: 'page-budget',
    templateUrl: 'budget.html'
})


export class BudgetPage {


    public title: string;
    public emptyText: string;
    public overallBudget: number;
    public overallBudgetForDisplay: string;
    public leftBudget: number;
    public leftBudgetForDisplay: string;
    public totalCount: number;
    public totalSum: number;
    public categories: any[];
    public percent: number;
    public percentForText: number;
    public indicatorTransition: number;
    public indicatorClassName: string;


    /**
     *
     * @param userService
     * @param transactionService
     * @param dateService
     * @param budgetService
     * @param categoryService
     */
    constructor(private userService: UserService,
                private transactionService: TransactionService,
                private dateService: DateService,
                private budgetService: BudgetService,
                private categoryService: CategoryService,) {
        this.title = 'Бюджет на неделю';
        this.emptyText = 'Нет расходов на этой неделе';
        this.overallBudgetForDisplay = '0';
        this.leftBudgetForDisplay = '0';
        this.totalSum = 0;
        this.totalCount = -1;
        this.categories = [];
        this.percent = 0;
        this.percentForText = 0;
        this.indicatorTransition = 0;
        this.indicatorClassName = '';
    }


    /**
     *
     */
    public ionViewWillEnter(): void {
        this.cleanBudget();
        this.getOverallBudget().then(
            (value) => {
                this.overallBudget = value;
                this.overallBudgetForDisplay = Utils.separatedBySpaceNumber(this.overallBudget);
                this.renderBudgetList();
            });
    }


    /**
     *
     * @returns {Promise<T>}
     */
    private getOverallBudget(): Promise<any> {
        let value: number;

        return new Promise((resolve, reject) => {
            this.userService.getSettings("WHERE key = 'budget'")
                .then((data) => {
                    if (data[0]) {
                        value = parseInt(data[0].value);
                        return;
                    }
                    else {
                        reject('budget not found!')
                    }
                })
                .then(() => {
                    return this.isSaveRestBudget();
                })
                .then((isSave) => {
                    if (isSave) {
                        let startWeek: number = +this.dateService.getDateStartWeek();
                        startWeek -= 1e3;
                        const { year, week } = this.dateService.getWeekNumber(new Date(startWeek));
                        return this.budgetService.getBudget(year, week);
                    }
                    else {
                        resolve(value);
                    }
                })
                .then((budget: any) => {
                    if (budget != null) {
                        resolve(value += budget.rest);
                        return budget.rest;
                    }
                    resolve(value)
                })
                .catch((error) => {
                    console.error(error);
                });
        })
    }


    /**
     *
     * @returns {Promise<T>}
     */
    private isSaveRestBudget(): any {
        return new Promise((resolve) => {
            this.userService.getSettings("WHERE key = 'saveRest'").then(
                (data) => {
                    let value: any = '0';
                    if (data[0]) {
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
        let endDate: Date = this.dateService.getDateStartWeek();
        this.getTransactions(+endDate).then((transactions: any[]) => {
            let categories = this.categoryService.getCategoriesFromTransactions(transactions);
            let totalSum = 0;
            let arrayCategories: any[] = [];
            for (let key in categories) {
                if (categories.hasOwnProperty(key)) {
                    arrayCategories.push(categories[key]);
                    totalSum += categories[key].sum;
                }
            }
            this.leftBudget = this.overallBudget - totalSum;
            this.totalSum = totalSum;
            this.leftBudgetForDisplay = Utils.separatedBySpaceNumber(this.leftBudget);

            this.percent = 100 - Math.round((totalSum / this.overallBudget * 100));
            if(this.percent < 0 || isNaN(this.percent)) {
                this.percent = 0;
            }
            this.percentForText = this.percent;
            this.indicatorClassName = this.getIndicatorClassName(this.percent);
            this.indicatorTransition = 0.5;


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
            this.transactionService.getTransactions(2e10, 0, +new Date(), endDate, 0, true).then(
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
     * @param percent
     * @returns {string}
     */
    private getIndicatorClassName(percent: number): string {
        let className = '';
        if(percent > 50) {
            className = 'is-high';
        }
        else if(percent > 25) {
            className = 'is-middle';
        }
        else {
            className = 'is-low';
        }
        return className;
    }

    /**
     *
     */
    private cleanBudget(): void {
        this.percent = 0;
        this.indicatorTransition = 0;
        this.categories = [];
        this.totalCount = -1;
    }


}