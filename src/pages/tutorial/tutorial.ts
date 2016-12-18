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
        this.title = 'Первый запуск';
        this.balance = 10000;
    }


    /**
     *
     * @param event
     */
    public setFirstBalance(event: any): void {
        let promise: any = this.userService.updateBalance(this.balance);
        promise.then(
            () => {
                this.navCtrl.push(TabsPage);
            },
            (error) => {
                console.error(`Error: ${error}`);
            }
        );
    }


}
