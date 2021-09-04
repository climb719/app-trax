// console.log("Hello, World!")


// fetch("http://localhost:3000/jobs").then(resp => resp.json()).then(console.log)


const api = new ApiService("http://localhost:3000")

// api.getJobs().then(console.log)
Job.getJobs()