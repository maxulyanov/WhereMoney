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
    @Input() inputData: any = {};
    @Input() serviceType: string = 'transaction';
    @Input() idCategorySelected: number = -1;


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
        let modal = this.modalCtrl.create(TransactionModal, {
            title: 'Данные транзакции',
            inputData: this.inputData,
            readyCallback: (data) => {
                this.dataModal = data;
                this.goToService();
            }
        });
        modal.present();
    }


    /**
     *
     * @param id
     */
    public choiceCategory(id: number): void {
        this.idCategorySelected = id;
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
    }


    /**
     *
     */
    private goToService(): void {

        let data: any = {
            category_id: this.idCategorySelected,
            sum: this.dataModal.sum,
            description: this.dataModal.description,
            created: +new Date()
        };
        let promise: any;

        switch (this.serviceType) {
            case 'transaction':
                promise = this.transactionService.addTransaction(data);
                break;
            case 'addTemplate':
                promise = this.templateService.addTemplate(data);
                break;
            case 'updateTemplate':
                let id = this.inputData.templateId;
                if(id != null) {
                    promise = this.templateService.updateTemplate(id, data);
                }
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


}