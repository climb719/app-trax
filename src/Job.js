class Job {

    constructor(data) {
        this.data = data
        console.log(this)
    }

    static getJobs() {
        api.getJobs().then(console.log)
    }
}