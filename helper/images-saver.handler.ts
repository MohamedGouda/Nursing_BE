
import * as fs from 'fs';
import { RequestHandler } from "./http-request-handler.";
import { FileSaver } from '../common/interfaces/save-file.interface';





export class SaveFiles {

    private IntervalTime: number = 5000;
    public static files: FileSaver[];
    private static defaultFilePath: any = '';

    constructor() {
        // this.IntervalFileSaver();
    }

    public static SaveOneFile(file: FileSaver) {
        return new Promise((resolve: any, reject: any) => {
            try {
                fs.writeFileSync(`${file.path ? file.path : SaveFiles.defaultFilePath}/${file.name}`, file.content, 'base64');
                resolve(file.name);
            } catch (error) {
                reject(error);
            }
        });

    }

    public static SaveFileAsBulk(file: FileSaver) {
        this.files.push(file);
    }


    private IntervalFileSaver() {
        setInterval(() => {
            try {
                let filesArr = SaveFiles.files.splice(0, SaveFiles.files.length - 1);
                let saveFilesFun: any = [];
                filesArr.forEach(e => {
                    saveFilesFun.push(e);
                });

                Promise.all(saveFilesFun)
                    .then(result => {
                        console.log(`${result.length} files saved`);
                    }).catch((error: any) => {
                        RequestHandler.logErr(error);
                    });
            } catch (error) {
                RequestHandler.logErr(error);
            }

        }, this.IntervalTime);

    }

}