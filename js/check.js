function changeCheck(element){
    if (!element.classList.contains("backlog")){
        element.classList.add("backlog")
        element.classList.remove("done")
    } else {
        element.classList.add("done")
        element.classList.remove("backlog")
    }
}