/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from "ionic-angular";

import { ModalDefault } from "../modal-default/modal-default.component";


@Component({
    selector: 'modal-transaction-component',
    templateUrl: 'modal-transaction.component.html'
})


export class ModalTransaction extends ModalDefault {


    public sum: number;
    public description: string;
    public isDataFilled: boolean;


    /**
     *
     * @param navCtrl
     * @param viewCtrl
     * @param navParams
     */
    constructor(protected navCtrl: NavController, protected viewCtrl: ViewController, protected navParams: NavParams) {
        super(navCtrl, viewCtrl, navParams);
        this.sum = 0;
        this.description = '';
        this.checkDataFilled();
    }


    /**
     *
     */
    public onReady(): void {
        let readyCallback = this.navParams.get('readyCallback');
        if(typeof readyCallback === 'function') {
            readyCallback({
                sum: this.sum,
                description: this.description
            });
            this.close();
        }
    }


    /**
     *
     * @param value
     */
    public updatedSum(value: string): void {
        value = value.replace(/\s/gi, '');
        this.sum = parseInt(value);
    }


    /**
     *
     */
    public changeDescription(): void {
        this.checkDataFilled();
    }


    /**
     *
     */
    private checkDataFilled(): void {
        this.isDataFilled = !!(this.sum > 0 && this.description.length > 0);
    }

}