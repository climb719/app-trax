class Job {

    static all = []
  
    constructor({id, title, company, notes, date, statusName, statusId}) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.notes = notes;
        this.date = date;
        this.statusName = statusName
        this.statusId = statusId
        this.constructor.all.push(this)
       //console.log(this)
    }

    render = () => { 
      const {title, company, notes, date, link, statusName, id, StatusId} = this
      //console.log(this)
        // console.log(this.statusId)
         let n = this.statusId
       console.log(n)
       console.log(document.getElementById(n))
       document.getElementById(n).innerHTML += `
        <div class="job-card" data-id=${id}>
        <p class="title">${title}</p>
        <p class="company">${company}</p>
        <p class="date">${date}</p>
        </div>`

    }

    
    // static renderContainer() {
    //     //console.log(this)
    // //     const jobDiv = document.createElement('div')
    // //     jobDiv.id = "job-container"
    // //     document.getElementById('main').appendChild(jobDiv)
    //     this.all.forEach(job => {
    //       job.render()
    //     })
   
    // }



    // static getJobs() {
    //     api.getJobs().then(jobs => {
    //         jobs.forEach(job => new Job(job))
    //         //get all jobs, interating through them from the api, initializing each job
    //         // then storing them in all array b/c constructor and calling render
    //       // this.renderContainer()
    //     })
    // }
}