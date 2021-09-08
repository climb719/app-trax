class Modal {

   

    get modal() {
        return document.getElementById("myModal")
    }

    open = () => {
        this.modal.style.display = "block"
    }

    close = () => {
        this.modal.style.display = "none"
    }


}