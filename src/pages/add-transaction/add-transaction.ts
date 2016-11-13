/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  05.11.2016
 * Time: 23:56
 */


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CategoryService } from '../../services/category.service';


@Component({
    selector: 'page-transaction',
    templateUrl: 'add-transaction.html'
})


export class AddTransactionPage {


    public title: string;
    public categories: any[];


    /**
     *
     * @param navCtrl
     * @param categoryService
     */
    constructor(private navCtrl: NavController, private categoryService: CategoryService) {
        this.title = 'Добавление транзакции';
        this.categories = [];
    }


    /**
     *
     */
    ionViewWillEnter(): void {
        this.renderCategories();
    }


    /**
     *
     * @returns {any}
     */
    private getCategories(): any {
        return this.categoryService.getCategories();
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


}
