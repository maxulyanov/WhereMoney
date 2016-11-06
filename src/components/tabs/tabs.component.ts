/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from "../../pages/tabs/tabs";


@Component({
    selector: 'tabs-component',
    templateUrl: 'tabs.component.html'
})


export class TabsComponent {

    private systemSelect;

    constructor(private navCtrl: NavController) {

    }


    select(tabIndex: number) {

        if(!this.systemSelect) {
            this.systemSelect = true;
        }
        else {
            this.navCtrl.setRoot(TabsPage, {tabIndex: tabIndex});
        }

    }


}