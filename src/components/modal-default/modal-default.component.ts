/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from "ionic-angular";


@Component({
    selector: 'modal-default-component',
    templateUrl: 'modal-default.component.html'
})


export class ModalDefault {


    public title: string;


    /**
     *
     * @param navCtrl
     * @param viewCtrl
     * @param navParams
     */
    constructor(protected navCtrl: NavController, protected viewCtrl: ViewController, protected navParams: NavParams) {
        this.title = this.navParams.get('title') || '';
    }


    /**
     *
     */
    public close(): void {
        this.viewCtrl.dismiss();
        let callback = this.navParams.get('callback');
        if (typeof callback === 'function') {
            callback();
        }
    }


}