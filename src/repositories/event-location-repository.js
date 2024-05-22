import DBConfig from './../configs/db-config.js';
import pkg from 'pg';
import ValidationHelper from '../helpers/validation-helper.js';
const { Client } = pkg;

export default class EventLocationRepository{
    getAllSync = async () => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_locations';
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
            const sql = 'SELECT * FROM event_locations WHERE id=$1'
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
    createAsync = async (entity) => {
        let rowsAffected = 0;
        const client = new Client(DBConfig);
        const locationSQL = 'SELECT * FROM locations where id=$1'
        const locationValues = [entity.id_location];
        const locationResult = await client.query(locationSQL, locationValues);
        if (ValidationHelper.stringLongerOrEqualThan(entity.name, 3) && ValidationHelper.stringLongerOrEqualThan(entity.full_address, 3) && locationResult != null && ValidationHelper.intMoreThan(max_capacity, 0)){
            try {
                await client.connect();
                const sql = `
                    INSERT INTO event_categories
                        (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user)
                    VALUES
                        ($1, $2, $3, $4, $5, $6, $7)
                `;
                const values = [entity.id_location, entity.name, entity.full_address, entity.max_capacity, entity.latitude, entity.longitude, entity.id_creator_user];
                const result = await client.query(sql, values);
                await client.end();
                rowsAffected = result.rowCount;
            }
            catch (error){
                console.log(error);
            }
            await client.end();
        }
        return rowsAffected;
    }
    updateAsync = async (entity) => {
        let rowsAffected = 0;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
                UPDATE event_locations
                SET id_location = $1, name = $2, full_address = $3, max_capacity = $4, latitude = $5, longitude = $6, id_creator_user = $7
                WHERE id = $8
            `;
            const values = [entity.id_location. entity.name, entity.full_address, entity.max_capacity, entity.latitude, entity.longitude, entity.id_creator_user, entity.id];
            const result = await client.query(sql, values);
            await client.end();
            rowsAffected = result.rowCount;
        }
        catch (error){
            console.log(error);
        }
        await client.end();
        return rowsAffected;
    }
    deleteByIdAsync = async (id) => {
        let rowsAffected = 0;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'DELETE FROM event_locations WHERE id = $1';
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();

            rowsAffected = result.rowCount;
        }
        catch (error){
            console.log(error);
        }
        return rowsAffected;
    }
}