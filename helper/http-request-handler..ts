import { Response } from 'express'
import { Collection_Names_Enum } from '../common/enums/collection-names';
import { DataLogging } from './data-logging';



export class RequestHandler {

    static logErr(err: any) {
        try {
            new DataLogging().Add_Data_To_Log({ error: err }, Collection_Names_Enum.ERROR_LOG);
            throw new Error(err);
        } catch (error) {
            console.log(err.code);
        }
    }

    static handleRes(res: Response, data: any, allRecordCount: any = 0) {
        try {
            let obj: any = {};
            obj.allRecordCount = allRecordCount
            obj.data = data ? data : []
            res.send(obj);
        } catch (error) {
            RequestHandler.logErr(error);
        }
    }

    static handleErr(res: Response, err: any, status: any) {
        try {
            RequestHandler.logErr(err);
            res.status(status).json(
                {
                    type: 'error',
                    message: err ? err.message ? err.message.split(',') ? err.message.split(',')[0] : 'INTERNAL SERVER ERROR' : "INTERNAL SERVER ERROR" : "INTERNAL SERVER ERROR",
                    error: err ? err.errorType : status
                }
            );
        } catch (error) {
            RequestHandler.logErr(error);
        }
    }
    
    static handleResponse(res: Response, data: any) {
        try {
            res.send(data);
        } catch (error) {
            RequestHandler.logErr(error);
        }
    }

}
