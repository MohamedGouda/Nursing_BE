import { IDatabase } from "../common/interfaces/db.interface";
import { Database } from "../db/_db";

export class Global {

    public static dataBase: IDatabase;

    public static applicationAssetCollection: any[] = [];

    /**global variables for cases and alerts */
    public static casesCount =0;
    public static alertsCount =0;

    constructor() {
        Global.dataBase = new Database();
    }

    PreInitialize() {
        return new Promise((resolve: any, reject: any) => {
            Global.dataBase.connect()
                .then((result: any) => {
                    resolve();
                })
                .catch((err: Error) => {
                    reject();
                });
        });

    }

}