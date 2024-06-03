import UserRepository from "../repositories/user-repository.js";
import JWTAuthService from "../modules/jwt.js";

export default class UserService{
    getAllSync = async () => {
        const repo = new UserRepository();
        let returnArray = await repo.getAllSync();
        return returnArray;
    }
    
    getByIdSync = async (id) => {
        const repo = new UserRepository();
        let returnObject = await repo.getByIdSync(id);
        return returnObject;
    }

    createAsync = async (entity) => {
        const repo = new UserRepository();
        let response = await repo.createAsync(entity);
        return response;
    }

    Login = async (username, password) => {
        let returnObject = {
            success: false,
            message: 'Error de login',
            token: ''
        };

        const repo = new UserRepository();
        const auth = new JWTAuthService();

        let userObj = await repo.getByUsername(username);
        console.log(userObj);
        if (userObj != null){
            console.log(userObj);
            console.log(userObj.password);
            if (userObj.password === password){
                returnObject.success = true;
                returnObject.message = 'Login aprobado';
                returnObject.token = await auth.login(userObj);
            }
            else{
                returnObject.message = 'Contraseña incorrecta';
            }
        }
        else{
            returnObject.message = 'Usuario no encontrado';
        }
        return returnObject;
    }
}