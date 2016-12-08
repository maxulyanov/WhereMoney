/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';


@Component({
    selector: 'page-add-template',
    templateUrl: 'add-template.html'
})


export class AddTemplatePage {


    public title: string;
    public serviceType: string;


    /**
     *
     */
    constructor() {
        this.title = 'Создание шаблона';
        this.serviceType = 'template';
    }



}
