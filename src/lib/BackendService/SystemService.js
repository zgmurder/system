import Client from '../Client';
import parseUtils from "../utils/parseUtils";

export class SystemService {
    constructor(backend) {
        this.backendService = backend;
    }

    async getSystemTime() {
        let systemTime = await Client.Cloud.run('getSystemTime');
        console.log(systemTime);
        return systemTime;
    }
}

export default SystemService;
