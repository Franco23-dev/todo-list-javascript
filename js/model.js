export default class Model {
	constructor(){
		this.view = null;
		this.todos = JSON.parse(localStorage.getItem("todos"));
		if (!this.todos || this.todos.length < 1) {
			this.todos = [
				{
					id: 0,
					title: "Sin tarea",
					description: "No hay tareas a realizar",
					completed: false,
				}
			]
			this.currentId = 1;
		} else {
			this.currentId = this.todos[this.todos.length - 1].id + 1;
		} 
		
 	}

	setView(view){
		this.view = view;
	}

	save(){
		localStorage.setItem("todos", JSON.stringify(this.todos));
	}

	getTodos(){
		return this.todos.map((todo) => ({...todo}));
	}

	findTodo(id){
		return this.todos.findIndex((todo) => todo.id === id);
	}

	toggleCompleted(id){
		let index = this.findTodo(id);
		let todo = this.todos[index];
		todo.completed = !todo.completed;
		this.save();
	}

	editTodo(id, values) {
		let index = this.findTodo(id);
		Object.assign(this.todos[index], values);
		this.save();
	}

	addTodo(title, description){
		let todo = {
			id: this.currentId++,
			title,
			description,
			complete: false,
		}
		this.todos.push(todo);
		console.log(this.todos)

		this.save();
		return {...todo};	//es para clonar el todo...
	}

	removeTodo(id){
		let index = this.findTodo(id);
		this.todos.splice(index, 1);

		this.save();
	}
}