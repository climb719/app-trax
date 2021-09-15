class Job {

  constructor({id, title, company, notes, appDate, link, statusName, statusId, userId}) {
      this.userId = userId
      this.id = id;
      this.title = title;
      this.company = company;
      this.notes = notes;
      this.appDate = appDate;
      this.link = link
      this.statusName = statusName
      this.statusId = statusId
  }

  render = () => {
      const {title, company, notes, appDate, link, statusName, id, StatusId} = this
     // console.log(this)
      let n = this.statusId
     // console.log(n)
     const statusCard = document.getElementById(n)
   // console.log(statusId)
     statusCard.innerHTML += `
      <div class="job-card" data-job-id=${id} id=card-${id}>
      <p class="title">${title}</p>
      <p class="company">${company}</p>
      <p class="date">${appDate}</p>
      </div>`
  }
  
  
  static handleCardClick = (e) => {
    //console.log(Status.all)
      if (e.target.classList.contains("title")) {
      const id = e.target.closest(".job-card").dataset.jobId
      Status.findJob(id)
       //console.log(job)
      // job.showDetails()
     }
   }

  showDetails = () => {
    const {title, company, notes, appDate, link, statusName, id, statusId} = this
 // console.log(this)
    document.getElementById("main").innerHTML = `
    <div id ="details-container">
    <h1 id=${id}>${title}</h1>
    <h2>Company: ${company}</h2>
    <h3 id=${statusId}>${statusName}</h3>
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
      Status.checkJobArray()
    }  
    else if (e.target.innerText == "Edit") {
     // console.log("edit me!!")
        this.renderEdit(e.target)
    }
    else if (e.target.innerText == "Save") {
     // console.log("save me!!")
     Status.saveUpdate(e.target)
    }
    else if (e.target.id == "delete") {
       // console.log("delete me!!")
        if (confirm("Are you sure you want to delete this job?")) {
          this.deleteJob(e.target) }
    }
}

  renderEdit = (editBtn) => {
    const div = editBtn.closest('Div')
    const note = div.children.item(3)
    const id = div.children.item(0).id
    note.innerHTML = `Update your notes:<br> <textarea class="edited-notes" rows="15" cols ="50" name="notes">${note.innerText}</textarea><br>`
    const status = div.children.item(2)
    const statusId = div.children.item(2).id
    status.innerHTML = `Update your application status:<select required class= "edited-status"  name="status" id="status_id">
      <option id="selected-status" selected value=${statusId}>${status.innerText}</option>
      <option value=1>To Apply</option>
      <option value=2>Applied</option>
      <option value=3>Phone Inteview</option>
      <option value=4>Next Round</option>
      <option value=5>Offer</option>
      </select>
      <input type="hidden" id="job-id" value=${id}>`
  // const statusSelect = document.getElementById("status_id")
  // for (let i=0; i < statusSelect.length; i++) {
  //   if (statusSelect.options[i].value == statusId)
  //     statusSelect.remove(i)
  //   } 
    editBtn.innerText = "Save"
  }
  //selected="selected">  ${status.innerText}

  deleteJob = (deleteBtn) => {
    const div = deleteBtn.closest('Div')
    const id =  div.children.item(0).id
    api.deleteJob(id).then(() => {
    const main = document.getElementById("main")
    main.innerHTML = ''
    Status.renderDivs() 
    document.getElementById(`card-${id}`).remove()
   })
  }

 
}