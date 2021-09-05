class Job {

    static all = []

    constructor(details) {
        this.details = details
        this.constructor.all.push(this)
        // console.log(this)
    }

    render = () => {
        const {title, company, notes, date, link, id} = this.details
        
        document.getElementById("job-container").innerHTML += `
        <div class="job-card" data-id=${id}>
        <p class="title">${title}</p>
        <p class="company">${company}</p>
        </div>`
    }



    static getJobs() {
        api.getJobs().then(jobs => {
            jobs.forEach(job => new Job(job).render())
            //get all jobs, interating through them from the api, initializing each job
            // then storing them in all array b/c constructor and calling render
           
        })
    }
}