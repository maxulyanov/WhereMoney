/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';

import { TransactionService } from "../../services/transaction.service";
import { CategoryService } from "../../services/category.service";
import { Utils } from "../../libs/Utils";


@Component({
    selector: 'page-stats',
    templateUrl: 'stats.html'
})


export class StatsPage {

    public title: string;
    public period: string;
    public type: string;
    public categories: any;
    public optionsChart: any;
    public isReadyChart: boolean;
    public totalCount: number;
    public totalSum: number;


    private colors: any;
    private date: number;
    private endDate: number;


    /**
     *
     * @param transactionService
     * @param categoryService
     */
    constructor(private transactionService: TransactionService, private categoryService: CategoryService) {
        this.title = 'Статистика';
        this.period = 'week';
        this.type = '0';
        this.categories = [];
        this.totalCount = -1;
        this.isReadyChart = false;
        this.totalSum = 0;

        this.endDate = 0;

        this.createColors();
    }


    /**
     *
     */
    public ionViewWillEnter(): void {
        this.cleanChart();
        this.renderChart();
    }


    /**
     *
     */
    public ionViewWillLeave(): void {
        this.isReadyChart = false;
    }


    /**
     *
     */
    public selectType(): void {
        this.renderChart();
    }


    /**
     *
     */
    public selectMonth(): void {
        this.renderChart();

    }


    /**
     *
     */
    private renderChart(): void {
        this.date = +new Date();
        this.selectPeriod();
        this.getTransactions().then((transactions: any[]) => {
            this.buildDataForChart(transactions);
        }, (error) => {
            console.error(`Error: ${error}`);
        })
    }


    /**
     *
     * @returns {Promise<T>}
     */
    private getTransactions(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.transactionService.getTransactions(2e10, 0, this.date, this.endDate, parseInt(this.type)).then(
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
    private selectPeriod(): void {
        let dayMs: number = 1000 * 60 * 60 * 24;
        let periods = {
            week: 7,
            month: 30,
            month3: 90,
            year: 365,
        };

        if(this.period == 'all') {
            this.endDate = 0;
        }
        else if(periods[this.period] !== null) {
            this.endDate = this.date - (dayMs * periods[this.period]);
        }
    }


    /**
     *
     * @param transactions
     */
    private buildDataForChart(transactions: any): void {
        let categories = this.categoryService.getCategoriesFromTransactions(transactions);
        let arrayCategories: any[] = [];
        let seriesData: any[] = [];
        this.totalSum = 0;

        for(let key in categories) {
            if(categories.hasOwnProperty(key)) {
                arrayCategories.push(categories[key]);
                this.totalSum += categories[key].sum;
                seriesData.push({
                    color: this.colors[key],
                    name: categories[key].name,
                    y: categories[key].sum
                });
            }
        }

        arrayCategories.sort(Utils.sortBy({
            name: 'sum',
            reverse: true
        }));
        this.categories = arrayCategories;
        this.createOptionsChart(seriesData);

    }


    /**
     *
     * @param data
     */
    private createOptionsChart(data): void {
        this.optionsChart = {
            chart: {
                width: 220,
                height: 260,
                backgroundColor: 'transparent',
                type: 'pie'
            },
            tooltip: {
                pointFormat: 'Всего: <b>{point.y} ₽</b>, это <b>{point.percentage:.1f}%</b>'
            },
            title: {
                text: '',
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    borderWidth: 1,
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            legend: {
                enabled: false
            },

            series: [{
                colorByPoint: true,
                data: data,
                animation: {
                    duration: 500,
                }
            }],
        };

        this.isReadyChart = true;
    }



    /**
     *
     */
    private createColors(): void {
        this.colors = {
            food: '#E84C3D',
            dress: '#F59D1F',
            car: '#75706B',
            internet: '#297FB8',
            animals: '#4CAF50',
            gifts: '#03A9F4',
            health: '#C5382F',
            entertainment: '#009688',
            bill: '#3F51B5',
            travel: '#67B9CE',
            learning: '#8BC34A',
            repairs: '#795548',
            sport: '#FF6F00',
            other: '#9E9E9E',
            transport: '#E3BE53',
            beauty: '#D070DB',
            job: '#4CAF50',
            'gifts-2': '#03A9F4'
        }
    }


    /**
     *
     */
    private cleanChart() {
        this.totalCount = -1;
    }


}