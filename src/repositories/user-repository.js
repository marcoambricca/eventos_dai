import DBConfig from './../configs/db-config.js';
import pkg from 'pg';
const { Client } = pkg;

export default class UserRepository{
    getByIdSync = async (id) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * from users WHERE id=$1';
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

    getUsersInfo = async () => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT first_name, last_name, username from public.users';
            const result = await client.query(sql);
            await client.end();
            returnObject = result.rows[0];
        }
        catch (error){
            console.log(error);
        }
        return returnObject;
    }

    getByUsername = async (username) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try{
            await client.connect();
            const sql = 'SELECT * FROM public.users WHERE username = $1';
            const values = [username];
            const result = await client.query(sql, values);
            await client.end();
            returnObject = result.rows[0];
        }
        catch (e){
            console.log(e);
        }
        
        return returnObject;
    }

    getIdByUsername = async (username) => {
        let returnObject = null;
        const client = new Client(DBConfig);
        try{
            await client.connect();
            const sql = 'SELECT id FROM public.users WHERE username = $1';
            const values = [username];
            const result = await client.query(sql, values);
            await client.end();
            returnObject = result.rows[0];
        }
        catch (e){
            console.log(e);
        }
        
        return returnObject;
    }

    createAsync = async (entity) => {
        let rowsAffected = 0;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
                INSERT INTO users
                    (first_name, last_name, username, password)
                VALUES
                    ($1, $2, $3, $4)
            `;
            const values = [entity.first_name, entity.last_name, entity.username, entity.password];
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
}