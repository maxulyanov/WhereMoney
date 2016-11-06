/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 22:43
 */


'use strict';


import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';

import { PopoverComponent } from '../../components/popover/popover.component';


@Component({
    selector: 'page-activity',
    templateUrl: 'activity.html'
})


export class ActivityPage {


    public title: string;
    public rootNav: any;


    constructor(private nav: NavController, private popoverCtrl: PopoverController) {
        this.title = 'Активность';
        this.rootNav = this.nav.parent;
    }

    /**
     *
     * @param event
     */
    presentPopover(event) {
        let popover = this.popoverCtrl.create(PopoverComponent);
        popover.present({ ev: event });
    }


}
