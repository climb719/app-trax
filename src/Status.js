class Status {

    static all = []
    
    constructor({id, name}) {
        this.id = id
        this.name = name
        this.constructor.all.push(this)
    }

    static getStatuses() {
        api.getStatuses().then(statuses => {
                statuses.forEach(status => new Status(status))
              //console.log(this)
            })
    }
    
    
}