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

import { DateService } from "../../services/date.service";
import { BudgetService } from "../../services/budget.service";
import { UserService } from "../../services/user.service";


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
     * @param dateService
     * @param budgetService
     * @param userService
     */
    constructor(
            private navParams: NavParams,
            private dateService: DateService,
            private budgetService: BudgetService,
            private userService: UserService) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
        this.registerBudget();
    }


    /**
     *
     */
    private registerBudget(): void {
        const startWeek: number = +this.dateService.getDateStartWeek();
        const {year, week} = this.dateService.getWeekNumber(new Date(startWeek));
        this.budgetService.getBudget(year, week).then((data) => {
           if(!data) {
               this.userService.getSettings().then((data) => {
                   let value: number = 0;
                   if(Array.isArray(data)) {
                       data.forEach((item) => {
                          if(item.key === 'budget') {
                              value = item.value;
                          }
                       });
                   }
                   this.budgetService.updateBudget(value);
               })
           }
        });
    }


}
