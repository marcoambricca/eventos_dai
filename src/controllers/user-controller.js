import {Router} from 'express';
import UserService from './../services/user-service.js';
import User from './../entities/user.js';
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware.js';

const router = Router();
const svc = new UserService();
const svcA = new AuthenticationMiddleware();

router.get('/:id', async (req, res) => {
    let response;
    const returnObject = await svc.getByIdSync(req.params.id);
    if (returnObject != null){
        response = res.status(200).json(returnObject)
    }
    else {
        response = res.status(404).send("Id no encontrado.");
    };
    return response;
});

router.post('/register', async (req, res) => {
    const user = new User(req.body.first_name, req.body.last_name, req.body.username, req.body.password);
    let response = await svc.createAsync(user);
    if (typeof(response) === 'string'){
        response = res.status(400).send(response);
    }
    else{
        response = res.status(200).send(response);
    }
    return response;
})

router.post('/login', async (req, res) => {
    let response;
    const returnArray = await svc.Login(req.body.username, req.body.password);
    if (returnArray.success){
        response = res.status(200).json(returnArray);
    }
    else{
        response = res.status(401).json(returnArray);
    }
    return response;
});

/*router.get('', svcA.AuthMiddleware, async (req, res) => {
    let respuesta = res.status(200).send("Si, funcionó");
    console.log(req.user);
    return respuesta;
});*/

export default router;