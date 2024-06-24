import {Router} from 'express';
import EventService from './../services/event-service.js';
import Event from './../entities/event.js';
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware.js';
const router = Router();
const svc = new EventService();
const svcA = new AuthenticationMiddleware();

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


router.post('', svcA.AuthMiddleware, async (req, res) => {
    let response;
    const event = new Event(undefined, req.body.name, req.body.description, req.body.id_event_category, req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, req.body.enabled_for_enrollment, req.body.max_assistance, req.user.id);
    response = await svc.createAsync(event);
    if (typeof(response) === 'string'){
        response = res.status(400).send(response);
    }
    else if (response == 1){
        response = res.status(201).send('Se creo correctamente el objeto.');
    }
    else{
        response = res.status(400).send('Ha ocurrido un error');
    }
    return response;
});

export default router;