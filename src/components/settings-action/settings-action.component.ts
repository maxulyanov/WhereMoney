/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { SettingPage } from '../../pages/settings/settings';


@Component({
    selector: 'settings-action-component',
    templateUrl: 'settings-action.component.html'
})


export class SettingsAction {


    /**
     *
     * @param navCtrl
     */
    constructor(private navCtrl: NavController) { }


    public handlerClick() {
        this.navCtrl.push(SettingPage);
    }

}