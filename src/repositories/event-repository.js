import DBConfig from './../configs/db-config.js';
import pkg from 'pg';
const { Client } = pkg;

export default class EventRepository{
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
            this.get
        return returnObject;
    }

    /**
     *  Este metodo hace...
     * @param {} params  la cantidad de ..
     * @returns 
     */


    /*SELECT 
        json_agg(json_build_object(
            'id', e.id,
            'name', e.name,
            'description', e.description,
            'event_category', json_build_object(
                'id', ec.id,
                'name', ec.name
            ),
            'event_location', json_build_object(
                'id', el.id,
                'name', el.name,
                'full_address', el.full_address,
                'max_capacity', el.max_capacity,
                'latitude', el.latitude,
                'longitude', el.longitude,
                'location', json_build_object(
                    'id', l.id,
                    'name', l.name,
                    'latitude', l.latitude,
                    'longitude', l.longitude,
                    'province', json_build_object(
                        'id', pr.id,
                        'name', pr.name,
                        'full_name', pr.full_name,
                        'latitude', pr.latitude,
                        'longitude', pr.longitude,
                        'display_order', pr.display_order
                    )
                )
            ),
            'start_date', e.start_date,
            'duration_in_minutes', e.duration_in_minutes,
            'price', e.price,
            'enabled_for_enrollment', e.enabled_for_enrollment,
            'max_assistance', e.max_assistance,
            'creator_user', json_build_object(
                'id', u.id,
                'username', u.username,
                'first_name', u.first_name,
                'last_name', u.last_name
            ),
            'tags', (
                SELECT json_agg(json_build_object('id', tags.id, 'name', tags.name)) 
                FROM tags 
                JOIN event_tags et ON tags.id = et.id_tag 
                WHERE et.id_event = e.id
            )
        )) INTO events_list
    FROM events e
    INNER JOIN event_categories ec ON e.id_event_category = ec.id
    INNER JOIN event_locations el ON e.id_event_location = el.id
    INNER JOIN locations l ON el.id_location = l.id
    INNER JOIN provinces pr ON l.id_province = pr.id
    INNER JOIN users u ON e.id_creator_user = u.id
    */

    getSearchSync = async (params) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        const adds = ['e.name', 'ec.name', 'e.start_date', 't.name']
        console.log(params);
        try {
            await client.connect();
            let sql = `
            SELECT 
            json_agg(json_build_object(
                'id', e.id,
                'name', e.name,
                'description', e.description,
                'event_category', json_build_object(
                    'id', ec.id,
                    'name', ec.name
                ),
                'event_location', json_build_object(
                    'id', el.id,
                    'name', el.name,
                    'full_address', el.full_address,
                    'max_capacity', el.max_capacity,
                    'latitude', el.latitude,
                    'longitude', el.longitude,
                    'location', json_build_object(
                        'id', l.id,
                        'name', l.name,
                        'latitude', l.latitude,
                        'longitude', l.longitude,
                        'province', json_build_object(
                            'id', pr.id,
                            'name', pr.name,
                            'full_name', pr.full_name,
                            'latitude', pr.latitude,
                            'longitude', pr.longitude,
                            'display_order', pr.display_order
                        )
                    )
                ),
                'start_date', e.start_date,
                'duration_in_minutes', e.duration_in_minutes,
                'price', e.price,
                'enabled_for_enrollment', e.enabled_for_enrollment,
                'max_assistance', e.max_assistance,
                'creator_user', json_build_object(
                    'id', u.id,
                    'username', u.username,
                    'first_name', u.first_name,
                    'last_name', u.last_name
                ),
                'tags', (
                    SELECT json_agg(json_build_object('id', tags.id, 'name', tags.name)) 
                    FROM tags 
                    JOIN event_tags et ON tags.id = et.id_tag 
                    WHERE et.id_event = e.id
                )
            ))
            FROM events e
            INNER JOIN event_categories ec ON e.id_event_category = ec.id
            INNER JOIN event_locations el ON e.id_event_location = el.id
            INNER JOIN locations l ON el.id_location = l.id
            INNER JOIN provinces pr ON l.id_province = pr.id
            INNER JOIN users u ON e.id_creator_user = u.id
            INNER JOIN event_tags et ON e.id = et.id_event
            INNER JOIN tags t ON et.id_tag = t.id 
            `;
            let values = [];
            
            adds.forEach((add, index) => {
                if(params[index] != null){
                    values.push(params[index]);
                    if (values.length == 1){sql += ' WHERE '}
                    sql += `${add} = $${values.length}`;
                    if (index < adds.length - 1) {
                        sql += ' AND ';
                    }
                }
            });
            if (sql.endsWith(' AND ')){sql = sql.slice(0, -5)}
            console.log(sql);
            console.log(values);
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
        params = params.map(x => x == undefined ? x = null : x = x);
        console.log(params);
        try {
            await client.connect();
            let sql = `
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
                where er.id_event = $1
            `;
            let values = [id, null, null, null, null, null];
            if (params[4] != null){sql+= ` and er.rating = $${values.indexOf(params[4])}`; values[5] = params[4]} else {values.pop(5)}
            if (params[3] != null){sql+= ` and er.attended = $${values.indexOf(params[3])}`; values[4] = params[3]} else {values.pop(4)}
            if (params[2] != null){sql+= ` and u.username = $${values.indexOf(params[2])}`; values[3] = params[2]} else {values.pop(3)}
            if (params[1] != null){sql+= ` and u.last_name = $${values.indexOf(params[1])}`; values[2] = params[1]} else {values.pop(2)}
            if (params[0] != null){sql+= ` and u.first_name = $${values.indexOf(params[0])}`; values[1] = params[0]} else {values.pop(1)}

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