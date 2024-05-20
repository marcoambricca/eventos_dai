import DBConfig from './../configs/db-config.js';
import pkg from 'pg';
const { Client } = pkg;

export default class EventRepository{
    getAllSync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM events';
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        }
        catch (error){
            console.log(error);
        }
        return returnArray;
    }
    getByIdSync = async (id) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 
            `SELECT * from events WHERE id=$1
            `;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            returnObject = result.rows[0];
        }
        catch (error){
            console.log(error);
        }
        return returnObject;
    }
    getSearchSync = async () => {
        let returnArray
    }
}