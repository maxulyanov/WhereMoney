/**
 * Created by PhpStorm.
 * Author: 1
 * Project: WhereMoney
 * Date:  04.11.2016
 * Time: 9:40
 */


import { Component, ViewChild } from '@angular/core';
import { NavParams, Tab } from 'ionic-angular';

import { ActivityPage } from '../activity/activity';
import { BudgetPage } from '../budget/budget';
import { TemplatesPage } from '../templates/templates';
import { StatsPage } from '../stats/stats';


@Component({
    selector: 'tabs',
    templateUrl: 'tabs.html'
})


export class TabsPage {


    @ViewChild('homeTab') tabRef: Tab;


    public tab1Root: any = ActivityPage;
    public tab2Root: any = BudgetPage;
    public tab3Root: any = TemplatesPage;
    public tab4Root: any = StatsPage;
    public mySelectedIndex: number;


    /**
     *
     * @param navParams
     */
    constructor(private navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }



}
