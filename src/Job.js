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

  renderCard = () => {
      const {title, company, appDate, id} = this
      let n = this.statusId
      const statusCard = document.getElementById(n)
      statusCard.innerHTML += `
        <div class="job-card" data-id=${id} id=card-${id}>
        <p class="title">${title}</p>
        <p class="company">${company}</p>
        <p class="date">${appDate}</p>
        </div>`
  }
  
  static handleCardClick = (e) => {
      if (e.target.classList.contains("title")) {
      const id = e.target.closest(".job-card").dataset.id
      console.log(id)
      Status.find(id)
     }
   }

  showDetails = () => {
      const {title, company, notes, appDate, link, statusName, id, statusId} = this
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
        Status.renderMain()
      }  
      else if (e.target.innerText == "Edit") {
        this.renderEdit(e.target)
      }
      else if (e.target.innerText == "Save") {
        Status.saveUpdate(e.target)
      }
      else if (e.target.id == "delete") {
        if (confirm("Are you sure you want to delete this job?")) {
          Status.deleteJob(e.target) }
      }
  }

  renderEdit = (editBtn) => {
      const div = editBtn.closest('Div')
      const note = div.children.item(3)
      const id = div.children.item(0).id
      note.innerHTML = `Update your notes:<br> <textarea class="edited-notes" rows="15" cols ="50" name="notes" required>${note.innerText}</textarea><br>`
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
      editBtn.innerText = "Save"
  }
 
}