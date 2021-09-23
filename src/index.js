const api = new ApiService("http://localhost:3000")
const modal = new Modal()
let user

document.querySelector("form").addEventListener("submit", handleUserSubmit)

function handleUserSubmit(e){
    e.preventDefault()
    document.getElementById("main").innerHTML = ""
    api.FindOrCreateUser(e.target.email.value).then(userInfo => {
       user = userInfo
       Status.getStatuses()
    })
}

