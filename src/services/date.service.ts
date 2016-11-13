/**
 * Created by 1 on 03.11.2016.
 */


'use strict';


import { Injectable } from "@angular/core";

import { date } from '../locale/ru/date';


@Injectable()
export class DateService {


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

}