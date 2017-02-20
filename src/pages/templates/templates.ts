/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { NavController } from "ionic-angular";

import { TemplateService } from "../../services/template.service";
import { TransactionService } from "../../services/transaction.service";
import { NotifyService } from "../../services/notify.service";

import { AddTemplatePage } from "../add-template/add-transaction";
import { UpdateTemplatePage } from "../update-template/update-template";
import { UserService } from "../../services/user.service";


@Component({
    selector: 'page-templates',
    templateUrl: 'templates.html'
})


export class TemplatesPage {


    public title: string;
    public emptyText: string;
    public totalCount: number;
    public templates: any[];
    public loadedTemplates: boolean;


    /**
     *
     * @param navCtrl
     * @param notifyService
     * @param transactionService
     * @param userService
     * @param templateService
     */
    constructor(
        private navCtrl: NavController,
        private notifyService: NotifyService,
        private transactionService: TransactionService,
        private userService: UserService,
        private templateService: TemplateService) {
        this.title = 'Шаблоны';
        this.emptyText = 'Нет созданных шаблонов';
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
     */
    public createTemplate(event: any): void {
        event.preventDefault();
        this.navCtrl.push(AddTemplatePage);
    }


    /**
     *
     * @param event
     * @param id
     */
    public createTransaction(event, id: number): void {
        event.preventDefault();

        this.templateService.getTemplateById(id).then(
            (template) => {
                let type = template['type'];
                delete template['type'];
                delete template['id'];
                template['created'] = +new Date();
                this.transactionService.addTransaction(template).then((message: string) => {
                    this.notifyService.show(message);
                    let sum = template.sum;
                    if(type == '0') {
                        sum = parseInt('-' + sum);
                    }
                    this.userService.updateBalance(sum);
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
     * @param template
     * @param position
     */
    public updateTemplate(event: any, template: any): void {
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
    public deleteTemplate(event: any, id: number, position: number): void {
        event.stopPropagation();
        this.templateService.deleteTemplate(id).then((message: string) => {
            this.templates.splice(position, 1);
            this.notifyService.show(message);
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
