/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component, Input,  Output, EventEmitter  } from '@angular/core';

import { NumberButton  } from '../../models/NumberButton';
import { Utils } from "../../libs/Utils";


@Component({
    selector: 'numbers-area-component',
    templateUrl: 'numbers-area.component.html'
})


export class NumbersArea {


    @Input() value: any = '0';

    @Output() updatedSum = new EventEmitter();


    public buttons: any[];


    /**
     *
     */
    constructor() {
        this.buttons = [];
    }


    /**
     *
     */
    public ngAfterContentInit(): void {
        this.createButtons();
        this.setValue(Utils.separatedBySpaceNumber(String(this.value)));
    }


    /**
     *
     * @param value
     */
    public select(value: any): void {
        let currentValue: string = this.getValue();
        if(currentValue == '0') {
            currentValue = value;
        }
        else {
            currentValue += value;
        }
        this.setValue(Utils.separatedBySpaceNumber(currentValue));
        this.outputValue();
    }


    /**
     *
     */
    public clear(): void {
        let currentValue: string = this.getValue();
        let newValue = currentValue.slice(0, -1);
        if(newValue.length === 0) {
            newValue = '0';
        }
        this.setValue(Utils.separatedBySpaceNumber(newValue));
        this.outputValue();
    }


    /**
     *
     */
    public clearAll(): void {
        this.setValue('0');
        this.outputValue();
    }


    /**
     *
     * @returns {string}
     */
    public getValue(): string {
        return this.value;
    }


    /**
     *
     * @param value
     */
    public setValue(value: string): void {
        this.value = value;
    }


    /**
     *
     */
    private outputValue(): void {
        this.updatedSum.emit(this.value);
    }


    /**
     *
     */
    private createButtons(): void {
        const names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        names.forEach((name) => {
            this.buttons.push(new NumberButton(name));
        });
    }

}