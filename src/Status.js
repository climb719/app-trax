class Status {

    static all = []

    constructor({id, name, jobs}) {
        this.id = id
        this.name = name
        this.jobs = jobs
        this.constructor.all.push(this)
       // debugger
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
             <div class= "status-card" data-id=${status.id}> 
             <p class= "name"> ${status.name}</p>
             <div class "job-card" id=${status.id}>
             </div>`
             status.renderJobs()
         })
        //  const statusDivs =  document.getElementsByClassName("status-card")
        //  Array.from(statusDivs).forEach(element => {
        //      const jobDiv = document.createElement('div')
        //      jobDiv.id = `${element.dataset.id}`
        //      element.append(jobDiv)})
       // debugger
        // innerHTML += `
        // <div class= "status-card" data-id=${status.id}> ${status.name}
        // <div class "job-card" id=${status.id}>
        // </div>`
        // status.renderJobs()
        // })
    }

     renderJobs() {
        this.jobs.forEach(job => {
            //console.log(job)
            const newJob = new Job(job);       
            newJob.render()
     })
 }


}
