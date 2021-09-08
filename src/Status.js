class Status {

    static all = []

    constructor({id, name, jobs}) {
        this.id = id
        this.name = name
        this.jobs = jobs
        this.constructor.all.push(this)
    }

    static getStatuses() {
        api.getStatuses().then(statuses => {
        statuses.forEach(status => new Status(status))
        this.renderDivs()
     })
    } 

    static renderDivs() {
        const statusDiv = document.createElement('div')
        const main = document.getElementById('main')
        main.appendChild(statusDiv)
        //statusDiv.classList.add("status-cards")
        this.all.forEach(status => { 
            statusDiv.innerHTML += `
             <div class= "status-card" id=${status.id}> 
             <p class= "name"> ${status.name}</p>
             </div>`
            status.renderJobs()
        })
    }

    renderJobs() {
        this.jobs.forEach(job => {
        const newJob = new Job(job);       
        newJob.renderOptions()  
        })
     } 

}
