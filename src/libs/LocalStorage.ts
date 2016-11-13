/**
 * Created by PhpStorm.
 * Author: Max Ulyanov
 * Project: WhereMoney
 * Date:  13.11.2016
 * Time: 12:29
 */


'use strict';


export class LocalStorage {


    /**
     *
     * @param property
     * @param value
     */
    static set(property: string, value: any) {
        value = value || {};
        var valueJSON = JSON.stringify(value);
        window.localStorage.setItem(property, valueJSON);
    }


    /**
     *
     * @param property
     * @returns {null}
     */
    static get(property: string) {
        var object = window.localStorage.getItem(property);
        return object == null ? null : JSON.parse(object);
    }


    /**
     *
     * @param property
     */
    static remove(property: string) {
        window.localStorage.removeItem(property);
    }

}