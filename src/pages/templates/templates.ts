/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { NavController, ToastController } from "ionic-angular";

import { TemplateService } from "../../services/template.service";
import { TransactionService } from "../../services/transaction.service";
import { AddTemplatePage } from "../add-template/add-transaction";
import { UpdateTemplatePage } from "../update-template/update-template";


@Component({
    selector: 'page-templates',
    templateUrl: 'templates.html'
})


export class TemplatesPage {


    public title: string;
    public totalCount: number;
    public templates: any[];
    public loadedTemplates: boolean;


    /**
     *
     * @param navCtrl
     * @param toastCtrl
     * @param transactionService
     * @param templateService
     */
    constructor(
        private navCtrl: NavController,
        private toastCtrl: ToastController,
        private transactionService: TransactionService,
        private templateService: TemplateService) {
        this.title = 'Шаблоны';
        this.totalCount = -1;
        this.templates = [];
        this.loadedTemplates = false;
    }


    /**
     *
     */
    public ionViewWillEnter(): void {
        this.cleanTemplates();
        this.renderTemplates();
    }



    /**
     *
     * @param event
     * @param id
     */
    public handlerClickCreateTransaction(event, id: number): void {
        event.preventDefault();

        let confirmResult = confirm('Создать новую запись на основе шаблона?');
        if(!confirmResult) {
            return;
        }

        this.templateService.getTemplateById(id).then(
            (template) => {
                delete template['id'];
                template['created'] = +new Date();
                this.transactionService.addTransaction(template).then((message: string) => {
                    const toast = this.toastCtrl.create({
                        message: message,
                        showCloseButton: true,
                        closeButtonText: 'Ok',
                        duration: 3000
                    });
                    toast.present();
                });
            },
            (error) => {
                console.error(error);
            }
        )
    }


    /**
     *
     * @param event
     */
    public handlerClickCreate(event: any): void {
        event.preventDefault();
        this.navCtrl.push(AddTemplatePage);
    }


    /**
     *
     * @param event
     * @param template
     * @param position
     */
    public handlerClickUpdate(event: any, template: any): void {
        event.stopPropagation();
        template.type = String(template.type);
        this.navCtrl.push(UpdateTemplatePage, {
            template: template
        });
    }


    /**
     *
     * @param event
     * @param id
     * @param position
     */
    public handlerClickDelete(event: any, id: number, position: number): void {
        event.stopPropagation();
        this.templateService.deleteTemplate(id).then((message: string) => {
            this.templates.splice(position, 1);
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
     */
    private renderTemplates(): void {
        this.getTemplates().then((templates: any[]) => {
            this.templates = templates;
            setTimeout(() => {
                this.loadedTemplates = true;
            }, 0);
        }, (error) => {
            console.error(error);
        })
    }


    /**
     *
     * @returns {any}
     */
    private getTemplates(): any {
        return new Promise((resolve, reject) => {
            this.templateService.getTemplates().then(
                (data) => {
                    if (data != null && data['items']) {
                        if(data['totalCount'] != null) {
                            this.totalCount = data['totalCount'];
                        }
                        resolve(data['items']);
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        })
    }


    /**
     *
     */
    private cleanTemplates(): void {
        this.totalCount = -1;
        this.loadedTemplates = false;
        this.templates = [];
    }


}
