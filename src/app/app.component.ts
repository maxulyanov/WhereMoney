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
import { StatusBar, Splashscreen } from 'ionic-native';

import { DbService } from '../services/db.service';

import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { LocalStorage } from "../libs/LocalStorage";


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
            StatusBar.overlaysWebView(true); // let status bar overlay webview
            StatusBar.backgroundColorByHexString('#3DC960'); // set status bar to white
            Splashscreen.hide();
            this.initApp();
        });
    }


    /**
     *
     */
    private initApp(): void {
        this.dbService.initDataBase().then(() => {
            this.rootPage = this.isFirstLaunch() ? TutorialPage : TabsPage;
        })
    }


    /**
     *
     * @returns {boolean}
     */
    private isFirstLaunch(): boolean {
        return !LocalStorage.get('launchApp');
    }

}
