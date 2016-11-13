/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  04.11.2016
 * Time: 11:02
 */


'use strict';


import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen} from 'ionic-native';

import { DbService } from '../services/db.service';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})


export class App {


    rootPage: any;


    /**
     *
     * @param platform
     * @param dbService
     */
    constructor(private platform: Platform, private dbService: DbService) {
        platform.ready().then(() => {
            this.initApp();
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }


    /**
     *
     */
    private initApp(): void {
        this.rootPage = TabsPage;
        this.dbService.initDataBase();
    }


}
