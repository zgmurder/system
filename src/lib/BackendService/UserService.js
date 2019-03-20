import '../Client/parse-init';
import Client from '../Client';
import parseUtils from "../utils/parseUtils";

export class UserService {
    constructor(backend) {
        this.backendService = backend;
    }
    async addOrUpdateUser(userInfo) {
        try {
            console.log('before addOrUpdateUser', userInfo);
            let result = await Client.Cloud.run('addOrUpdateUser', {userInfo: userInfo}, this.backendService.options);
            if (result.organization && result.organization.id) {
                result.organization = parseUtils.simplifyObject(result.organization.toJSON());
            }
            console.log('addOrUpdateUser', result);
            return parseUtils.simplifyObject(result);
        } catch (exception) {
            console.log('addOrUpdateUser failed! exception:', exception);
            let result = parseUtils.getErrorMessage(exception);
            if (this.backendService.errorHandler) this.backendService.errorHandler(exception.code, result);
            throw result;
        }
    }
    async deleteUser(username) {
        try {
            let result = await Client.Cloud.run('deleteUser', {username: username}, this.backendService.options);
            if (result.organization && result.organization.id) {
                result.organization = parseUtils.simplifyObject(result.organization.toJSON());
            }
            console.log(result);
            return parseUtils.simplifyObject(result);
        } catch (exception) {
            console.log('deleteUser failed! exception:', exception);
            let result = parseUtils.getErrorMessage(exception);
            if (this.backendService.errorHandler) this.backendService.errorHandler(exception.code, result);
            throw result;
        }

    }
}

export default UserService;
