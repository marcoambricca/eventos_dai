import JWTAuthService from '../modules/jwt.js'

export default class AuthenticationMiddleware{
    RemoveBearerFromHeader = (header) => {
        let returnValue = header;
        if (header && header.startsWith('Bearer ')){
            returnValue = header.slice(7);
        }
        console.log('bearer removed');
        return returnValue;
    }

    AuthMiddleware = async (req, res, next) => {
        let authHeader = req.headers.authorization;
        let payload;
        let response;
        if (!authHeader){
            response = res.status(401).send('401 Unauthorized, es necesario un token');
        }
        else{
            console.log('auth middle start')
            authHeader = this.RemoveBearerFromHeader(authHeader);
            const authHelper = new JWTAuthService();
            payload = await authHelper.decryptJWT(authHeader);

            if (payload != null){
                req.user = payload;
                next();
                console.log('payload sent')
            }
            else{
                response = res.status(401).send('401 Unauthorized, token invalido');
            }
            
        }
        return response;
    }
}