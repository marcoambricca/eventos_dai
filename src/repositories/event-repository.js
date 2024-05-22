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
            `SELECT * FROM events e, event_locations el, locations l, provinces pr, users u, event_categories ec
                WHERE el.id = e.id_event_location and l.id = el.id_location and pr.id = l.id_province and e.id = $1`;
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
    getSearchSync = async (params) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = "SELECT * FROM events WHERE name=$1 or ";
            const values = [/*params....*/];
            const result = await client.query(sql, values);
            await client.end();
            returnObject = result.rows[0];
        }
        catch (error){
            console.log(error);
        }
        return returnObject;
    }
    getEnrollmentById = async (id, params) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = "SELECT * FROM events WHERE id=$1 or ";
            const values = [id, /*params.....*/];
            const result = await client.query(sql, values);
            await client.end();
            returnObject = result.rows[0];
        }
        catch (error){
            console.log(error);
        }
        return returnObject;
    }
}