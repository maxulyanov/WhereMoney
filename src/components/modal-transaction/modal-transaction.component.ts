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


export class ModalTransaction extends ModalDefault{


    constructor(protected navCtrl: NavController, protected viewCtrl: ViewController, protected navParams: NavParams) {
        super(navCtrl, viewCtrl, navParams);
    }



}