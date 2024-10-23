import UserRepository from "../repositories/user-repository.js";
import JWTAuthService from "../modules/jwt.js";
import ValidationHelper from "../helpers/validation-helper.js";

export default class UserService{
    getByIdSync = async (id) => {
        const repo = new UserRepository();
        let returnObject = await repo.getByIdSync(id);
        return returnObject;
    }

    getUsersInfo = async () => {
        const repo = new UserRepository();
        let returnObject = await repo.getUsersInfo();
        return returnObject;
    }

    getIdByUsername = async (username) => {
        const repo = new UserRepository();
        let returnObject = await repo.getIdByUsername(username);
        return returnObject;
    }

    createAsync = async (entity) => {
        const repo = new UserRepository();
        const vh = new ValidationHelper();
        let response;
        
        if (entity.first_name.length < 3 || vh.isNull(entity.first_name) || entity.last_name.length < 3 || vh.isNull(entity.last_name) || entity.password.length < 3 || vh.isNull(entity.password)){
            response = 'El nombre, apellido o contraseña tienen menos de 3 caracteres o estan vacios';
        }
        else if (!vh.validateEmail(entity.username)){
            response = 'El username no es valido'
        }
        else{
            response = await repo.createAsync(entity);
        }
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
        if (userObj != null){
            console.log(userObj);
            console.log(userObj.password);
            if (userObj.password === password){
                returnObject.success = true;
                returnObject.message = 'Login aprobado';
                returnObject.token = await auth.generateJWT(userObj);
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