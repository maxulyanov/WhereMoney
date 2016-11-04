

'use strict';


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SqlService } from '../../services/sql.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    storage: any;

  constructor(private nav: NavController, private sqlService: SqlService) {
      sqlService.createTable('test', '   key text primary key, value text');
      sqlService.set('title', '100').then((data) => {
          console.log('success!');
          console.log(data);
      })
  }

}
