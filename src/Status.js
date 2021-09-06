class Status {

    static all = []

    constructor({id, name, jobs}) {
        this.id = id
        this.name = name
        this.jobs = jobs
        this.constructor.all.push(this)
        //console.log(this)
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
        });
      
        const statusDivs = document.getElementsByClassName("status-card")
        Array.from(statusDivs).forEach(element => {
            const jobDiv = document.createElement('div')
            jobDiv.id = `${element.dataset.id}`
            element.append(jobDiv) 
    })
    Job.renderContainer()
         
}
    
}