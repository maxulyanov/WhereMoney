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
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { SqlService } from '../services/sql.service';
import { DbService } from '../services/db.service';
import { DateService } from "../services/date.service";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";

import { App} from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { ActivityPage } from '../pages/activity/activity';
import { BudgetPage } from '../pages/budget/budget';
import { StatsPage } from '../pages/stats/stats';
import { SettingPage } from '../pages/settings/settings';
import { TemplatesPage } from '../pages/templates/templates';
import { AboutPage } from '../pages/about/about';
import { AddTransactionPage } from '../pages/add-transaction/add-transaction';

import { SettingsAction } from '../components/settings-action/settings-action.component';
import { CategoryIcon} from '../components/category-icon/category-icon.component';
import { TransactionAction } from '../components/transaction-action/transaction-action.component';
import { TransactionModal } from '../components/transaction-modal/transaction-modal.component';
import { Modal } from '../components/modal/modal.component';
import { TransactionForm } from '../components/transaction-form/transaction-form.component';
import { NumbersArea } from '../components/numbers-area/numbers-area.component';


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

        SettingsAction,
        CategoryIcon,
        TransactionAction,
        Modal,
        TransactionModal,
        TransactionForm,
        NumbersArea
    ],
    imports: [
        IonicModule.forRoot(App),
        ChartsModule
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
        Modal,
        TransactionModal
    ],
    providers: [SqlService, DbService, DateService, CategoryService, TransactionService]
})


export class AppModule {}
