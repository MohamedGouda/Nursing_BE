import mongoose, { ConnectOptions } from 'mongoose';
import { IDatabase } from '../common/interfaces/db.interface';
import { DataLogging } from '../helper/data-logging';
import { InitData } from './_initial.db';



export class Database implements IDatabase {
    url: string = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    connection: any;
    intervalConnection: any = null;
    timeout: number = parseInt(process.env.CONNECTION_TIME_OUT || '3012');

    constructor() { }

    connect() {
        return new Promise((resolve: any, reject: any) => {
            mongoose.connect(this.url, this.GetOptions(),
                (err: any) => {
                    if (!err) {
                        this.connection = true;
                        console.log(`Connected to DB __ ${this.url}`);
                        InitData.initializer();
                        new DataLogging();
                        resolve();
                    } else {
                        console.log(`err${err}`);
                        reject();
                    }
                });
        });

    }

    private GetOptions() {
        let connectionOptions: ConnectOptions = {
            autoIndex: true,
            maxPoolSize: 10,
            minPoolSize: 10,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            keepAlive: true,
            keepAliveInitialDelay: 300000,
        };

        return connectionOptions;
    };
}
