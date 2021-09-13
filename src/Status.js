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
        this.renderMain()
     })
    } 

    // static renderDivs() {
    //     const main = document.getElementById('main')
    //     const statusDiv = document.createElement('div')
    //     main.append(statusDiv)
    //     this.all.forEach(status => { 
    //         statusDiv.innerHTML += `
    //          <div class= "status-card" id=${status.id}> 
    //          <p class= "name"> ${status.name}</p>
    //          </div>`
    //         // status.jobs.forEach(job => job.addCardEvents())
    //     //    console.log(status.jobs)  
    //         //debugger
    //     })
    //     this.renderMain()
    // }

    static renderMain = () => {
        const main = document.getElementById('main')
        main.innerHTML = ""
        const addJob = document.createElement("button")
        const jobContainer = document.createElement('div')
        jobContainer.id = "job-container"
        addJob.innerText = "Add a New Job"
        main.append(jobContainer, addJob)
        addJob.addEventListener('click', Job.handleJobForm)
        jobContainer.addEventListener("click", Job.handleCardClick)
        const statusDiv = document.createElement('div')
       jobContainer.appendChild(statusDiv)
        this.all.forEach(status => { 
            statusDiv.innerHTML += `
             <div class= "status-card" id=${status.id}> 
             <p class= "name"> ${status.name}</p>
             </div>` })
       this.all.forEach(status => {
           status.jobs.forEach(job => job.render())
    })

    }
}