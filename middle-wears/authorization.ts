import { Request, Response } from 'express';
import * as  jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../common/enums/httpStatuses.enum';
import { UserRoles } from '../common/enums/roles.enum';
import { RequestHandler } from '../helper/http-request-handler.';


export class Authorization {

    static secretKey = process.env.jwt_secret_key || 'fijs$^(*@16487lkjgf#*_(kjlgffoiusdg2645789dgf';
    static generateToken(payload: any) {
        return jwt.sign(payload, Authorization.secretKey);
    }
    static verifyToken(req: any, res: any) {
        try {
            let token = req.headers.authorization ? req.headers.authorization.split('Bearer ')[1] : "";
            return jwt.verify(token, Authorization.secretKey);
        } catch (error) {
            return undefined;
        }
    }
    static checkAuthorization(req: Request, res: Response, next: any) {
        try {
            let decoded = Authorization.verifyToken(req, res);
            decoded ? next() : RequestHandler.handleErr(res, { message: "UNAUTHORIZED" }, HttpStatusCode.UNAUTHORIZED);
        } catch (error) {
            RequestHandler.handleErr(res, new Error('UNAUTHORIZED'), HttpStatusCode.UNAUTHORIZED);
        }
    }


    static getTokenInfo(req: any) {
        try {
            let tokenInfo: any = jwt.verify(req.headers.authorization.split('Bearer ')[1], this.secretKey);
            return tokenInfo;
        } catch (error) {
            return {}
        }
    }

    static getEntityId(req: any) {
        let info = this.getTokenInfo(req);
        return info['entityId'] ? info['entityId'] : "";
    }


    static CheckIfSuperAdmin(req: any) {
        let info = this.getTokenInfo(req);
        return info && info['roleId'] && info['roleId'] === UserRoles.superAdmin;
    }

}
