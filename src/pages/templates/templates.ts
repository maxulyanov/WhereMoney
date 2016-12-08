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
import { AddTemplatePage } from "../add-template/add-transaction";


@Component({
    selector: 'page-templates',
    templateUrl: 'templates.html'
})


export class TemplatesPage {


    public title: string;
    public totalCount: number;


    /**
     *
     * @param navCtrl
     * @param templateService
     */
    constructor(private navCtrl: NavController, private templateService: TemplateService) {
        this.title = 'Шаблоны';
        this.totalCount = -1;
    }


    /**
     *
     */
    public ionViewWillEnter(): void {
        this.renderTemplates();
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
     */
    private renderTemplates(): void {
        this.getTemplates().then((items: any[]) => {
            console.log(items)
        }, (error) => {
            console.error(`Error: ${error}`);
        })
    }


    /**
     *
     * @returns {any}
     */
    private getTemplates(): any {
        return new Promise((resolve, reject) => {
            this.templateService.getTemplates(1e10).then(
                (data) => {
                    if (data != null && data.res) {
                        let rows = data.res.rows;
                        let items = [];
                        this.totalCount = rows.length;
                        for (let i = 0; i < rows.length; i++) {
                            items.push(rows.item(i));
                        }
                        resolve(items);
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        })
    }


}
