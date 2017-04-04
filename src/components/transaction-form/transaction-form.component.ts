/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component, Input } from '@angular/core';
import { ModalController  } from "ionic-angular";

import { CategoryService } from "../../services/category.service";
import { TransactionService } from "../../services/transaction.service";
import { TemplateService } from "../../services/template.service";
import { UserService } from "../../services/user.service";
import { BudgetService } from "../../services/budget.service";
import { NotifyService } from "../../services/notify.service";
import { TransactionModal } from "../transaction-modal/transaction-modal.component";
import { EVENTS} from './../../events';

@Component({
    selector: 'transaction-form-component',
    templateUrl: 'transaction-form.component.html'
})


export class TransactionForm {


    @Input() type: string = '0';
    @Input() inputData: any = {};
    @Input() eventType: string = EVENTS.ADD_TRANSACTION;
    @Input() idCategorySelected: number = -1;


    public categories: any[];

    private dataModal: any;


    /**
     *
     * @param categoryService
     * @param modalCtrl
     * @param notifyService
     * @param transactionService
     * @param userService
     * @param budgetService
     */
    constructor(
        private categoryService: CategoryService,
        private modalCtrl: ModalController,
        private notifyService: NotifyService,
        private transactionService: TransactionService,
        private userService: UserService,
        private budgetService: BudgetService,
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
     */
    public handlerSelectType(): void {
        this.cleanCategories();
        this.renderCategories();
    }


    /**
     *
     */
    public presentModal(): void {
        const modal = this.modalCtrl.create(TransactionModal, {
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
     * @param slug
     * @param type
     */
    public choiceCategory(id: number, slug: string, type: string): void {
        this.idCategorySelected = id;
        this.inputData.slug = slug;
        this.inputData.type = type;
        this.presentModal();
    }


    /**
     *
     * @returns {any}
     */
    private getCategories(): Promise<any> {
        return this.categoryService.getCategories(parseInt(this.type));
    }


    /**
     *
     */
    private renderCategories(): void {
        this.getCategories().then(
            (categories)=> {
                if(categories.length > 13) {
                    const otherCategory = categories.splice(13, 1);
                    categories.push(otherCategory[0]);
                }
                this.categories = categories;
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
        const data: any = {
            category_id: this.idCategorySelected,
            sum: this.dataModal.sum,
            description: this.dataModal.description,
            created: +new Date(),
            inBudget: this.dataModal.inBudget
        };
        let promise: Promise<any>;

        switch (this.eventType) {
            case EVENTS.ADD_TRANSACTION:
                promise = this.transactionService.addTransaction(data);
                break;
            case EVENTS.ADD_TEMPLATE:
                promise = this.templateService.addTemplate(data);
                break;
            case EVENTS.UPDATE_TEMPLATE:
                const id = this.inputData.templateId;
                if(id != null) {
                    promise = this.templateService.updateTemplate(id, data);
                }
                break;
            default:
                console.error(`${this.eventType} not supported!`);
        }

        promise.then((message: string) => {
            this.notifyService.show(message);

            if(this.eventType === EVENTS.ADD_TRANSACTION) {
                let sum = data.sum;
                if(this.type === '0') {
                    sum = parseInt('-' + sum);
                    if(data.inBudget) {
                        this.budgetService.updateRestBudget(sum);
                    }
                }
                this.userService.updateBalance(sum);
            }

        },
        (error) => {
            console.error(error);
        });
    }



}