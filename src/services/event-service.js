import EventRepository from "../repositories/event-repository.js";
import UserRepository from "../repositories/user-repository.js";
import ValidationHelper from "../helpers/validation-helper.js";
import EventLocationRepository from '../repositories/event-location-repository.js';

export default class EventService{
    getSearchSync = async (params) => {
        const repo = new EventRepository();
        let returnArray = await repo.getSearchSync(params);
        return returnArray;
    }
    getByIdSync = async (id) => {
        const repo = new EventRepository();
        let returnObject = await repo.getByIdSync(id);
        return returnObject;
    }
    getEnrollmentById = async (id, params) => {
        const repo = new EventRepository();
        let returnObject = await repo.getEnrollmentById(id, params);
        return returnObject;
    }
    createAsync = async (event) => {
        const repo = new EventRepository();
        const repoEL = new EventLocationRepository();
        const vh = new ValidationHelper();

        const event_location = await repoEL.getByIdSync(event.id_event_location);

        let response;
        if (event.name.length < 3 || vh.isNull(event.name) || event.description.length < 3 || vh.isNull(event.description)){
            response = 'El nombre o descripcion del evento tiene menos de 3 caracteres o es nulo.'
        }
        else if (event.max_assistance > event_location.max_capacity){
            response = 'La capacidad maxima del evento excede a la del establecimiento.'
        }
        else if (event.price < 0 || event.duration_in_minutes < 0){
            response = 'El precio o duracion del evento es menor a 0'
        }
        else{
            response = await repo.createAsync(event);
        }
        return response;
    }
}