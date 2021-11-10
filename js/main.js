// Todo

const todos = [
	{id: 1, name: 'Preparar almoço', status: 'done'},
	{id: 2, name: 'Preparar almoço', status: 'backlog'}
]

todos.forEach(todo => generateHTMLToDo(todo))



// Funções Úteis

function generateHTMLToDo(todo){
	let todoContainer = document.createElement('div')
	todoContainer.classList.add('todo')
	todoContainer.id = todo.id

	let todoInfo = document.createElement('div')
	todoInfo.classList.add(todo.status)
	todoInfo.addEventListener("click", function(){
		changeCheck(this)
	})

	let todoIcon = document.createElement('div')

	let name = document.createElement('p')
	name.textContent = todo.name
	name.classList.add("nome")

	let todoOptions = document.createElement('div')

	let editImg = document.createElement('img')
	editImg.src = "../assets/icons/Edit.svg"
	editImg.height = "20"

	let deleteImg = document.createElement('img')
	deleteImg.src = "../assets/icons/trash-alt.svg"
	deleteImg.height = "20"


	todoInfo.appendChild(todoIcon)
	todoInfo.appendChild(name)

	todoOptions.appendChild(editImg)
	todoOptions.appendChild(deleteImg)

	todoContainer.appendChild(todoInfo)
	todoContainer.appendChild(todoOptions)

	let section = document.querySelector('section')
	section.appendChild(todoContainer)
}

function setObjectLocalStorage(key,value){
	localStorage.setItem(key, JSON.stringify(value));
}

function getObjectLocalStorage(key){
	var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}