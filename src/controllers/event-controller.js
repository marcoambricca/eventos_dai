import {Router} from 'express';
import EventService from './../services/event-service.js';
import Event from './../entities/event.js';
const router = Router();
const svc = new EventService();

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

export default router;