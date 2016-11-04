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

import { App } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';


@NgModule({
  declarations: [
      App,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(App)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  App,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [SqlService, DbService]
})


export class AppModule {}
