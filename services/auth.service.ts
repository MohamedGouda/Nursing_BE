import { RecordStatus } from '../common/enums/status.enum';
import { DataAccessLayer } from '../helper/_dal';
import { Authorization } from '../middle-wears/authorization';
import { UserModel } from '../db/models/users.model';
import { ClientModel } from '../db/models/client.model';
import { ObjectID } from 'bson';


export class AuthService {

    private userModel = UserModel;
    private dal = new DataAccessLayer();
    public Login(body: any) {
        return new Promise(async (resolve, reject) => {
            try {
                let aggregation = [
                    {
                        $match: {
                            email: body.email,
                            password: body.password,
                            status: { $ne: RecordStatus.deleted }
                        }
                    },
                    {
                        $project: {
                            firstName: 1,
                            lastName: 1,
                            email: 1,
                            roleId: 1,
                            entityId:1,
                            clientId:1,
                            operatorId:1,
                            image: 1,
                            _id: 1
                        }
                    }
                ]
                

                this.dal.AggregateCollection(this.userModel, aggregation)
                    .then((doc: any) => {
                        if (doc.length) {
                        this.dal.GetCollection(ClientModel , {_id: new ObjectID(doc[0].clientId)}).then((res:any)=>{
                            console.log(res)
                            let tokenObj: any =
                            {
                                name: doc[0].firstName + "" + doc[0].lastName,
                                email: doc[0].email,
                                roleId: doc[0].roleId,
                                permission: [doc[0].roleId],
                                _id: doc[0]._id,
                                entityId: doc[0].entityId,
                                clientId: doc[0].clientId,
                                operatorId: doc[0].operatorId,
                                image: doc[0]?.image? doc[0].image : 'profile.png' ,
                                clientImage: res[0]?.icon ? res[0].icon : 'citya-logo.png'
                            };
                            doc[0].token = Authorization.generateToken(tokenObj);
                            console.log(doc[0]);
                            resolve(doc[0]);
                           })

                           
                        } else {
                            let err = new Error("You have entered an invalid username or password")
                            reject(err);
                        }
                    })
                    .catch((err: any) => {
                        reject(err);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
}