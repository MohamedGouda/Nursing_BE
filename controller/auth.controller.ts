import { Request, Response } from 'express';
import { AuthService } from "../services/auth.service";
import { RequestHandler } from '../helper/http-request-handler.';
import { HttpStatusCode } from '../common/enums/httpStatuses.enum';


export class AuthController {

    public async Login(req: Request, res: Response) {
        new AuthService().Login(req.body)
            .then((result: any) => {
                RequestHandler.handleRes(res, result);
            })
            .catch((err: any) => {
                RequestHandler.handleErr(res, err, HttpStatusCode.INTERNAL_SERVER_ERROR);
            });
    }
}
