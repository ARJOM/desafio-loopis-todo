// Todo

window.onload = () => {
	const todos = loadTodos() 
	todos.sort((first, second) => first.id - second.id)
	if (todos !== null)	todos.forEach(todo => generateHTMLToDo(todo))
	else setTodos([])
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
}

function editTodoForm(id){
	const todo = getTodoById(id)
	deleteTodo(id)

	const name = document.querySelector('#todo-input').value
	const updatedTodo = {...todo, name}
	addTodo(updatedTodo)
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