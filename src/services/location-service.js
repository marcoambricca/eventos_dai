import LocationRepository from '../repositories/location-repository.js';

export default class LocationService{
    getAllSync = async () => {
        const repo = new LocationRepository();
        let returnArray = await repo.getAllSync();
        return returnArray;
    }
    
    getByIdSync = async (id) => {
        const repo = new LocationRepository();
        let returnObject = await repo.getByIdSync(id);
        return returnObject;
    }
    createAsync = async (entity) => {
        const repo = new LocationRepository();
        let response = await repo.createAsync(entity);
        return response;
    }
    updateAsync = async (entity) => {
        const repo = new LocationRepository();
        let response = await repo.updateAsync(entity);
        return response;
    }
    deleteByIdAsync = async (id) => {
        const repo = new LocationRepository();
        let response = await repo.deleteByIdAsync(id);
        return response;
    }
}