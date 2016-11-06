/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';

import { TemplatesPage } from '../../pages/templates/templates';
import { AutoPaymentPage } from '../../pages/autopayment/autopayment';
import { SettingPage } from '../../pages/settings/settings';
import { AboutPage } from '../../pages/about/about';


@Component({
    selector: 'popover-component',
    templateUrl: 'popover.component.html'
})


export class PopoverComponent {


    private nav;


    /**
     *
     * @param viewCtrl
     * @param navCtrl
     */
    constructor(private viewCtrl: ViewController, private navCtrl: NavController) {
        this.nav = arguments[0].data.nav;
    }


    /**
     *
     * @param page
     */
    close(page: string): void {
        this.viewCtrl.dismiss();

        let selectedPage: any;
        switch (page) {
            case 'settings':
                selectedPage = SettingPage;
                break;
            case 'templates':
                selectedPage = TemplatesPage;
                break;
            case 'autopayment':
                selectedPage = AutoPaymentPage;
                break;
            case 'about':
                selectedPage = AboutPage;
                break;
            default:
                console.error(`Error select page! ${page} not supported!`);
        }

        this.navCtrl.setRoot(selectedPage);
    }


}