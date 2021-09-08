class Modal {

    constructor() {
        this.addClose()
    }

    get modal() {
        return document.getElementById("myModal")
    }

    open = () => {
        this.modal.style.display = "block"
    }

    close = () => {
        this.modal.style.display = "none"
    }

    addClose = () => {
        this.modal.addEventListener("click", (e) => {
            if (e.target.classList.contains("close")) {
                console.log("close it")
            }
        })
    }
}