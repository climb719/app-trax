console.log("Hello, World!")

fetch("http://localhost:3000/jobs").then(resp => resp.json()).then(console.log)