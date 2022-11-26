import * as joi from 'joi';

export class ObjectValidation {

    static async ValidateSchema(schemaObject: any, object: any) {
        return schemaObject.validateAsync(object);
    }
}