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
        const appContainer = document.createElement('div')
        appContainer.id = "app-container"
        addJob.innerText = "Add a New Job"
        main.append(appContainer, addJob)
        addJob.addEventListener('click', this.handleForm)
        appContainer.addEventListener("click", Job.handleCardClick)
        const statusDiv = document.createElement('div')
        appContainer.appendChild(statusDiv)
        this.all.forEach(status => { 
            statusDiv.innerHTML += `
             <div class= "status-card" id=${status.id}> 
             <p class= "name"> ${status.name}</p>
             </div>` })
        this.all.forEach(status => {
            status.jobs.forEach(job => {
              if (job.userId == user.id) {
                 job.render() } 
             })
         })
     }
 
    static handleForm = () => {
        modal.open()
        const form = document.getElementById("modal-text")
        form.innerHTML = `
          <h2> Add A New Job App</h2> <form id="create-form">
          Title: <input type="text" name="title" required>
          Company: <input type="text" name="company" required>
          Select your application status:<select required name="status" id="status_id" >
          <option></option>
          <option value=1>To Apply</option>
          <option value=2>Applied</option>
          <option value=3>Phone Inteview</option>
          <option value=4>Next Round</option>
          <option value=5>Offer</option>
          </select>
          Date:<input type="date" name="date" required><br>
          <br>
          My notes about the job or application process:<br>
          <textarea rows="15" cols ="50" name="notes" required></textarea><br>
          <br>
          Link to App Posting:<input type="text" name="link" size="70" required><br>
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
        const jobStatus = this.all.find(status => status.id == newApp.status_id)
        api.createJobApp(newApp).then(data => {
            const newJob = new Job(data)
            jobStatus.jobs.push(newJob)
            newJob.render()
        })
        e.target.reset()
        modal.close()
      }
    

    static saveUpdate = (saveBtn) => {
        const div = saveBtn.closest('Div')
        const noteEdit = div.querySelector(".edited-notes").value
        const statusEdit = div.querySelector(".edited-status").value
        const id = div.querySelector("#job-id").value
        const updatedJob = {
        id: id,
        status_id: statusEdit,
        notes: noteEdit 
        }
        api.updateJobApp(updatedJob).then(updatedJob=> {
        new Job(updatedJob).showDetails()
        this.checkJobArray(updatedJob.id, updatedJob)
        })   
    }

    static find = (id) => {
       this.all.forEach(status => { 
        const jobClicked = status.jobs.find(job => job.id == id)
        if (jobClicked) {
        jobClicked.showDetails()}
        })
    }

    static checkJobArray(id, newJobInfo) {
        this.all.forEach(status => {
        status.jobs.map(job => {
           if (job.id == newJobInfo.id && job.userId == user.id) { 
             job.statusId = newJobInfo.statusId
             job.notes = newJobInfo.notes
             job.statusName = newJobInfo.statusName} 
            })
        })   
    }
     
    static deleteJob = (deleteBtn) => {
        const div = deleteBtn.closest('Div')
        const id =  div.children.item(0).id
        const statId = div.children.item(2).id
        const jobStat = this.all.find(status => status.id == statId)
        const i = jobStat.jobs.findIndex(job => job.id == id)
        jobStat.jobs.splice(i, 1)
        Status.renderMain() 
        api.deleteJob(id).then(() => {
        console.log("deleted!")
       })
    }
    
}


