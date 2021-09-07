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
        const main = document.getElementById('main')
      
        this.all.forEach(status => { 
        main.innerHTML += `
        <div class= "status-card" data-id=${status.id}>${status.name}</div>`
        status.renderJobs()
        })
        //console.log(this)
      // renderJobs()
    }

    renderJobs() {
            const jobDiv = document.createElement('div')
            console.log(this)
            jobDiv.id = `${this.id}`
            jobDiv.classList.add('jobs');
            console.log(this.jobs)

        
            
    }

   // Job.renderContainer()
         
}
    
