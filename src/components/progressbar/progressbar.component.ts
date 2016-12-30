/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component, Input } from '@angular/core';
import { Utils } from "../../libs/Utils";


@Component({
    selector: 'progressbar-component',
    templateUrl: 'progressbar.component.html'
})


export class ProgressBar {


    @Input() type: string;
    @Input() sum: number;
    @Input() totalSum: number;

    public sumForDisplay: string;
    public procent: string;
    public procentForLine: string;

    constructor() {
        this.sumForDisplay = '0';
    }


    /**
     *
     */
    public ngAfterContentInit(): void {
        this.procentForLine = '0';
        this.sumForDisplay = Utils.separatedBySpaceNumber(this.sum);
        this.procent = Utils.toFixed((this.sum / this.totalSum * 100), 1);
        setTimeout(() => this.procentForLine = this.procent, 100);
    }


}