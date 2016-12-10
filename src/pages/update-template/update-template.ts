/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component({
    selector: 'page-update-template',
    templateUrl: 'update-template.html'
})


export class UpdateTemplatePage {


    public title: string;
    public template: any;
    public serviceType: string;


    /**
     *
     */
    constructor(private navParams: NavParams) {
        this.title = 'Редактирование шаблона';
        this.serviceType = 'updateTemplate';
    }


    /**
     *
     */
    public ionViewDidLoad(): void {
        this.template = this.navParams.get('template');
    }


}
