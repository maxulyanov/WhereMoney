/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 22:43
 */


'use strict';


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';



@Component({
    selector: 'page-activity',
    templateUrl: 'activity.html'
})


export class ActivityPage {


    public title: string;
    public rootNav: any;


    constructor(private nav: NavController) {
        this.title = 'Активность';
        this.rootNav = this.nav.parent;
    }




}
