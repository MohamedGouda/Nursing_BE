export class DataAccessLayer {
    private defaultLimitNumber = 20;


    paginationSkip(pageNumber: any, numberOfRecords: any) {
        pageNumber = Number(pageNumber);
        numberOfRecords = Number(numberOfRecords);
        return pageNumber > 0 ? numberOfRecords && pageNumber ? numberOfRecords * (pageNumber - 1) : 0 : 0;
    }

    paginationLimit(numberOfRecords: any) {
        return Number(numberOfRecords) ? Number(numberOfRecords) : this.defaultLimitNumber;
    }

    GetCollection(collection: any, condition: any = {}, skip: number = 0 /*this.paginationSkip(0, this.defaultLimitNumber)*/, limit: number = 0 /* this.paginationLimit(0)*/, fields: string = '') {
        return new Promise((resolve: any, reject: any) => {
            try {
                collection.find(condition).select(fields).skip(skip).limit(limit).exec((error: Error, docs: any) => {
                    if (error) reject(error);
                    else resolve(docs);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    AddToCollection(collection: any,) {
        return new Promise((resolve: any, reject: any) => {
            try {
                collection.save((error: Error, doc: any) => {
                    if (error) reject(error);
                    else resolve(doc);
                });
            } catch (error) {
                reject(error);
            };
        });
    }

    UpdateCollection(collection: any, condition: any, record: any, options: any) {
        return new Promise((resolve: any, reject: any) => {
            try {
                collection.findOneAndUpdate(condition, record, options, (error: Error, doc: any) => {
                    if (error) reject(error);
                    else resolve(doc);
                });
            } catch (error) {
                reject(error);
            };
        });
    }

    AggregateCollection(collection: any, aggregation: any) {
        return new Promise((resolve: any, reject: any) => {
            try {
                collection.aggregate(aggregation, (error: Error, doc: any) => {
                    if (error) reject(error);
                    else resolve(doc);
                });
            } catch (error) {
                reject(error);
            };
        });
    }

    DeleteCollection(collection: any, condition: any) {
        return new Promise((resolve: any, reject: any) => {
            try {
                collection.remove(condition, (error: any) => {
                    if (error) reject(error);
                    else resolve();
                })
            } catch (error) {
                reject(error);
            };
        });
    }
}