const busca = document.querySelector("#pesquisa");
busca.addEventListener("input", function(){
    const items = document.querySelectorAll(".todo");
    
    items.forEach(item => {
        let nome = item.querySelector(".nome").textContent;
        nome = nome.toLowerCase()
        let busca = this.value.toLowerCase()
        if (!nome.includes(busca)){
            esconder(item)
        } else {
            mostrar(item)
        }
    })
})


function esconder(element){
    if (!element.classList.contains("esconder")){
        element.classList.add("esconder")
        
    }
}

function mostrar(element){
    if (element.classList.contains("esconder")){
        element.classList.remove("esconder")
    }
}
