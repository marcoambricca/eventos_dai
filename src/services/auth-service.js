import JWTAuthService from "../modules/jwt.js";

const jwt = new JWTAuthService();

export default class AuthService{
    login = async (payload) => {
        const token = await jwt.generateJWT(payload);
        console.log('login token generated')
        return token;
    }
}