/**
 * Created by 1 on 03.11.2016.
 */


'use strict';


import { Injectable } from "@angular/core";

import { date } from '../locale/ru/date';


@Injectable()
export class DateService {


    /**
     *
     */
    constructor() {}


    /**
     *
     * @param field
     * @returns {string}
     */
    public getLocaleString(field: string): string {
        if(field in date && Array.isArray(date[field])) {
            return date[field].join(',');
        }
    }


    public getISODate(date: any): string {
        return date.toISOString();
    }


    /**
     *
     * @returns {Date}
     */
    public getDateStartWeek(): Date {
        let date = new Date();
        let day = date.getDay();
        if(day === 0) {
            day = 7;
        }
        date.setDate(date.getDate() - (day - 1));
        date.setHours(0, 0, 0, 0);

        return date;
    }


    /**
     *
     * @param d
     * @returns {{year: number, week: any}}
     */
    public getWeekNumber(d: any = new Date()): any {
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        let year: any = new Date(d.getFullYear(), 0, 1);
        let week: any = Math.ceil(( ( (d - year) / 86400000) + 1) / 7);
        return {
            year: year.getFullYear(),
            week
        }
    };


    /**
     *
     * @param date
     * @returns {Date}
     */
    public getDateFistDayInMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }


    /**
     *
     * @param date
     * @returns {Date}
     */
    public getDateLastDayInMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 59);
    }

    /**
     *
     * @param date
     * @returns {boolean}
     */
    public dateIsToday(date: Date): boolean {
        const today = new Date();
        return today.toDateString() == date.toDateString();
    }

}