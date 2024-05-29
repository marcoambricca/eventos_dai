import DBConfig from './../configs/db-config.js';
import pkg from 'pg';
const { Client } = pkg;

export default class EventRepository{
    getAllSync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT get_all_events()';
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
            let sql = `
                SELECT * FROM events e where name = $1 
                or id_event_category = (SELECT id from event_categories WHERE name = $2) 
                or start_date = $3 
                or tags.name = $4
                INNER JOIN event_tags et on e.id = et.id_event
                INNER JOIN tags t on et.id_tag = t.id`;
            let values = [params.name, params.category, params.startdate, params.tag];
            /*if (params.name != null || params.category != null || params.startdate != null || params.tag != null){
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
            }*/
            
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
        console.log(params);
        try {
            await client.connect();
            const sql = `
                select
                    er.id,
                    er.id_event,
                    er.id_user,
                    json_build_object(
                        'user', u.id,
                        'first_name', u.first_name,
                        'last_name', u.last_name,
                        'username', u.username,
                        'password', u.password
                    ),
                    er.description,
                    er.registration_date_time,
                    er.attended,
                    er.observations,
                    er.rating
                from event_enrollments er
                inner join users u on er.id_user = u.id
                inner join events e on er.id_event = e.id
                where er.id_event = $1 and (NOT u.first_name = $2 or u.first_name = $2) and (NOT u.last_name = $3 or u.last_name = $3) and (NOT u.username = $4 or u.username = $4) and (NOT er.attended = $5 or er.attended = $5) and (NOT er.rating = $6 or er.rating = $6)
            `;
            let values = [id, params[0], params[1], params[2], params[3], params[4]];
            values = values.map(x => x == undefined ? x = null : x = x)
            console.log(values)
            const result = await client.query(sql, values);
            console.log(result)
            await client.end();
            returnObject = result.rows[0];
        }
        catch (error){
            console.log(error);
        }
        return returnObject;
    }
}