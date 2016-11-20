/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component, Input } from '@angular/core';
import { ModalController, ToastController  } from "ionic-angular";

import { CategoryService } from "../../services/category.service";
import { TransactionService } from "../../services/transaction.service";
import { ModalTransaction } from "../modal-transaction/modal-transaction.component";


@Component({
    selector: 'form-transaction-component',
    templateUrl: 'form-transaction.component.html'
})


export class FormTransaction {


    @Input() type: string = '0';
    @Input() indexSelected: number = -1;


    public categories: any[];

    private dataModal: any;


    /**
     *
     * @param categoryService
     * @param modalCtrl
     * @param toastCtrl
     * @param transactionService
     */
    constructor(
        private categoryService: CategoryService,
        private modalCtrl: ModalController,
        private toastCtrl: ToastController,
        private transactionService: TransactionService) {
        this.categories = [];
        this.dataModal = {};
    }


    /**
     *
     */
    public ngAfterContentInit(): void {
        this.renderCategories();
    }


    /**
     *
     * @param event
     */
    public selectedType(event): void {
        this.cleanCategories();
        this.renderCategories();
    }


    /**
     *
     */
    public presentModal(): void {
        let profileModal = this.modalCtrl.create(ModalTransaction, {
            title: 'Новая транзакция',
            readyCallback: (data) => {
                this.dataModal = data;
                this.pushToBase();
            }
        });
        profileModal.present();
    }


    /**
     *
     * @param index
     */
    public choiceCategory(index: number): void {
        this.indexSelected = index;
        this.presentModal();
    }


    /**
     *
     * @returns {any}
     */
    private getCategories(): any {
        return this.categoryService.getCategories(parseInt(this.type));
    }


    /**
     *
     */
    private renderCategories(): void {
        this.getCategories().then(
            (data)=> {
                if(data != null && data.res) {
                    let rows = data.res.rows;
                    for (let i = 0; i < rows.length; i++) {
                        this.categories.push(rows.item(i));
                    }
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }


    /**
     *
     */
    private cleanCategories(): void {
        this.categories = [];
        this.indexSelected = -1;
    }


    /**
     *
     */
    private pushToBase(): void {
        const promise = this.transactionService.addTransaction({
            type: parseInt(this.type),
            category: this.indexSelected,
            sum: this.dataModal.sum,
            description: this.dataModal.description,
            timestamp: new Date()
        });

        promise.then((message: string) => {
            const toast = this.toastCtrl.create({
                message: message,
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            toast.present();
        });
    }


}