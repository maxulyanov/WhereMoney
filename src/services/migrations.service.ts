/**
 * Created by 1 on 03.11.2016.
 */


'use strict';


import { Injectable } from "@angular/core";
import { SqlService } from "./sql.service";

enum types {
    COMMAND,
    MIGRATION,
}

import { m1 } from "../migrations/m1";
import { m2 } from "../migrations/m2";
const migrations = [ m1, m2 ];


@Injectable()
export class MigrationsService {


    private desiredMigrations: any[];
    private indexCommand: number;


    /**
     *
     * @param sqlService
     */
    constructor(private sqlService: SqlService) {
        this.indexCommand = 0;
    }


    /**
     *
     */
    public start(): Promise<any> {
        return new Promise((resolve) => {
            this.getMigrationVersion().then(
                (version) => {
                    this.desiredMigrations = migrations.slice(version);
                    this.executeMigrations().then(() => resolve())
                }
            )
        });
    }


    /**
     *
     * @param type
     * @returns {boolean}
     */
    private hasNext(type: types): boolean {
        const migrations = this.desiredMigrations;
        switch (type) {
            case types.MIGRATION:
                return migrations.length > 0;
            case types.COMMAND:
                return migrations.length > 0 && migrations[0].length > this.indexCommand;
        }
    }


    /**
     *
     * @returns {Promise<T>}
     */
    private executeMigrations(): Promise<any> {
        return new Promise((resolve) => {
            const next = () => {
                if (this.hasNext(types.MIGRATION)) {
                    this.executeCommands().then(() => {
                        this.desiredMigrations.shift();
                        next();
                    });
                }
                else {
                    resolve();
                }
            };
            next();
        });
    }


    /**
     *
     * @returns {Promise<T>}
     */
    private executeCommands(): Promise<any> {
        return new Promise((resolve) => {
            const next = () => {
                if (this.hasNext(types.COMMAND)) {
                    this.executeCommand(this.desiredMigrations[0][this.indexCommand]).then(() => {
                        this.indexCommand++;
                        next();
                    });
                }
                else {
                    this.indexCommand = 0;
                    resolve();
                }
            };
            next();
        });
    }


    /**
     *
     * @param command
     * @returns {Promise<T>}
     */
    private executeCommand(command: any): Promise<any> {
        return new Promise((resolve) => {
            this.sqlService.query(command.command, command.data).then(() => resolve());
        });
    }


    /**
     *
     * @returns {Promise<T>}
     */
    private getMigrationVersion(): Promise<any> {
        return new Promise((resolve) => {
            let promise = this.sqlService.query(`SELECT version FROM migrations`, []);
            let version = 0;
            promise.then(
                (data) => {
                    if (data != null && data.res) {
                        if (data != null && data.res && data.res.rows.length) {
                            version = data.res.rows.item(0).version;
                        }
                        resolve(version)
                    }
                },
                () => {
                    resolve(version);
                });
        });
    }

}