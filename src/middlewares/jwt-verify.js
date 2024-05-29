import jwt from "jsonwebtoken";

const verifyUser = async (token) => {
    const secretKey = '123';
    let token = '';
    let payloadOriginal = null;
    
    try {
        payloadOriginal = await jwt.verify(token, secretKey);
    }
    catch (e){
        console.log(e);
    }
    
    console.log(payloadOriginal);
}

export default verifyUser;