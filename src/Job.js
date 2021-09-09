class Job {

    static all = []
  
    constructor({id, title, company, notes, appDate, link, statusName, statusId}) {
        this.id = id;
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
        document.getElementById(n).innerHTML += `
        <div class="job-card" data-id=${n}>
        <p class="title">${title}</p>
        <p clss="company">${company}</p>
        <p clss="date">${appDate}</p>
        </div>`
    }

    static handleCardClick = (e) => {
      if (e.target.classList.contains("title")) {
        const id = e.target.closest(".job-card").dataset.id
        this.find(id).showDetails()
      }
    }

    static find = (id) => this.all.find(job => job.id == id)

    showDetails = () => {
      const {title, company, notes, appDate, link, statusName, id, StatusId} = this
      document.getElementById("main").innerHTML = `
      <div class ="details-container">
      <h2>${title}</h2>
      <h3>${company}</h3>
      <p class="notes">${notes}</p>
      <p class="date">${appDate}</p>
      <a href="${link}">More application details</a>
      </div>
      <p><button id="edit"> Edit my details </button></p>
      <p><button id="back"> Back </button></p>`
      document.getElementById("back").addEventListener('click', this.handleShowClick)
    }

    handleShowClick = (e) => {
      if (e.target.id == "back") {
        const main = document.getElementById("main")
        main.innerHTML = ''
        Status.renderDivs()
      }
    }

   static handleJobForm = () => {
    modal.open()
    const form = document.getElementById("modal-text")
    form.innerHTML = `
      <h2> Add A New Job App</h2> <form id="create-form">
      Title: <input type="text" name="title">
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
   api.createJobApp(newApp).then(console.log)
  }



}