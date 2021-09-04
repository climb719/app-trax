class Job {

    static all = []

    constructor(details) {
        this.details = details
        this.constructor.all.push(this)
        console.log(this)
    }

    static renderIndex() {
    //     // create a job container and iterate through array of jobs
    //     // call a method to render cards  

    }


    static getJobs() {
        api.getJobs().then(jobs => {
            jobs.forEach(job => new Job(job))
            //get all jobs, interating through them from the api, initializing each job
            // then storing them in all array b/c constructor 
            this.renderIndex()
            
        })
    }
}