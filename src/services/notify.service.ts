/**
 * Created by 1 on 03.11.2016.
 */


'use strict';


import { Injectable } from "@angular/core";

import { ToastController } from 'ionic-angular';
import { UserService } from './user.service';


@Injectable()
export class NotifyService {


    /**
     *
     * @param toastCtrl
     * @param userService
     */
    constructor(private toastCtrl: ToastController, private userService: UserService) {}


    /**
     *
     * @param message
     */
    public show(message: string): void {
        this.userService.getSettings("WHERE key = 'showNotify'").then(
            (data) => {
                if(data[0] && data[0].value == 1) {
                    const toast = this.toastCtrl.create({
                        message: message,
                        showCloseButton: true,
                        closeButtonText: 'Ok',
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
            }
        );
    }


}