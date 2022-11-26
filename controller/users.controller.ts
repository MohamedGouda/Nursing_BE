import { Request, Response } from 'express';
import { HttpStatusCode } from "../common/enums/httpStatuses.enum";
import { RequestHandler } from "../helper/http-request-handler.";
import { ImageService } from '../helper/image.service';
import { Authorization } from '../middle-wears/authorization';

import { UserService } from "../services/users.service";




export class UsersController {
    GetAllUsersByEntityId(req: Request, res: Response) {
        new UserService().GetAllUsersByEntityId(req.params.id,req.query,Authorization.getTokenInfo(req)['email'] ? Authorization.getTokenInfo(req)['email'] : "")
        .then((result: any) => {
            RequestHandler.handleRes(res, result);
        })
        .catch((err: any) => {
            RequestHandler.handleErr(res, err, HttpStatusCode.INTERNAL_SERVER_ERROR);
        });
    }


    CreateUser(req: Request, res: Response) {
        new UserService().CreateUser(req.body, Authorization.getTokenInfo(req)['email'] ? Authorization.getTokenInfo(req)['email'] : "")
            .then((result: any) => {
                RequestHandler.handleRes(res, result);
            })
            .catch((err: any) => {
                RequestHandler.handleErr(res, err, HttpStatusCode.INTERNAL_SERVER_ERROR);
            });

    }
    UpdateUser(req: Request, res: Response) {
        new UserService().UpdateUser(req.body.email, req.body, Authorization.getTokenInfo(req)['email'] ? Authorization.getTokenInfo(req)['email'] : "")
            .then((result: any) => {
                RequestHandler.handleRes(res, result);
            })
            .catch((err: any) => {
                RequestHandler.handleErr(res, err, HttpStatusCode.INTERNAL_SERVER_ERROR);
            });
    }
    DeleteUser(req: Request, res: Response) {
        new UserService().DeleteUser(req.params.id)
            .then((result: any) => {
                RequestHandler.handleRes(res, result);
            })
            .catch((err: any) => {
                RequestHandler.handleErr(res, err, HttpStatusCode.INTERNAL_SERVER_ERROR);
            });
    }
    GetAllUsers(req: Request, res: Response) {
        new UserService().GetAllUsers(req.query)
            .then((result: any) => {
                RequestHandler.handleRes(res, result);
            })
            .catch((err: any) => {
                RequestHandler.handleErr(res, err, HttpStatusCode.INTERNAL_SERVER_ERROR);
            });
    }
    GetUserById(req: Request, res: Response) {
        new UserService().GetUserById(req.params.id)
            .then((result: any) => {
                RequestHandler.handleRes(res, result);
            })
            .catch((err: any) => {
                RequestHandler.handleErr(res, err, HttpStatusCode.INTERNAL_SERVER_ERROR);
            });
    }
    GetUserRoles(req: Request, res: Response) {
        new UserService().GetUserRoles()
            .then((result: any) => {
                RequestHandler.handleRes(res, result);
            })
            .catch((err: any) => {
                RequestHandler.handleErr(res, err, HttpStatusCode.INTERNAL_SERVER_ERROR);
            });
    }
    saveImage(req: Request, res: Response) {
        new ImageService().saveImage(req.files)
            .then((result: any) => {
                RequestHandler.handleRes(res, result);
            })
            .catch((err: any) => {
                RequestHandler.handleErr(res, err, HttpStatusCode.INTERNAL_SERVER_ERROR);
            });
    }
    getImage(req: Request, res: Response) {
        new ImageService().getImage(req.params.id)
            .then((result: any) => {
                res.sendFile(result);
            })
            .catch((err: any) => {
                RequestHandler.handleErr(res, err, HttpStatusCode.INTERNAL_SERVER_ERROR);
            });
    }


    getUserByEntity(req: Request, res: Response){
        new UserService().getUserByEntity(req.params.id)
            .then((result: any) => {
                RequestHandler.handleRes(res, result);
            })
            .catch((err: any) => {
                RequestHandler.handleErr(res, err, HttpStatusCode.INTERNAL_SERVER_ERROR);
            });
    }

    getUserByClient(req: Request, res: Response){
        console.log(req)
        new UserService().getUserByClient(req.params.id)
            .then((result: any) => {
                RequestHandler.handleRes(res, result);
            })
            .catch((err: any) => {
                RequestHandler.handleErr(res, err, HttpStatusCode.INTERNAL_SERVER_ERROR);
            });
    }
    getUserByOperator(req: Request, res: Response){
        console.log(req)
        new UserService().getUserByOperator(req.params.id)
            .then((result: any) => {
                RequestHandler.handleRes(res, result);
            })
            .catch((err: any) => {
                RequestHandler.handleErr(res, err, HttpStatusCode.INTERNAL_SERVER_ERROR);
            });
    }
}