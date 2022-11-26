import * as express from "express";
import { ControllerNames } from "../../common/enums/controller-name.enum";
import { AuthController } from "../../controller/auth.controller";

export class AuthRoute {
    _controllerName = ControllerNames.AUTH;
    private controller: AuthController = new AuthController();
    public Router = express.Router();

    public Routes(app: any) {
        app.route(`/${ControllerNames.ENTRY_ROUTE}/${this._controllerName}/login`).post(this.controller.Login);
        // this.Router.post('/login', this._AuthController.Login);
    }

}
