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

    private buttonAdd: any;


    /**
     *
     * @param element
     * @param dateService
     */
    constructor(private element: ElementRef, private dateService: DateService) {
        this.title = 'Активность';
        this.monthNames = this.dateService.getLocaleString('monthNames');
        this.monthShortNames = this.dateService.getLocaleString('monthShortNames');
        this.dayNames = this.dateService.getLocaleString('dayNames');
        this.dayShortNames = this.dateService.getLocaleString('dayShortNames');
        this.date = this.dateService.getISODate(new Date());
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

}
