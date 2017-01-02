/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { EVENTS} from './../../events';


@Component({
    selector: 'page-add-template',
    templateUrl: 'add-template.html'
})


export class AddTemplatePage {


    public title: string;
    public eventType: string;


    /**
     *
     */
    constructor() {
        this.title = 'Создание шаблона';
        this.eventType = EVENTS.ADD_TEMPLATE;
    }



}
