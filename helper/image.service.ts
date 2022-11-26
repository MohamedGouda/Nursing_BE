import * as path from 'path';

export class ImageService {
    saveImage(files: any) {
        return new Promise((resolve: any, reject: any) => {
            try {
                resolve({imagePathName:files[0].filename});
            } catch (error) {
                reject(error)
            }
        });
    }

    getImage(id: string) {
        return new Promise((resolve: any, reject: any) => {
            try {
                resolve(path.join(__dirname, `../../../../uploads/${id}`));
            } catch (error) {
                reject(error)
            }
        })

    }
}




