/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  04.11.2016
 * Time: 11:02
 */


'use strict';


import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { SqlService } from '../services/sql.service';
import { DbService } from '../services/db.service';
import { DateService } from "../services/date.service";

import { App} from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { ActivityPage } from '../pages/activity/activity';
import { BudgetPage } from '../pages/budget/budget';
import { StatsPage } from '../pages/stats/stats';
import { SettingPage } from '../pages/settings/settings';
import { TemplatesPage } from '../pages/templates/templates';
import { AboutPage } from '../pages/about/about';
import { AddTransactionPage } from '../pages/add-transaction/add-transaction';

import { SettingsActionComponent } from '../components/settings-action/settings-action.component';
import { AddTransactionActionComponent } from '../components/add-transaction-action/add-transaction-action.component';


@NgModule({
    declarations: [
        App,
        TabsPage,
        ActivityPage,
        BudgetPage,
        StatsPage,
        SettingPage,
        AboutPage,
        TemplatesPage,
        AddTransactionPage,

        SettingsActionComponent,
        AddTransactionActionComponent
    ],
    imports: [
        IonicModule.forRoot(App)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        App,
        TabsPage,
        ActivityPage,
        BudgetPage,
        StatsPage,
        SettingPage,
        AboutPage,
        TemplatesPage,
        AddTransactionPage
    ],
    providers: [SqlService, DbService, DateService]
})


export class AppModule {}
