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
            const sql = 'SELECT get_event_details($1)';
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
            let sql = "SELECT * FROM events";
            let values = [params.name, params.category, params.startdate, params.tag];
            if (params.name != null || params.category != null || params.startdate != null || params.tag != null){
                sql += " WHERE "
            }
            if (params.name != null){
                sql += "name = $1"
            }
            if (params.category != null){
                sql += "id_event_category = (SELECT id from event_categories WHERE name = $2)"
            }
            if (params.startdate != null){
                sql += "start_date = $3"
            }
            if (params.tag != null){
                sql += ""
            }
            
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