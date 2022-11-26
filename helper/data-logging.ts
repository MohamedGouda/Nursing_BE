import { Collection_Names_Enum } from "../common/enums/collection-names";
import { ILog } from "../common/interfaces/ILog";

const MongoClient = require('mongodb').MongoClient;

export class DataLogging {
    url = process.env.DB_SERVER_URL + '//' + process.env.DB_NAME;
    log_time = parseInt(process.env.WORKER_LOG_FREQ_TIME || '5000');
    data_log_validation = parseInt(process.env.LOG_Time || '3000');

    static db: any = null;
    static connecting: boolean = false;
    static log: Map<string, any> = new Map();
    worker: any = null;


    constructor() { }

    Connect() {
        return new Promise((resolve: any, reject: any) => {
            if (!DataLogging.db && !DataLogging.connecting) {
                DataLogging.connecting = true;
                MongoClient.connect(this.url).then((db: any) => {
                    console.log('DataLogging Connected');
                    DataLogging.db = db.db(process.env.DB_NAME);
                    DataLogging.connecting = false;
                    this.worker = setInterval(() => {
                        DataLogging.log.forEach((_value: any) => {
                            if (_value.data.length > 0) {
                                console.log(`${_value.collectionName} :: ${_value.data.length}`)
                                new DataLogging().Save_To_DB(_value.collectionName, _value.data.splice(0, _value.data.length));
                            }
                        });
                    }, this.log_time)
                    resolve();
                });
            }
        });
    }

    private Save_To_DB(collectionName: string, data: any[]) {
        DataLogging.db.collection(collectionName).bulkWrite([...data]).then((r: any) => {
            console.log(`new Bulk ${data.length} Saved to DB ${collectionName}`)
        }).catch((err: any) => {
            console.log(`----------------------------------------collectionName:${collectionName}    data :${JSON.stringify(data)}`)
        });
    }

    public Add_Data_To_Log(doc: any, collectionName: string) {
        let _data: any = DataLogging.log.get(collectionName);
        if (!_data) {
            _data = {
                data: [],
                timestamp: new Date().getTime(),
                collectionName: collectionName,
                frequency: parseInt(this.Get_Collection_Frequency(collectionName))
            }
            DataLogging.log.set(collectionName, _data);
        }
        _data.data.push({ "insertOne": { "document": { ...doc, timestamp: new Date() } } })

    }
    private Get_Collection_Frequency(collectionName: string = '') {
        let defaultValue = '5000';
        switch (collectionName) {

            default:
                return defaultValue;
        }
    }


}