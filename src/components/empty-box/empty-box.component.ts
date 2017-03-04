/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component, Input } from '@angular/core';


@Component({
    selector: 'empty-box-component',
    templateUrl: 'empty-box.component.html'
})


export class EmptyBox {


    @Input() text: string = 'Нет данных для отображения';


    constructor() {

    }


}