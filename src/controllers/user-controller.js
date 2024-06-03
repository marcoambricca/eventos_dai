import {Router} from 'express';
import UserService from './../services/user-service.js';
import User from './../entities/user.js';
const router = Router();
const svc = new UserService();

router.get('', async (req, res) => {
    let response;
    const returnArray = await svc.getAllSync();
    if (returnArray != null){
        response = res.status(200).json(returnArray);
    }
    else {
        response = res.status(500).send('Error interno.');
    }
    return response;
});

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

router.post('', async (req, res) => {
    let response;
    const user = new User(req.body.first_name, req.body.last_name, req.body.username, req.body.password);
    const returnObject = await svc.createAsync(user);
    if (returnObject == 1){
        response = res.status(201).send("Objeto creado.");
    }
    else if (returnObject > 1){
        response = res.status(400).send("Mas de un objeto creado.");
    }
    else if (returnObject < 1){
        response = res.status(400).send("No se creo el objeto.");
    }
    return response;
})

router.post('/login', async (req, res) => {
    let response;
    console.log('inicio router');
    const returnArray = await svc.Login(req.body.username, req.body.password);
    console.log(returnArray);
    if (returnArray.success){
        response = res.status(200).json(returnArray);
    }
    else{
        response = res.status(401).json(returnArray);
    }
    console.log('fin router');
    return response;
});

export default router;