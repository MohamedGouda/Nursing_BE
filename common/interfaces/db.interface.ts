
export interface IDatabase {
    url: string;
    connection: any;
    connect<Promise>(): any;
}