/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from "../../services/user.service";


@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})


export class SettingPage {


    public title: string;
    public budget: number;
    public saveRest: boolean;


    private tabBarElement: HTMLElement;


    /**
     *
     * @param navCtrl
     * @param userService
     */
    constructor(public navCtrl: NavController, private userService: UserService) {
        this.title = 'Настройки';
        this.budget = 0;
        this.saveRest = false;

        this.tabBarElement = <HTMLElement>document.querySelector('.main-tabs .tabbar');
    }


    /**
     *
     */
    public ionViewWillEnter(): void {
        this.tabBarElement.style.bottom = '-65px';
        this.renderSettings();
    }


    /**
     *
     */
    public ionViewWillLeave(): void {
        this.tabBarElement.style.bottom = '0';
    }



    public renderSettings(): void {
        let promise = this.userService.getSettings();
        promise.then(
            (data) => {
                console.log(data);
            },
            (error) => {
                console.error(`Error: ${error}`);
            }
        );
    }

    public updateSettins(): void {

    }


}
