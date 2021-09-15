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
        Status.all = []
        statuses.forEach(status => {
            new Status(status) 
        })
        this.renderMain()
     })
    } 


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
            //debugger
            statusDiv.innerHTML += `
             <div class= "status-card" id=${status.id}> 
             <p class= "name"> ${status.name}</p>
             </div>` })
       this.all.forEach(status => {
           status.jobs.forEach(job => {
             if (job.userId == user.id) {
                // console.log(job)
                job.render()
            } 
            })
        })
    }

    static findJob = (id) => {
        console.log(id)
        this.all.forEach(status => { 
        const jobClicked = status.jobs.find(job => job.id == id)
        if (jobClicked) {
        jobClicked.showDetails()
        }
    })
}
      

    // static updateJobArray(id, statusId) {
    //     const status = this.all.find(statusId)
    //     console.log(status)
        
    // }

}



