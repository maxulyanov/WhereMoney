/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component, Input } from '@angular/core';

@Component({
    selector: 'numbers-area-component',
    templateUrl: 'numbers-area.component.html'
})


export class NumbersArea {


    @Input() value: number = 0;


    public buttons: any[];


    constructor() {
        this.buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0];
    }


    public handlerClickNumber(value: number): void {
        console.log(value);
    }


    public handlerClickDelete(): void {
        console.log('del');
    }


    public getValue(): number {
        return this.value;
    }


    public setValue(value: number): void {
        this.value = value;
    }


}