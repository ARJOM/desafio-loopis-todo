// Todo

window.onload = () => {
	const todos = loadTodos() 
	if (todos !== null)	{
		
		todos.sort((first, second) => {
			const secondName = second.name.toLowerCase()
			const firstName = first.name.toLowerCase()
			if (secondName < firstName){
				return 1
			} else if (firstName < secondName){
				return -1
			} else {
				return first.id - second.id
			}
		})

		todos.forEach(todo => generateHTMLToDo(todo))
	}
	else setTodos([])

	// Adicionar função de salvar Todo
	const salvar = document.querySelector("#save-button")
	salvar.addEventListener("click", function(){
		addTodoForm()
	})

}

function getTodoById(id){
	const todos = loadTodos()
	const todo = todos.filter(todo => todo.id === id)[0]
	return todo
}

function addTodo(todo){
	const todos = loadTodos()
	todos.push(todo)
	setTodos(todos)
}

function deleteTodo(id){
	const todos = loadTodos()
	const updatedTodos = todos.filter(todo => todo.id != id)
	setTodos(updatedTodos)
}

function addTodoForm(){
	const status = 'backlog'
	const id = new Date().valueOf();
	const name = document.querySelector('#todo-input').value

	const todo = {id, name, status}
	addTodo(todo)
	window.location.reload()
}

function editTodoForm(id){
	const todo = getTodoById(id)
	deleteTodo(id)

	const name = document.querySelector(`#todo-input-${todo.id}`).value
	const updatedTodo = {...todo, name}
	addTodo(updatedTodo)
	window.location.reload()
}

function changeStatus(id){
	const todo = getTodoById(id)
	deleteTodo(id)
	
	let status;
	if (todo.status == 'done'){
		status = 'backlog'
	} else {
		status = 'done'
	}

	const updatedTodo = {...todo, status}
	addTodo(updatedTodo)
}

// Funções de renderização

function generateHTMLToDo(todo){
	let todoContainer = document.createElement('div')
	todoContainer.classList.add('todo')
	todoContainer.id = todo.id

	let todoInfo = document.createElement('div')
	todoInfo.classList.add(todo.status)
	todoInfo.addEventListener("click", function(){
		changeCheck(this)
	})
	todoInfo.addEventListener("click", function(){
		changeStatus(todo.id)
	})

	let todoIcon = document.createElement('div')

	let name = document.createElement('p')
	name.textContent = todo.name
	name.classList.add("nome")

	let todoOptions = document.createElement('div')

	let editImg = document.createElement('img')
	editImg.src = "../assets/icons/Edit.svg"
	editImg.height = "20"

	let editModal = document.createElement('div')
	editModal.id = `myModal-${todo.id}`
	editModal.classList.add("modal")
	
	let editModelContent = document.createElement('div')
	editModelContent.classList.add("modal-content")

	let closeButton = document.createElement('span')
	closeButton.classList.add("close")
	closeButton.innerHTML = '&times;'

	closeButton.addEventListener("click", function() {
		editModal.style.display = "none";
	})

	window.addEventListener("click", function(event) {
		if (event.target == editModal) {
		  editModal.style.display = "none";
		}
	})

	let editModalForm = document.createElement('div')
	
	let inputName = document.createElement('input')
	inputName.type = "text"
	inputName.id = `todo-input-${todo.id}`
	inputName.placeholder = "Digite o novo nome da tarefa"
	inputName.value = todo.name

	let editButton = document.createElement('button')
	editButton.id = "edit-button"
	editButton.textContent = "Salvar"
	editButton.addEventListener("click", function(){
		editTodoForm(todo.id)
	})

	editModalForm.appendChild(inputName)
	editModalForm.appendChild(editButton)

	editModelContent.appendChild(closeButton)
	editModelContent.appendChild(editModalForm)

	editModal.appendChild(editModelContent)

	editImg.addEventListener("click", function(){
		editModal.style.display = "block";
	})

	let deleteImg = document.createElement('img')
	deleteImg.src = "../assets/icons/trash-alt.svg"
	deleteImg.height = "20"


	todoInfo.appendChild(todoIcon)
	todoInfo.appendChild(name)

	todoOptions.appendChild(editImg)
	todoOptions.appendChild(editModal)
	todoOptions.appendChild(deleteImg)

	todoContainer.appendChild(todoInfo)
	todoContainer.appendChild(todoOptions)

	let section = document.querySelector('.todos')
	section.appendChild(todoContainer)
}


// Funções Úteis

function loadTodos(){
	return getObjectLocalStorage('todos')
}

function setTodos(todos){
	setObjectLocalStorage('todos', todos)
}

function setObjectLocalStorage(key,value){
	localStorage.setItem(key, JSON.stringify(value));
}

function getObjectLocalStorage(key){
	var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}