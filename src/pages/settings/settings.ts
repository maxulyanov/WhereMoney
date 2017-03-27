/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';

import { UserService } from "../../services/user.service";
import { NotifyService } from "../../services/notify.service";
import { BudgetService } from "../../services/budget.service";


@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})


export class SettingPage {


    public title: string;
    public settings: any;
    public version: string;

    private tabBarElement: HTMLElement;


    /**
     *
     * @param userService
     * @param notifyService
     * @param budgetService
     */
    constructor(
        private userService: UserService,
        private notifyService: NotifyService,
        private budgetService: BudgetService) {

        this.title = 'Настройки';
        this.version = '1.1.0';
        this.settings = {
            budget: {
                value: '10000'
            },
            saveRest: {
                value: 0
            },
            showNotify: {
                value: 0
            }
        };

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


    /**
     *
     */
    public renderSettings(): void {
        let promise = this.userService.getSettings();
        promise.then(
            (data) => {
                if(data.length > 0) {
                    data.forEach((item) => {
                        let currentSetting =  this.settings[item.key];
                        currentSetting.id = item.id;
                        if(item.key === 'saveRest' || item.key === 'showNotify') {
                            currentSetting.value = parseInt(item.value, 10);
                        }
                        else {
                            currentSetting.value = item.value;
                        }
                    });
                }
            },
            (error) => {
                console.error(`Error: ${error}`);
            }
        );
    }


    /**
     *
     */
    public updateSettings(): void {
        let settings: any = JSON.parse(JSON.stringify(this.settings));
        let settingsLength: number = Object.keys(settings).length;
        let index = 0;
        for(let key in settings) {
            if(settings.hasOwnProperty(key)) {
                let currentSetting = settings[key];
                if(typeof currentSetting.value === 'boolean') {
                    currentSetting.value = Number(currentSetting.value);
                }
                if(typeof currentSetting.value === 'string') {
                    currentSetting.value = String(currentSetting.value);
                }
                let promise = this.userService.updateSettings(currentSetting);
                promise.then(
                    (message) => {
                        index++;
                        if(index === settingsLength - 1) {
                            this.notifyService.show(message);
                            this.budgetService.updateBudget(this.settings.budget.value);
                        }
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            }
        }
    }

}
