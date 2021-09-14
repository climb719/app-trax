// console.log("Hello, World!")


// fetch("http://localhost:3000/jobs").then(resp => resp.json()).then(console.log)


const api = new ApiService("http://localhost:3000")
const modal = new Modal()
let user
// api.getJobs().then(console.log)
//Status.getStatuses()
//Job.getJobs()

document.querySelector("form").addEventListener("submit", handleUserSubmit)

function handleUserSubmit(e){
    document.getElementById("main").innerHTML = ""
    e.preventDefault()
    api.FindOrCreateUser(e.target.email.value).then(userInfo => {
       user = userInfo
       Status.getStatuses()
    })
}

