class ApiService {

    constructor(api) {
        this.api = api
    }

    getJobs = () => fetch(this.api + "/jobs").then(resp => resp.json())

    getStatuses = () => fetch(this.api + "/statuses").then(resp => resp.json())
}