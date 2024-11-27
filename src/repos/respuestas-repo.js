import pg from "pg";
import { DBConfig } from "./db.js";
export default class respuestasRepo
{
    constructor()
    {
        const {Client} = pg;
        this.DBClient = new Client(DBConfig);
        this.DBClient.connect();
    }

}