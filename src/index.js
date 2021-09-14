// console.log("Hello, World!")


// fetch("http://localhost:3000/jobs").then(resp => resp.json()).then(console.log)


const api = new ApiService("http://localhost:3000")
const modal = new Modal()

// api.getJobs().then(console.log)
//Status.getStatuses()
//Job.getJobs()

document.querySelector("form").addEventListener("submit", handleUserSubmit)

function handleUserSubmit(e){
    e.preventDefault()
    console.log(e.target.name.value)
    console.log(e.target.email.value)
}

