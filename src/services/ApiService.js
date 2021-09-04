class ApiService {

    constructor(api) {
        this.api = api
    }

    getJobs = () => fetch(this.api + "/jobs").then(resp => resp.json())

   
}