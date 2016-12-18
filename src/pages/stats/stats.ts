/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';

import { TransactionService } from "../../services/transaction.service";


@Component({
    selector: 'page-stats',
    templateUrl: 'stats.html'
})


export class StatsPage {

    public title: string;
    public period: string;
    public type: string;
    public optionsChart: any;
    public isReadyChart: boolean;
    public totalCount: number;


    private colors: any;
    private date: number;
    private endDate: number;


    /**
     *
     * @param transactionService
     */
    constructor(private transactionService: TransactionService) {
        this.title = 'Статистика';
        this.period = 'week';
        this.type = '0';
        this.totalCount = -1;
        this.isReadyChart = false;

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


    public ionViewWillLeave(): void {
        this.isReadyChart = false;
    }


    /**
     *
     */
    public handlerSelectType(): void {
        this.renderChart();
    }


    /**
     *
     */
    public handlerSelectPeriod(): void {
        this.renderChart();

    }


    /**
     *
     */
    private renderChart(): void {
        this.date = +new Date();
        this.selectPeriod();
        this.getTransactions().then((items: any[]) => {
            this.buildDataForChart(items);
        }, (error) => {
            console.error(`Error: ${error}`);
        })
    }


    /**
     *
     * @returns {any}
     */
    private getTransactions(): any {
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
     * @param data
     */
    private buildDataForChart(data: any): void {
        let groups: any = {};
        if (data.length > 0) {
            data.forEach((item) => {
                let slug = item.slug;
                if (groups[slug] == null) {
                    groups[slug] = {};
                    groups[slug]['name'] = item.name;
                    groups[slug]['sum'] = 0;
                }
                if(item.sum) {
                    groups[slug]['sum'] += item.sum;
                }

            });
        }

        let seriesData: any[] = [];
        for(let key in groups) {
            if(groups.hasOwnProperty(key)) {
                seriesData.push({
                    color: this.colors[key],
                    name: groups[key].name,
                    y: groups[key].sum
                });
            }
        }

        this.createOptionsChart(seriesData);

    }


    /**
     *
     * @param data
     */
    private createOptionsChart(data): void {
       let width: number = window.innerWidth > 640 ? 640 : window.innerWidth;
        this.optionsChart = {
            chart: {
                width,
                backgroundColor: 'transparent',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
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
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            legend: {
                itemStyle: {
                    color: '#FFF',
                    fontSize: '15px',
                    fontWeight: 'normal',
                    textDecoration: 'none',
                },
                itemHoverStyle: {
                    color: '#FFF',
                },
                itemHiddenStyle: {
                    color: '#4a4a5a'
                }
            },

            series: [{
                colorByPoint: true,
                data: data
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
            car: '#34495E',
            phone: '#297FB8',
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
            job: '#4CAF50',
            gifts2: '#03A9F4'
        }
    }


    private cleanChart() {
        this.totalCount = -1;
    }


}