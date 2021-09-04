class Job {


    constructor(details) {
        this.details = details
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