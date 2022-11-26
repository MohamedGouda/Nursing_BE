import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';





export let upload: any = multer({
    storage: multer.diskStorage({
        destination: function (req: any, file: any, cb: any) {
            let uploadFIle: String = path.join(__dirname, '../../../../uploads');
            cb(null, uploadFIle)
        },
        filename: function (req: any, file: any, cb: any) {
            cb(null, `${req.params.id ? req.params.id : ''}-${file.fieldname}-${uuidv4()}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`)
        }
    })
});