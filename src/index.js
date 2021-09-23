const api = new ApiService("http://localhost:3000")
const modal = new Modal()
let user

document.querySelector("form").addEventListener("submit", handleUserSubmit)

function handleUserSubmit(e){
    document.getElementById("main").innerHTML = ""
    e.preventDefault()
    api.FindOrCreateUser(e.target.email.value).then(userInfo => {
       user = userInfo
       Status.getStatuses()
    })
}

