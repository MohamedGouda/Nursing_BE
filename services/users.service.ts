import { UserRoles } from "../common/enums/roles.enum";
import { RecordStatus } from "../common/enums/status.enum";
import { ObjectId } from "bson";
import { UserModel } from "../db/models/users.model";
import { DataAccessLayer } from "../helper/_dal";
import { Roles } from "../db/models/role.model";
import { query } from "express";


export class UserService {

    private dal = new DataAccessLayer();
    GetAllUsersByEntityId(entityId: string,query: any, user: any) {
        let sortObj: any = { createdDate: -1 };
        let filterObj: any = {};
        const entityCond =  entityId.length == 24 ? {entityId: new ObjectId(entityId)} :  {}
        let aggregation =
            [
                {
                    $facet: {
                        paginatedResults:
                            [
                                { $match: { status: { $ne: RecordStatus.deleted }, 
                                ...filterObj, roleId: { $ne: UserRoles.superAdmin }, 
                               ...entityCond, createdBy: user} 
                                },
                                {
                                    $lookup: {
                                        from: 'role',
                                        as: "role",
                                        let: { fk: "$roleId" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ['$$fk', '$_id']
                                                    },
                                                    status: { $ne: RecordStatus.deleted }
                                                }

                                            }
                                        ]
                                    }
                                },
                                {
                                    $unwind: {
                                        path: '$role',
                                        "preserveNullAndEmptyArrays": true
                                    }
                                },
                                { $sort: sortObj },
                                { $skip: this.dal.paginationSkip(query.pageNumber, query.numberOfRecords) },
                                { $limit: this.dal.paginationLimit(query.numberOfRecords) },
                                {
                                    $project: {
                                        firstName: 1,
                                        lastName: 1,
                                        email: 1,
                                        roleId: 1,
                                        role: 1,
                                        id: 1,
                                        phoneNumber: 1,
                                        address: 1,
                                        status: 1,
                                        createdBy: 1,
                                        createdDate: 1,
                                        entityId: 1
                                    }
                                }
                            ],
                        totalCount: [
                            { $match: { status: { $ne: RecordStatus.deleted }, ...filterObj } },
                            { $count: 'count' },
                        ]
                    },
                },
                { $unwind: { path: '$totalCount' } }

            ];

        return this.dal.AggregateCollection(UserModel, aggregation);


    }

    public GetAllUsers(query: any) {
        let sortObj: any = { createdDate: -1 };
        let filterObj: any = {};
        let aggregation =
            [
                {
                    $facet: {
                        paginatedResults:
                            [
                                { $match: { status: { $ne: RecordStatus.deleted }, ...filterObj, roleId: { $ne: UserRoles.superAdmin } } },
                                {
                                    $lookup: {
                                        from: 'role',
                                        as: "role",
                                        let: { fk: "$roleId" },
                                        pipeline: [
                                            {
                                                $match: {
                                                    $expr: {
                                                        $eq: ['$$fk', '$_id']
                                                    },
                                                    status: { $ne: RecordStatus.deleted }
                                                }

                                            }
                                        ]
                                    }
                                },
                                {
                                    $unwind: {
                                        path: '$role',
                                        "preserveNullAndEmptyArrays": true
                                    }
                                },
                                { $sort: sortObj },
                                { $skip: this.dal.paginationSkip(query.pageNumber, query.numberOfRecords) },
                                { $limit: this.dal.paginationLimit(query.numberOfRecords) },
                                {
                                    $project: {
                                        firstName: 1,
                                        lastName: 1,
                                        email: 1,
                                        roleId: 1,
                                        role: 1,
                                        id: 1,
                                        phoneNumber: 1,
                                        address: 1,
                                        status: 1,
                                        createdBy: 1,
                                        createdDate: 1,
                                        entityId: 1,
                                        clientId: 1
                                    }
                                }
                            ],
                        totalCount: [
                            { $match: { status: { $ne: RecordStatus.deleted }, ...filterObj } },
                            { $count: 'count' },
                        ]
                    },
                },
                { $unwind: { path: '$totalCount' } }

            ];

        return this.dal.AggregateCollection(UserModel, aggregation);


    }

    public GetUserById(id: string) {
        return this.dal.GetCollection(UserModel, { _id: new ObjectId(id) });
    }


    public CreateUser(body: any, byUser: string) {
        return new Promise(async (resolve, reject) => {
            let user: any = new UserModel();
            user.firstName = body.firstName;
            user.lastName = body.lastName;
            user.email = body.email;
            user.id = body.id;
            user.id = body.id;
            user.roleId = Number(body.roleId);
            user.phoneNumber = body.phoneNumber;
            user.address = body.address;
            user.image = body.image
            user.password = body.password;
            user.status = RecordStatus.active;
            user.createdBy = byUser;
            user.updatedBy = byUser;
            //update to handle case of pass entity id
            if (body.entityid !== null) {
                user.entityId = body.entityid;
            }
            if (body.clientid !== null) {
                user.clientId = body.clientid;
            }
            if (body.operatorId !== null) {
                user.operatorId = body.operatorId;
            }
            
            this.dal.AddToCollection(user)
                .then(doc => {
                    this.SendEmailToUser(user);
                    resolve(doc);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }


    public UpdateUser(email: string, body: any, user: string) {
        return this.dal.UpdateCollection(UserModel, { email: email }, body, {});
    }

    public DeleteUser(id: string,) {
        return this.dal.DeleteCollection(UserModel, { _id: new ObjectId(id) });
    }

    GetUserRoles() {
        return this.dal.GetCollection(Roles, { id: { $ne: UserRoles.superAdmin } });
    }

    SendEmailToUser(user: any) {
        // await sendEmail.sendEmail(user.email, "Mawaqef Password", user.password,
        //     `<h3>Hello ${user.firstName},</h3><p>Your password for Mawaqef App is :</p><h2>
        // <strong>
        // ${user.password}
        // </strong>
        // </h2>
        // <br>
        // <br>
        // Regards.
        // <br>
        // <small>Mawaqef App</small>
        // </p> `
        // );
    }

    getUserByEntity(id: string){
        // console.log(id)
        return this.dal.GetCollection(UserModel, { entityId: new ObjectId(id) });
    }
    getUserByClient(id: string){
        // console.log(id)
        return this.dal.GetCollection(UserModel, { clientId: new ObjectId(id) });
    }
    getUserByOperator(id: string){
        // console.log(id)
        return this.dal.GetCollection(UserModel, { operatorId: new ObjectId(id) });
    }
}