import { ObjectId } from "mongodb";
import { Detections } from "../common/enums/detection-enum";
import { DetectionTypes } from "../common/enums/detection-types.enum";
import { DynamicFieldsTypes } from "../common/enums/dynamic-feileds-types.enum";
import { UserRoles } from "../common/enums/roles.enum";
import { RecordStatus } from "../common/enums/status.enum";
import { alertModel } from "./models/alert.model";
import { DetectionsTypesModel } from "./models/detections-types.model";
import { Roles } from "./models/role.model";
import { UserModel } from "./models/users.model";

export const rejoins = ["AUH", "DXB", "SHJ", "RAK", "AJM", "FUJ", "UAQ",];

export const assetTemplates: any = [
    {
        name: "Smart vehicle",
        description: "Smart vehicle made by Tahaluf with Tahaluf devices",
        id: 1,
        metaData: [
            {
                name: "Plate region",
                placeHolder: "Smart vehicle Plate region",
                description: "The Plate region of the Smart vehicle ",
                type: DynamicFieldsTypes.ddl,
                lookup: [
                    { name: "AUH", value: "AUH", description: "Abu Dhabi" },
                    { name: "DXB", value: "DXB", description: "Dubai" },
                    { name: "SHJ", value: "SHJ", description: "Sharja" },
                    { name: "RAK", value: "RAK", description: "Ras al Khaimeh" },
                    { name: "AJM", value: "AJM", description: "Ajman" },
                    { name: "FUJ", value: "FUJ", description: "Al-Fujerah" },
                    { name: "UAQ", value: "UAQ", description: "Um al-quain" },
                ]
            },
            {
                name: "Plate code",
                placeHolder: "Smart vehicle Plate code",
                description: "The Plate code of the Smart vehicle ",
                type: DynamicFieldsTypes.input
            },
            {
                name: "Plate Number",
                placeHolder: "Smart vehicle Plate number",
                description: "The Plate number of the Smart vehicle ",
                type: DynamicFieldsTypes.number
            },
            {
                name: "Brand",
                placeHolder: "Smart vehicle Brand",
                description: "The Brand of the Smart vehicle ",
                type: DynamicFieldsTypes.input
            },
            {
                name: "Model",
                placeHolder: "Smart vehicle model",
                description: "The model of the Smart vehicle ",
                type: DynamicFieldsTypes.input
            },
            {
                name: "Passengers number",
                placeHolder: "Smart vehicle model",
                description: "The model of the Smart vehicle ",
                type: DynamicFieldsTypes.input
            },
        ],
        devices: [
            {
                name: "imei",
                description: "Smart vehicle device imei",
                placeHolder: "Smart vehicle device imei",
                type: DynamicFieldsTypes.input

            }
        ]
    }
]
export class InitData {

    static initDetectionTypes() {
        let detectionsType = [
            {
                name: "ROAD QUALITY ",
                id: DetectionTypes.ROAD_QUALITY,
                description: "",
                subTypes: [
                    {
                        name: "Cracks ",
                        id: Detections.CRACKS,
                        description: "Detecting any road and street cracks "
                    },
                    {
                        name: "Potholes ",
                        id: Detections.POTHOLES,
                        description: "Detecting any potholes in the road"
                    },
                    {
                        name: "Water puddle ",
                        id: Detections.WATER_PUDDLE,
                        description: "Detecting any water puddle in the road"
                    },
                    {
                        name: "Corrupted Manhole ",
                        id: Detections.CORRUPTED_MANHOLE,
                        description: "Detecting any corruption with street manhole "
                    },
                    {
                        name: "Road lanes bad painting",
                        id: Detections.ROAD_LANES_BAD_PAINTING,
                        description: "Detecting unclear lanes lines"
                    },
                ]
            },
            {
                name: "WASTE DETECTION ",
                id: DetectionTypes.WASTE_DETECTION_ENGINE,
                description: "",
                subTypes: [
                    {
                        name: "Garbage & litter",
                        id: Detections.GARBAGE_LITTER,
                        description: "Detecting garbage and litter thrown in the road"
                    },
                    {
                        name: "Overloaded waste containers ",
                        id: Detections.OVERLOADED_WASTE_CONTAINERS,
                        description: "Detecting Overloaded waste and garbage containers"
                    },
                    {
                        name: "Construction waste",
                        id: Detections.CONSTRUCTION_WASTE,
                        description: "Detecting any construction waste "
                    },
                    {
                        name: "Road sand",
                        id: Detections.ROAD_SAND,
                        description: "Detecting if sand is deviated from side road and covering parts of the road."
                    },
                    {
                        name: "Garden waste",
                        id: Detections.GARDEN_WASTE,
                        description: "Detecting any garden waste left on / aside the road"
                    },
                    {
                        name: "Furniture waste",
                        id: Detections.FURNITURE_WASTE,
                        description: "Detecting any furniture waste left on / aside the road"
                    },

                ]
            },
            {
                name: "TRAFFIC",
                id: DetectionTypes.TRAFFIC_ENGINE,
                description: "",
                subTypes: [
                    {
                        name: "Traffic lights blackout",
                        id: Detections.TRAFFIC_LIGHTS_BLACKOUT,
                        description: "Detecting any traffic light blackout "
                    },
                    {
                        name: "Damaged Traffic signs",
                        id: Detections.DAMAGED_TRAFFIC_SIGNS,
                        description: "Detecting damaged, broken, fallen traffic light "
                    },
                    {
                        name: "Missing or wrong Traffic signs ",
                        id: Detections.MISSING_OR_WRONG_TRAFFIC_SIGNS,
                        description: "Detecting wrong & missing street signs like speed limit, bump sign, etc."
                    },
                    {
                        name: "Defected streetlights",
                        id: Detections.DEFECTED_STREETLIGHTS,
                        description: "Detecting defected, blackout and broken street lights "
                    },


                ]
            },
            {
                name: "SAFETY ",
                id: DetectionTypes.SAFETY_MANAGER_ENGINE,
                description: "",
                subTypes: [
                    {
                        name: "Fallen trees",
                        id: Detections.FALLEN_TREES,
                        description: "Detecting any fallen tree by the road"
                    }, {
                        name: "Abandoned vehicles",
                        id: Detections.ABANDONED_VEHICLES,
                        description: "Detecting Abandoned dusted cars "
                    }, {
                        name: "Fire hydrant detection",
                        id: Detections.FIRE_HYDRANT,
                        description: "Detecting any Fire hydrants "
                    }, {
                        name: "Construction area ",
                        id: Detections.CONSTRUCTION_AREA,
                        description: "Detecting construction sites from construction signs"
                    }, {
                        name: "Drivable way obstacles",
                        id: Detections.DRIVABLE_WAY_OBSTACLES,
                        description: "Detecting any obstacles in the driving roads"
                    },
                ]
            },
            {
                name: "VANDALISM & BEHAVIOR",
                id: DetectionTypes.VANDALISM_DETECTION_BEHAVIOR_ENGINE,
                description: "",
                subTypes: [
                    {
                        name: "Graffiti Detection ",
                        id: Detections.GRAFFITI,
                        description: "Detecting illegal distorted graffiti on the streets."
                    }, {
                        name: "Lamppost sticker ",
                        id: Detections.LAMPPOST_STICKER,
                        description: "Detecting lamppost stickers /Detecting anyone putting lamppost stickers"
                    },
                ]
            },
            {
                name: "STREET ANIMALS",
                id: DetectionTypes.STREET_ANIMALS_DETECTION_ENGINE,
                description: "",
                subTypes: [
                    {
                        name: "Animals",
                        id: Detections.ANIMALS,
                        description: "Detecting any free animal on the road Cats, dogs, camels, etc "
                    },
                ]
            },
            {
                name: "SCENE EVIDENCE MATCHING  ",
                id: DetectionTypes.SCENE_EVIDENCE_MATCHING_ENGINE,
                description: "",
                subTypes: [
                    {
                        name: "Before and after case ",
                        id: Detections.BEFORE_AND_AFTER_CASE_HANDLING_VALIDATION,
                        description: "Compare captured before and after image for reported case and detect if case handled as expected. "
                    },
                ]
            },
        ];


        DetectionsTypesModel.deleteMany({}, (err: any) => {
            if (!err)
                DetectionsTypesModel.collection.insertMany(detectionsType, (err: any) => {
                    if (!err)
                        console.log('Detections Type initialized');
                    else
                        throw err;
                });
            else
                console.error(err);
        });
    }

    static initSuperAdminUser() {
        let user = [{
            firstName: "super",
            lastName: "admin",
            email: "superadmin@citya.com",
            password: "superadmin",
            id: "",
            phoneNumber: "",
            address: "",
            image: "",
            createdBy: "System",
            createdDate: new Date(),
            updatedBy: "System",
            updatedDate: new Date(),
            roleId: UserRoles.superAdmin,
            status: RecordStatus.active,
        }];

        UserModel.deleteMany({ roleId: UserRoles.superAdmin }, (err: any) => {
            if (!err)
                UserModel.collection.insertMany(user, (err: any) => {
                    if (!err)
                        console.log('Super admin User initialized');
                    else
                        throw err;
                });
            else
                console.error(err);
        });
    };

    static initUsersRoles() {

        let roles = [
            {
                id: UserRoles.superAdmin,
                name: "System super Admin",
                description: "Super admin is Tahaluf IT team who may need access on the system for support actions "
            },
            {
                id: UserRoles.controlRoomAdmin,
                name: "Control room Admin ",
                description: "Admin is the customer side system Admin who receives Alarms and manages cases, reports and dashboards. "
            },
            {
                id: UserRoles.inspector,
                name: "Inspector",
                description: "Inspector is the person who is in the smart vehicle and concerned with the Alarms detection process. "
            },
            {
                id: UserRoles.entityAdmin,
                name: "Entity Admin ",
                description: "Entity Admin is the 3rd party entity who is concerned to take action when receiving cases from some Alarms open automatic case side system Admin who receives Alarms and manages cases, reports and dashboards. "
            },
            {
                id: UserRoles.EntityOperatorUser,
                name: "Entity operator / user ",
                description: "Entity operator is the 3rd party executer who do the street work according to the assigned case. "
            },


        ];
        Roles.deleteMany({}, (err: any) => {
            Roles.collection.insertMany(roles, (err: any) => {
                console.log('Roles_Categories_Schema initialized');
                this.initSuperAdminUser();
            });
        });
    };

    static initAlerts(){
        const alerts = [
            {
                title: "CRACKS",
                description: "asd1",
                entityId: new ObjectId('63037532a7d8749c6a9c580e'),
                severityId: 2,
                sourceId: 1,
                submissionType: "Auto",
                sector: "AUH",
                coordinates: [
                    Math.random() *(54.6 - 54.0)+ 54.0,24.4
                ],
                createdDate: new Date(),
            },
            {
                title: "POTHOLES",
                description: "asd12",
                entityId: new ObjectId('63037532a7d8749c6a9c580e'),
                severityId: 1,
                sourceId: 2,
                submissionType: "Auto",
                sector: "AUH",
                coordinates: [
                    Math.random() *(54.6 - 54.0)+ 54.0,24.5
                ],
                createdDate: new Date(),
            },
            {
                title: "GARBAGE_LITTER",
                description: "asd1",
                entityId: new ObjectId('63037532a7d8749c6a9c580e'),
                severityId: 3,
                sourceId: 1,
                submissionType: "Auto",
                sector: "AUH",
                coordinates: [
                    Math.random() *(54.6 - 54.0)+ 54.0,24.4
                ],
                createdDate: new Date(),
            },

        ]
        alertModel.collection.insertMany(alerts,  (err: any) => {
            console.log('Roles_Categories_Schema initialized');
            this.initAlerts();
        })
    };
    static initializer() {
        this.initUsersRoles();
        this.initDetectionTypes();
        // this.initAlerts()
    };
}
