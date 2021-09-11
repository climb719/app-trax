class Job {

  static all = []

  constructor({id, title, company, notes, appDate, link, statusName, statusId, job}) {
      this.id = id;
      this.job =
      this.title = title;
      this.company = company;
      this.notes = notes;
      this.appDate = appDate;
      this.link = link
      this.statusName = statusName
      this.statusId = statusId
      this.constructor.all.push(this)
  }



  addCardEvents = () => { 
    const statusDivs =  document.getElementsByClassName("status-card")
    Array.from(statusDivs).forEach(element => {
      element.addEventListener('click', Job.handleCardClick)
      
    })
    this.render()  
  }

  render = () => {
      const {title, company, notes, appDate, link, statusName, id, StatusId} = this
      let n = this.statusId
     const statusCard = document.getElementById(n)
    // console.log(statusCard)
     statusCard.innerHTML += `
      <div class="job-card" data-job-id=${id} id=card-${id}>
     <button class="close" data-id=${id}>&times;</button>
      <p class="title">${title}</p>
      <p class="company">${company}</p>
      <p class="date">${appDate}</p>
      </div>`
  
  }

  // const jobCards = statusCards.children[1]
  // const closeBtn =  jobCards.querySelector(".close")
  // console.log(closeBtn)
  // closeBtn.addEventListener('click', event => {
  //         console.log(event)
  //     })
 

  handleDelete = (e) => {
    console.log(e.target)
  }

  static handleCardClick = (e) => {
    if (e.target.classList.contains("title")) {
      const id = e.target.closest(".job-card").dataset.jobId
      this.find(id).showDetails()
    }
  }

  static find = (id) => this.all.find(job => job.id == id)

  showDetails = () => {
    const {title, company, notes, appDate, link, statusName, id, StatusId} = this
    //console.log(this)
    document.getElementById("main").innerHTML = `
    <div id ="details-container">
    <h1 id=${id}>${title}</h1>
    <h2>Company: ${company}</h2>
    <h3>${statusName}</h3>
    <p class="notes">${notes}</p>
    <p class="date">${appDate}</p>
    <a href="${link}" target="_blank"> More application details</a>
    <p><button id="edit">Edit</button></p>
    <p><button id="back">Back</button></p>
    <p><button id="delete">Delete</button></p>
    </div>`
    document.getElementById("details-container").addEventListener('click', this.handleShowClick)
  }

  handleShowClick = (e) => {
    if (e.target.id == "back") {
      const main = document.getElementById("main")
      main.innerHTML = ''
      Status.renderDivs() 
    }  
    else if (e.target.innerText == "Edit") {
      console.log("edit me!!")
        this.renderEdit(e.target)
    }
    else if (e.target.innerText == "Save") {
      console.log("save me!!")
     Job.saveUpdate(e.target)
  }
  else if (e.target.id == "delete") {
        console.log("delete me!!")
        if (confirm("Are you sure you want to delete this job?")) {
          this.deleteJob(e.target)
        }
    
}
}

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
    api.updateJobApp(updatedJob).then(updatedJob => {
        console.log(Status.all)
      new Job(updatedJob).showDetails()
    })
  }

  renderEdit = (editBtn) => {
  const div = editBtn.closest('Div')
  const note = div.children.item(3)
  const id = div.children.item(0).id
  note.innerHTML = `Update your notes:<br> <textarea class="edited-notes" rows="15" cols ="50" name="notes">${note.innerText}</textarea><br>`
  const status = div.children.item(2)
//  debugger
  status.innerHTML = `Update your application status:<select required class= "edited-status"  name="status" id="status_id">
  <option selected disabled value="">Please Select</option>
  <option value=1>To Apply</option>
  <option value=2>Applied</option>
  <option value=3>Phone Inteview</option>
  <option value=4>Next Round</option>
  <option value=5>Offer</option>
  </select>
  <input type="hidden" id="job-id" value=${id}>`
  editBtn.innerText = "Save"
  }
  //selected="selected"><strong>${status.innerText}<strong>

  deleteJob = (deleteBtn) => {
    const div = deleteBtn.closest('Div')
    const id =  div.children.item(0).id
 
   //debugger
   
   api.deleteJob(id).then(() => {
    const main = document.getElementById("main")
    main.innerHTML = ''
    Status.renderDivs() 
    document.getElementById(`card-${id}`).remove()
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
 })
 e.target.reset()
 modal.close()
}

}