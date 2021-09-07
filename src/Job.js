class Job {

    static all = []
  
    constructor({id, title, company, notes, appDate, statusName, statusId}) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.notes = notes;
        this.appDate = appDate;
        this.statusName = statusName
        this.statusId = statusId
        this.constructor.all.push(this)
       //console.log(this)
    }

    renderJobDivs = () => { 
      const statusDivs =  document.getElementsByClassName("status-card")
      const jobDiv = document.createElement('div')
      Array.from(statusDivs).forEach(element => {
          
          jobDiv.id = `${element.dataset.id}`
          element.appendChild(jobDiv) 
      })
      this.render()  
    }

    // static handleCardClick = (e) => {
    //   console.log(e.target)
    // }


    render = () => {
        const {title, company, notes, appDate, link, statusName, id, StatusId} = this
        let n = this.statusId
        document.getElementById(n).innerHTML += `
        <div class="job-card" data-id=${n}>
        <p class="title">${title}</p>
        <p class="company">${company}</p>
        <p class="date">${appDate}</p>
        </div>`
       
    }

    // static getJobs() {
    //     api.getJobs().then(jobs => {
    //         jobs.forEach(job => new Job(job))
    //         //get all jobs, interating through them from the api, initializing each job
    //         // then storing them in all array b/c constructor and calling render
    //       // this.renderContainer()
    //     })
    // }
}