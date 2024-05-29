import {Router} from 'express';
import UserService from './../services/user-service.js';
import User from './../entities/user.js';
import jwt from 'jsonwebtoken';
const router = Router();
const svc = new UserService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAllSync();
    if (returnArray != null){
        respuesta = res.status(200).json(returnArray);
    }
    else {
        respuesta = res.status(500).send('Error interno.');
    }
    return respuesta;
});

router.get('/:id', async (req, res) => {
    let respuesta;
    const returnObject = await svc.getByIdSync(req.params.id);
    if (returnObject != null){
        respuesta = res.status(200).json(returnObject)
    }
    else {
        respuesta = res.status(404).send("Id no encontrado.");
    };
    return respuesta;
});

router.post('', async (req, res) => {
    let respuesta;
    const user = new User(req.body.first_name, req.body.last_name, req.body.username, req.body.password);
    const response = await svc.createAsync(user);
    if (response == 1){
        respuesta = res.status(201).send("Objeto creado.");
    }
    else if (response > 1){
        respuesta = res.status(400).send("Mas de un objeto creado.");
    }
    else if (response < 1){
        respuesta = res.status(400).send("No se creo el objeto.");
    }
    return respuesta;
})

router.post('/login', async (req, res) => {
    let response;
    let returnObject = {
        success: null,
        message: "",
        token: null
    };

    const payload = {
        username: req.body.username,
        password: req.body.password
    };

    const secretKey = '123';

    const options = {
        expiresIn: '2h',
        issuer: 'adm'
    }

    const token = jwt.sign(payload, secretKey, options);
    if (token != null){
        returnObject.success = true;
        returnObject.token = token;
        response = res.status(200).json(returnObject);
    }
    else{
        response = res.status(404).send("Ha ocurrido un error.");
    }
    return response;
});

export default router;