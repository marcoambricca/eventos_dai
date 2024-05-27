import EventRepository from "../repositories/event-repository.js";

export default class EventService{
    getAllSync = async () => {
        const repo = new EventRepository();
        let returnArray = await repo.getAllSync();
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
}