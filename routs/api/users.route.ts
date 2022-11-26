import * as express from "express";
import { ControllerNames } from "../../common/enums/controller-name.enum";
import { UsersController } from "../../controller/users.controller";
import { upload } from "../../helper/upload-handler";
import { Authorization } from "../../middle-wears/authorization";


export class UserRoute {
    private _controllerName: ControllerNames = ControllerNames.USERS;
    private _UserController: UsersController = new UsersController();

    public Routes(app: express.Application) {
        app.route(`/${ControllerNames.ENTRY_ROUTE}/${this._controllerName}/roles`).get(Authorization.checkAuthorization, this._UserController.GetUserRoles);

        app.route(`/${ControllerNames.ENTRY_ROUTE}/${this._controllerName}/user-image`).post(upload.any(), Authorization.checkAuthorization, this._UserController.saveImage);
        app.route(`/${ControllerNames.ENTRY_ROUTE}/${this._controllerName}/user-image/:id`).get(upload.any(),/* Authorization.checkAuthorization,*/ this._UserController.getImage);

        
        app.route(`/${ControllerNames.ENTRY_ROUTE}/${this._controllerName}`).post(Authorization.checkAuthorization, this._UserController.CreateUser);
        app.route(`/${ControllerNames.ENTRY_ROUTE}/${this._controllerName}/:id?`).put(Authorization.checkAuthorization, this._UserController.UpdateUser);
        app.route(`/${ControllerNames.ENTRY_ROUTE}/${this._controllerName}/:id?`).delete(Authorization.checkAuthorization, this._UserController.DeleteUser);
        app.route(`/${ControllerNames.ENTRY_ROUTE}/${this._controllerName}`).get(Authorization.checkAuthorization, this._UserController.GetAllUsers);
        app.route(`/${ControllerNames.ENTRY_ROUTE}/${this._controllerName}/entity/:id`).get(Authorization.checkAuthorization, this._UserController.GetAllUsersByEntityId);
        app.route(`/${ControllerNames.ENTRY_ROUTE}/${this._controllerName}/:id?`).get(Authorization.checkAuthorization, this._UserController.GetUserById);
        app.route(`/${ControllerNames.ENTRY_ROUTE}/user/entity/:id?`).get(Authorization.checkAuthorization, this._UserController.getUserByEntity);
        app.route(`/${ControllerNames.ENTRY_ROUTE}/user/client/:id?`).get(Authorization.checkAuthorization, this._UserController.getUserByClient);
        app.route(`/${ControllerNames.ENTRY_ROUTE}/user/operator/:id?`).get(Authorization.checkAuthorization, this._UserController.getUserByOperator);
        
        
        
        

    }

}
