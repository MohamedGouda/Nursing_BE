import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import * as path from "path";
import { serverConfig } from "../config";
import { apiDocument } from "./swagger/app.documentation";
import { HttpStatusCode } from "./common/enums/httpStatuses.enum";
import * as swaggerUi from "swagger-ui-express";
import * as fs from 'fs';
import morgan from 'morgan';
import { Routes } from "./routs/route";
import { Global } from "./helper/global.helper";
import { Redis } from "./helper/redis.helper";

import {Automatic} from  '../src/services/push-alerts.service'



class App {

    public app: express.Application;
    public route: Routes | undefined;
    private global: Global;

    private corsOptions: cors.CorsOptions = {
        origin: "*"
    };

    constructor() {
        dotenv.config();
        this.app = express();
        this.global = new Global();
        this.global.PreInitialize().
            then(() => {
                this.BuildApp();
            }).
            catch(() => {
                process.exit(1);
            });
    }

    private BuildApp() {
        new Redis();
        this.app.set('trust proxy', 1);
        this.app.use(express.json({
            limit: "20mb"
        }));
        this.app.use(cors(this.corsOptions));
        this.app.use(express.urlencoded({
            extended: true,
            limit: '20mb'
        }));
        this.app.use(cors(), express.urlencoded({ extended: true }));
        this.app.use(cors(), express.urlencoded({ extended: true }), express.json({ limit: '500mb' }));



        this.route = new Routes();
        this.route.Routes(this.app)




        // FE ROuting
        this.app.use(express.static(__dirname + '/fe'));
        this.app.get('/fe/*', function (req, res) {
            res.sendFile(path.join(__dirname + '/fe/index.html'));
        });
        // FE ROuting

        //logging
        const accessLogStream = fs.createWriteStream(path.join(__dirname, '/../access.log'), { flags: 'a' })
        this.app.use(morgan('combined', { stream: accessLogStream }))
        //logging

        //Documentation
        var swaggerOptions = {
            explorer: false
        };
        this.app.use('/api-docs', swaggerUi.serve);
        this.app.get('/api-docs', swaggerUi.setup(apiDocument.doc, swaggerOptions));

        //Documentation

        //Capture All 404 errors
        this.app.use(function (req, res, next) {
            res.status(HttpStatusCode.NOT_FOUND).send('Unable to find the requested resource!');
        });
        //Capture All 404 errors

        new Automatic().pushAlerts()

    }
}

export default new App().app;