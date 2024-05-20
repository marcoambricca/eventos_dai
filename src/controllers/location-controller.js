import {Router} from 'express';
import LocationService from './../services/location-service.js';
import Location from './../entities/location.js';
const router = Router();
const svc = new LocationService();

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
    const location = new Location(req.body.name, req.body.id_province, req.body.latitude, req.body.longitude);
    const response = await svc.createAsync(location);
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
});

router.put('', async (req, res) => {
    let respuesta;
    const location = req.body;
    const response = await svc.updateAsync(location);
    if (response == 1){
        respuesta = res.status(201).send("Objeto actualizado.");
    }
    else if (response > 1){
        respuesta = res.status(400).send("Mas de un objeto actualizado.");
    }
    else if (response < 1){
        respuesta = res.status(404).send("No se encontro el objeto.");
    }
    return respuesta;
});

router.delete('/:id', async (req, res) => {
    let respuesta;
    const response = await svc.deleteByIdAsync(req.params.id);
    if (response == 1){
        respuesta = res.status(200).send("Objeto borrado.");
    }
    else if (response > 1){
        respuesta = res.status(400).send("Mas de un objeto borrado.");
    }
    else if (response < 1){
        respuesta = res.status(404).send("No se ha borrado el objeto.");
    }
    return respuesta;
});

export default router;