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
import { TabsPage } from "../tabs/tabs";
import { LocalStorage } from "../../libs/LocalStorage";


@Component({
    selector: 'page-tutorial',
    templateUrl: 'tutorial.html'
})


export class TutorialPage {


    public title: string;
    public balance: number;


    /**
     *
     * @param navCtrl
     * @param userService
     */
    constructor(private navCtrl: NavController, private userService: UserService) {
        this.title = 'Добро пожаловать!';
        this.balance = 10000;
    }


    /**
     *
     */
    public setFirstBalance(): void {
        let promise: any = this.userService.updateBalance(this.balance);
        promise.then(
            () => {
                LocalStorage.set('launchApp', true);
                this.navCtrl.push(TabsPage);
            },
            (error) => {
                console.error(`Error: ${error}`);
            }
        );
    }


}
