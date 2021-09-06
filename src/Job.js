class Job {

    static all = []
  
    constructor({id, title, company, notes, date, statusName, status_id}) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.notes = notes;
        this.date = date;
        this.statusName = statusName
      //  this.status_id = status_id
        this.constructor.all.push(this)
    }

    // render = () => {
    //     const {title, company, notes, date, link, statusName, id} = this
    //     //debugger
    //     document.getElementById("job-container").innerHTML += `
    //     <div class="job-card" data-id=${id}>
    //     <p class="title">${title}</p>
    //     <p class="company">${company}</p>
    //     <p class="date">${date}</p>
    //     </div>`
      
    // }

    // static handleCardClick = (e) => {
    //    if (e.target.className === 'title') {
    //        //console.log(e.target)
    //    }
    // }
   
    
    static renderContainer() {
        //console.log(this)
    //     const jobDiv = document.createElement('div')
    //     jobDiv.id = "job-container"
    //     document.getElementById('main').appendChild(jobDiv)
    //    // debugger
        this.all.forEach(job => console.log(job))
    //     jobDiv.addEventListener('click', this.handleCardClick)
    //     // (event) => {
    //     //     this.handleCardClick(event)
    //     // })
    }


    static getJobs() {
        api.getJobs().then(jobs => {
            jobs.forEach(job => new Job(job))
            //get all jobs, interating through them from the api, initializing each job
            // then storing them in all array b/c constructor and calling render
          // this.renderContainer()
        })
    }
}