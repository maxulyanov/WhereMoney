/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component, Input } from '@angular/core';

import { Utils } from '../../libs/Utils';
import { ListItemInterface } from "../../interfaces/list-item.interface";

@Component({
    selector: 'list-item-component',
    templateUrl: 'list-item.component.html'
})


export class ListItem {


    @Input() item: ListItemInterface;
    @Input() totalSum: number;

    public sum: string;
    public procent: string;


    /**
     *
     */
    constructor() {
        this.procent = '0';
        this.sum = '0';
    }


    /**
     *
     */
    public ngAfterContentInit(): void {
        this.sum = Utils.separatedBySpaceNumber(this.item.sum);
        this.procent = (this.item.sum / this.totalSum * 100).toFixed(1);
    }


}