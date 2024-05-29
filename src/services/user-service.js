import UserRepository from "../repositories/user-repository.js";

export default class UserService{
    getAllSync = async () => {
        const repo = new UserRepository();
        let returnArray = await repo.getAllSync();
        return returnArray;
    }
    
    getByIdSync = async (id) => {
        const repo = new UserRepository();
        let returnObject = await repo.getByIdSync(id);
        return returnObject;
    }

    createAsync = async (entity) => {
        const repo = new UserRepository();
        let response = await repo.createAsync(entity);
        return response;
    }
}