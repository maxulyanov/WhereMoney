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
import { TemplateService } from "../../services/template.service";
import { TransactionModal } from "../transaction-modal/transaction-modal.component";


@Component({
    selector: 'transaction-form-component',
    templateUrl: 'transaction-form.component.html'
})


export class TransactionForm {


    @Input() type: string = '0';
    @Input() serviceType: string = 'transaction';
    @Input() indexSelected: number = -1;


    public categories: any[];

    private dataModal: any;


    /**
     *
     * @param categoryService
     * @param modalCtrl
     * @param toastCtrl
     * @param transactionService
     * @param templateService
     */
    constructor(
        private categoryService: CategoryService,
        private modalCtrl: ModalController,
        private toastCtrl: ToastController,
        private transactionService: TransactionService,
        private templateService: TemplateService) {
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
    public handlerSelectType(event): void {
        this.cleanCategories();
        this.renderCategories();
    }


    /**
     *
     */
    public presentModal(): void {
        let profileModal = this.modalCtrl.create(TransactionModal, {
            title: 'Данные транзакции',
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

        let data: any = {
            category_id: this.indexSelected,
            sum: this.dataModal.sum,
            description: this.dataModal.description,
            created: +new Date()
        };
        let promise: any;

        switch (this.serviceType) {
            case 'transaction':
                promise = this.transactionService.addTransaction(data);
                break;
            case 'template':
                promise = this.templateService.addTemplate(data);
                break;
            default:
                console.error(`${this.serviceType} not supported!`);
        }

        promise.then((message: string) => {
            const toast = this.toastCtrl.create({
                message: message,
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 3000
            });
            toast.present();
        });
    }


    /**
     *
     * @returns {any}
     */
    private getCurrentService(): any {
        let service: any;
        switch (this.serviceType) {
            case 'transaction':
                service = this.transactionService.addTransaction;
                break;
            case 'template':
                service = this.templateService.addTemplate;
                break;
            default:
                console.error(`${service} not supported!`);
        }
        return service;
    }


}