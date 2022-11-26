import { AssetCrewRoute } from "./api/asset-crew.route";
import { AssetRoute } from "./api/assets.route";
import { AuthRoute } from "./api/authentication.route";
import { CasesRoute } from "./api/cases.route";
import { CrewRoute } from "./api/crew.route";
import { GateWayRoute } from "./api/gateway.route";
import { GeoFencesRoute } from "./api/geo-fences.route";
import { HomeRoute } from "./api/home.route";
import { LayersRoute } from "./api/layers.route";
import { UserRoute } from './api/users.route';
import { WorkScopeAreasRoute } from "./api/worck-scope-areas.route";
import { ClientRoute } from "./api/client.route";
// import { DetectionRoute } from "./api/detections.route";
// import { DetectionTypesRoute } from "./api/detection-types.route";
import {DectectionTypesRoute} from "./api/detection-types.route"
import { DectectionRoute } from './api/detections.route'
import {CaseStatusRoute} from './api/case-status.route'
import {SeverityRoute} from './api/severity-route'
import {DectectionConfigRoute} from './api/detection-config.route'
import {AlertRoute} from './api/alert.route'
import {AnalyticsRoute} from './api/analytics.route'
import { EntityRoute } from "./api/entity.route";
import { OperatorRoute } from './api/operator.route';

export class Routes {
    private authRoute: AuthRoute = new AuthRoute();
    private userRoute: UserRoute = new UserRoute();
    private clientRoute: ClientRoute = new ClientRoute();
    private assetRoute: AssetRoute = new AssetRoute();
    private crewRoute: CrewRoute = new CrewRoute();
    private assetCrewRoute: AssetCrewRoute = new AssetCrewRoute();
    private geoFencesRoute: GeoFencesRoute = new GeoFencesRoute();
    private homeRoute: HomeRoute = new HomeRoute();
    private workScopeAreasRoute: WorkScopeAreasRoute = new WorkScopeAreasRoute();
    private LayersRoute: LayersRoute = new LayersRoute();
    private GateWayRoute: GateWayRoute = new GateWayRoute();
    // private DetectionRoute: DetectionRoute = new DetectionRoute()
    // private DetectionTypesRoute: DetectionTypesRoute = new DetectionTypesRoute()
    private CaseRoute: CasesRoute = new CasesRoute();
    private detectionTypesRoute:DectectionTypesRoute = new DectectionTypesRoute()
    private detectionsRoute : DectectionRoute = new DectectionRoute();

    private caseStatusRoute: CaseStatusRoute = new CaseStatusRoute();
    private severityRoute: SeverityRoute = new SeverityRoute();
    private detectionConfigRoute: DectectionConfigRoute = new DectectionConfigRoute();

    private alertRoute: AlertRoute = new AlertRoute();
    private entityRoute: EntityRoute = new EntityRoute();
    private analyticsRoute: AnalyticsRoute = new AnalyticsRoute();
    private operatorRoute: OperatorRoute = new OperatorRoute();
    


    public Routes(app: any) {
        this.authRoute.Routes(app);
        this.userRoute.Routes(app);
        this.assetRoute.Routes(app);
        this.crewRoute.Routes(app);
        this.assetCrewRoute.Routes(app);
        this.geoFencesRoute.Routes(app);
        this.homeRoute.Routes(app);
        this.GateWayRoute.Routes(app);
        this.workScopeAreasRoute.Routes(app);
        this.LayersRoute.Routes(app);
        this.CaseRoute .Routes(app);
        this.detectionTypesRoute.Routes(app);
        this.detectionsRoute.Routes(app);
        this.caseStatusRoute.Routes(app);
        this.severityRoute.Routes(app);
        this.detectionConfigRoute.Routes(app);
        this.alertRoute.Routes(app);
        this.clientRoute.Routes(app);
        this.entityRoute.Routes(app);
        this.analyticsRoute.Routes(app);
        this.operatorRoute.Routes(app);
    }
}