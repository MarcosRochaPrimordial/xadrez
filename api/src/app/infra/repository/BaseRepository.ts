import { environment } from '../../../environment';
import * as mysql from 'mysql';

export class BaseRepository {

    private TABLE_NAME: string;

    constructor(NAME: string) {
        this.TABLE_NAME = NAME;
    }

    public Insert<T>(entity: T): Promise<number> {
        return new Promise((resolve, reject) => {
            this.Query(`INSERT INTO ${this.TABLE_NAME}(${Object.keys(entity)}) VALUES(${Object.keys(entity).fill('?')})`, Object.values(entity))
                .then((result: any) => {
                    resolve(result.insertId);
                })
                .catch(err => reject(err));
        });
    }

    protected Query<T>(query: string, args: any[]): Promise<T> {
        const con = mysql.createConnection(environment.database_config);
        return new Promise((resolve, reject) => {
            con.query(query, args, (err, rows: T) => {
                if (err) {
                    console.log(err);
                    reject('An error has ocurred');
                }

                resolve(rows);
                con.end();
            })
        });
    }
}