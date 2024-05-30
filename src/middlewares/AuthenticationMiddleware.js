import jwt from "jsonwebtoken";
import 'dotenv/config'

const AuthenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;
    let payload;

    if(token != null){
        try{
            payload = await jwt.verify(token, process.env.JWT_SECRETKEY);
            console.log(process.env.JWT_SECRETKEY);
            next();
        }
        catch(e){
            console.log(e);
        }
    }
    else{
        res.status.send(401).send("Acceso no autorizado. Se requiere una token.")
    }
}

export default AuthenticateUser;