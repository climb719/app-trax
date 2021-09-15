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
        addJob.addEventListener('click', this.handleJobForm)
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

    static handleJobForm = () => {
        modal.open()
        const form = document.getElementById("modal-text")
        form.innerHTML = `
          <h2> Add A New Job App</h2> <form id="create-form">
          Title: <input type="text" name="title" >
          Company: <input type="text" name="company">
          Select your application status:<select name="status" id="status_id">
          <option></option>
          <option value=1>To Apply</option>
          <option value=2>Applied</option>
          <option value=3>Phone Inteview</option>
          <option value=4>Next Round</option>
          <option value=5>Offer</option>
          </select>
          Date:<input type="date" name="date"><br>
          <br>
          My notes about the job or application process:<br>
          <textarea rows="15" cols ="50" name="notes"></textarea><br>
          <br>
          Link to App Posting:<input type="text" name="link" size="70"><br>
          <br>
          <input type="submit" value="Add My Job App">
          </form>`
        document.getElementById("close").addEventListener('click', e => {
        modal.close() })
        document.getElementById("create-form").addEventListener("submit", this.handleCreate)
     }
    
    static handleCreate = (e) => {
        e.preventDefault()
        const newApp = {
        title: e.target.title.value,
        company: e.target.company.value,
        status_id: e.target.status.value,
        date: e.target.date.value,
        notes: e.target.notes.value,
        link: e.target.link.value
        }
        api.createJobApp(newApp).then(job => {
        new Job(job).render()
        //this.checkJobArray(newApp)
        })
        e.target.reset()
        modal.close()
      }
    

    

//     static handleCardClick = (e) => {
//     // console.log(Status.all)
//         if (e.target.classList.contains("title")) {
//         const id = e.target.closest(".job-card").dataset.jobId
//         this.findJob(id)
//        //console.log(job)
//       // job.showDetails()
//      }
//    }

    static saveUpdate = (saveBtn) => {
        const div = saveBtn.closest('Div')
        const noteEdit = div.querySelector(".edited-notes").value
        const statusEdit = div.querySelector(".edited-status").value
        const id = div.querySelector("#job-id").value
   // debugger
        const updatedJob = {
        id: id,
        status_id: statusEdit,
        notes: noteEdit 
        }
        api.updateJobApp(updatedJob).then(updatedJob=> {
        new Job(updatedJob).showDetails()
        // console.log(oldJob.id)
        // console.log(oldJob.statusId) 
       // console.log(updatedJob)
        this.checkJobArray(updatedJob.id, updatedJob)
        // find id of updated job and replace job in original array with updated job
    })   
  }

  static findJob = (id) => {
    // console.log(id)
       this.all.forEach(status => { 
        const jobClicked = status.jobs.find(job => job.id == id)
       if (jobClicked) {
       jobClicked.showDetails()
       }
   })
}
      

    static checkJobArray(id, newJobInfo) {
        // console.log(id)
        // console.log(newJobInfo)
        this.all.forEach(status => {
        status.jobs.map(job => {
           if (job.id == newJobInfo.id && job.userId == user.id) {
             console.log(job.statusId)
             job.statusId = newJobInfo.statusId
             job.notes = newJobInfo.notes
             job.statusName = newJobInfo.statusName
             console.log(job.statusId)
             console.log(job)
            } 
         
          })
     
    //     status.map(x => {
    //     const obj = oldJob.find(({ id }) => id === x.id)
    //     return obj ? obj : x
    //   })
    //   console.log(result)
        })
        // console.log(user.jobs)
    }


//     static checkJobArray(id, updatedJob) {
//         // console.log(id)
//        // console.log(updatedJob)
//         this.all.forEach(status => {
//             status.jobs.map(job => {
//                if (job.userId == user.id) {
//                console.log(job)
//                 //  console.log(updatedJob)
//                  const jobIndex = status.jobs.findIndex((job => job.id == id))
         
//                  console.log("Before update: ", status.jobs[jobIndex])
//                 // debugger
//                 console.log(updatedJob.statusId)
                
//                  status.jobs[jobIndex].statusId = updatedJob.statusId
//                  status.jobs[jobIndex].notes = updatedJob.notes
//                  console.log("After update: ", status.jobs[jobIndex])
//                }
//             })  
//         })
//        //console.log(user.jobs)
//     }
//        // this.renderMain()  
 }

// if (job.id == updatedJob.id && job.userId == user.id) {
//     console.log(job)
//     console.log(updatedJob)



