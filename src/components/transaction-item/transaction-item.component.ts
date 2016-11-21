/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component, Input } from '@angular/core';

import { Utils } from '../../libs/Utils';

@Component({
    selector: 'transaction-item-component',
    templateUrl: 'transaction-item.component.html'
})


export class TransactionItem {


    @Input() transaction: any;


    public dateCreated: string;


    constructor() {
    }


    /**
     *
     */
    public ngAfterContentInit(): void {
       this.createDate();
    }


    /**
     *
     */
    private createDate(): void {
        let created = this.transaction.created;
        if(created) {
            this.dateCreated = Utils.dateFormatting(created);
        }
    }


}