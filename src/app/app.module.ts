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
import { ChartModule } from "angular2-highcharts";

import { SqlService } from '../services/sql.service';
import { DbService } from '../services/db.service';
import { DateService } from "../services/date.service";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import { TemplateService } from "../services/template.service";
import { UserService } from "../services/user.service";
import { NotifyService } from "../services/notify.service"

import { App} from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { ActivityPage } from '../pages/activity/activity';
import { BudgetPage } from '../pages/budget/budget';
import { StatsPage } from '../pages/stats/stats';
import { SettingPage } from '../pages/settings/settings';
import { TemplatesPage } from '../pages/templates/templates';
import { AboutPage } from '../pages/about/about';
import { AddTransactionPage } from '../pages/add-transaction/add-transaction';
import { AddTemplatePage } from '../pages/add-template/add-transaction';
import { UpdateTemplatePage } from '../pages/update-template/update-template';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { SettingsAction } from '../components/settings-action/settings-action.component';
import { CategoryIcon} from '../components/category-icon/category-icon.component';
import { TransactionAction } from '../components/transaction-action/transaction-action.component';
import { TransactionItem } from '../components/transaction-item/transaction-item.component';
import { TransactionModal } from '../components/transaction-modal/transaction-modal.component';
import { Modal } from '../components/modal/modal.component';
import { TransactionForm } from '../components/transaction-form/transaction-form.component';
import { NumbersArea } from '../components/numbers-area/numbers-area.component';
import { ListItem } from '../components/list-item/list-item.component';
import { ProgressBar } from '../components/progressbar/progressbar.component';


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
        AddTemplatePage,
        UpdateTemplatePage,
        TutorialPage,

        SettingsAction,
        CategoryIcon,
        Modal,
        NumbersArea,
        TransactionAction,
        TransactionItem,
        TransactionModal,
        TransactionForm,
        ListItem,
        ProgressBar
    ],
    imports: [
        IonicModule.forRoot(App),
        ChartModule
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
        AddTransactionPage,
        AddTemplatePage,
        UpdateTemplatePage,
        TutorialPage,
        Modal,
        TransactionModal
    ],
    providers: [
        SqlService,
        DbService,
        DateService,
        CategoryService,
        TransactionService,
        TemplateService,
        UserService,
        NotifyService]
})


export class AppModule {}
