class Job {

    static all = []

    constructor(details) {
        this.details = details
        this.constructor.all.push(this)
        console.log(this)
    }

    static addJob(job) {
        new Job(job)
    }

    static getJobs() {
        api.getJobs().then(jobs => {
            jobs.forEach(job => Job.addJob(job))
        })
    }
}