class Status {

    static all = []

    constructor({id, name, jobs}) {
        this.id = id
        this.name = name 
        this.jobs = jobs.map(job => new Job(job))
        this.constructor.all.push(this)
    }

    static getStatuses() {
        api.getStatuses().then(statuses => {
        statuses.forEach(status => {
            new Status(status) 
        })
        this.renderDivs()
     })
    } 

    static renderDivs = () => {
        
        const main = document.getElementById('main')
        main.innerHTML = ""
        const statusDiv = document.createElement('div')
        const addJob = document.createElement("button")
        addJob.innerText = "Add a New Job"
        addJob.addEventListener('click', Job.handleJobForm)
        main.append(statusDiv, addJob)
        this.all.forEach(status => { 
            statusDiv.innerHTML += `
             <div class= "status-card" id=${status.id}> 
             <p class= "name"> ${status.name}</p>
             </div>`
             //status.renderJobs()
        status.jobs.forEach(job => job.addCardEvents())
    //    console.log(status.jobs)  
            //debugger
        })
    }
    
    // renderJobs() {
    //     this.jobs.forEach(job => {
    //     const newJob = new Job(job) 
    //     newJob.addCardEvents()  
    //     })
    // } 
}