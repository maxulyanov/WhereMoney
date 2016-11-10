/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})


export class SettingPage {


    public title: string;

    private tabBarElement: HTMLElement;


    constructor(public navCtrl: NavController) {
        this.title = 'Настройки';
        this.tabBarElement = <HTMLElement>document.querySelector('.main-tabs .tabbar');
    }


    ionViewWillEnter() {
        this.tabBarElement.style.bottom = '-65px';

    }


    ionViewWillLeave() {
        this.tabBarElement.style.bottom = '0';
    }


}
