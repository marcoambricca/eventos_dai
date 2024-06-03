import {Router} from 'express';
import EventService from './../services/event-service.js';
import Event from './../entities/event.js';
const router = Router();
const svc = new EventService();

router.get('', async (req, res) => {
    let response;
    const searchParams = [req.query.name, req.query.category, req.query.startdate, req.query.tag, req.query.eventlocation];
    const returnObject = await svc.getSearchSync(searchParams);
    if (returnObject != null){
        response = res.status(200).json(returnObject)
    }
    else {
        response = res.status(404).send("Id no encontrado.");
    };
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

router.get('/:id/enrollment', async (req, res) => {
    let response;
    const searchParams = [req.query.first_name, req.query.last_name, req.query.username, req.query.attended, req.query.rating];
    const returnObject = await svc.getEnrollmentById(req.params.id, searchParams);
    if (returnObject != null){
        response = res.status(200).json(returnObject)
    }
    else {
        response = res.status(404).send("Id no encontrado o evento sin inscripciones.");
    };
    return response;
});

export default router;