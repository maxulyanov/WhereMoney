/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { PopoverComponent } from '../popover/popover.component';


@Component({
    selector: 'popover-action-component',
    templateUrl: 'popover-action.component.html'
})


export class PopoverActionComponent {


    /**
     *
     * @param popoverCtrl
     */
    constructor(private popoverCtrl: PopoverController) { }


    /**
     *
     * @param event
     */
    public presentPopover(event): void {
        let popover = this.popoverCtrl.create(PopoverComponent);
        popover.present({ ev: event });
    }

}