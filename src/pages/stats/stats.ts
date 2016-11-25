/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';

import { DateService } from "../../services/date.service";
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


    private colors: any;
    private date: number;


    constructor(private dateService: DateService, private transactionService: TransactionService) {
        this.title = 'Статистика';
        this.period = 'week';
        this.type = '0';
        this.isReadyChart = false;

        this.date = +new Date();

        this.createColors();
    }


    public ionViewWillEnter(): void {
        this.cleanTransactions();
        this.getTransactions();
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
     * @returns {any}
     */
    private getTransactions(): void {
        this.transactionService.getTransactions(2e10, 0, this.date, parseInt(this.type)).then(
            (data) => {
                if (data != null && data.res) {
                    let rows = data.res.rows;
                    let items = [];
                    for (let i = 0; i < rows.length; i++) {
                        items.push(rows.item(i));
                    }
                    this.buildDataForChart(items);
                }
            },
            (error) => {
                console.error(`Error: ${error}`);
            }
        );
    }


    /**
     *
     */
    private cleanTransactions(): void {
    }


    /**
     *
     * @param data
     */
    private createOptionsChart(data): void {
        this.optionsChart = {
            chart: {
                width: 800,
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
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            legend: {
                padding: 20,
                itemStyle: {
                    color: '#FFF',
                    fontSize: '15px',
                    fontWeight: 'normal',
                }
            },

            series: [{
                colorByPoint: true,
                data: data
            }],
        };


        this.isReadyChart = true;
    }



    // http://api.highcharts.com/highcharts/legend.itemStyle


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

}