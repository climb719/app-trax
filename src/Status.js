class Status {

    static all = []

    constructor({id, name}) {
        this.id = id
        this.name = name
        this.constructor.all.push(this)
        console.log(this)
    }

    static getStatuses() {
        api.getStatuses().then(statuses => {
            statuses.forEach(status => new Status(status))
            this.renderDivs() 
            })
    }

    static renderDivs() {
        const statusDivs = document.createElement('div')
        const main = document.getElementById('main')
        
        this.all.forEach(function(status) { 
         //debugger
        main.innerHTML += `<div class= "status-divs">${status.name}</div>`
        });
        
    }
         
    
    
}