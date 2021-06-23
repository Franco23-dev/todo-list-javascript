import AddTodo from '../components/add-todo.js';
import Modal from '../components/modal.js';
import Filters from '../components/filters.js';

export default class view {
	constructor(){
		this.model = null;
		this.table = document.getElementById("table");
		this.addTodoForm = new AddTodo();
		this.modal = new Modal();
		this.filters = new Filters();

		this.addTodoForm.onclick((title, description) => this.addTodo(title, description));
		this.modal.onclick((id, values) => this.editTodo(id, values));
		this.filters.onClick((filters) => this.filter(filters)); 
	}

	setModel(model){
		this.model = model;
	}

	render(){
		let todos = this.model.getTodos();
		todos.forEach((todo) => this.createRow(todo));
	}

	filter(filters){
		let { type, words } = filters;
		let [, ...rows] = this.table.getElementsByTagName("tr");	//Para quitar un elemento de una lista
		for(let row of rows){
			let [title, description, completed] = row.children;
			let shouldHide = false;

			if (words) {
				shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
				
			}
			let shouldBeCompleted = type === "completed";
			let isCompleted = completed.children[0].checked;

			if (type !== "all" && shouldBeCompleted !== isCompleted) {
				shouldHide = true;
			}
			if (shouldHide) {
				row.classList.add("d-none");
			} else {
				row.classList.remove("d-none");
			}
		}
	}

	addTodo(title, description){
		let todo = this.model.addTodo(title, description);
		this.createRow(todo);
	}

	toggleCompleted(id){
		this.model.toggleCompleted(id);
	}

	editTodo(id, values){
		this.model.editTodo(id, values);
		let row = document.getElementById(id);
		row.children[0].innerHTML = values.title;
		row.children[1].innerHTML = values.description;
		row.children[2].children[0].checked = values.completed;
	}

	removeTodo(id){
		this.model.removeTodo(id);
		document.getElementById(id).remove();

	}

	createRow(todo){
	let row = table.insertRow();
		row.setAttribute("id", todo.id);
		row.innerHTML = `
			<td>${todo.title}</td>
			<td>${todo.description}</td>
			<td class="text-center">
			
			</td>
			<td class="text-right">

			</td>
		`;

		let checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = todo.completed;
		checkbox.onclick = () => this.toggleCompleted(todo.id);
		row.children[2].appendChild(checkbox);

		let editBtn = document.createElement("button");
		editBtn.classList.add("btn", "btn-primary", "mb-1");
		editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
		editBtn.setAttribute("data-toggle", "modal");
		editBtn.setAttribute("data-target", "#modal");
		editBtn.onclick = () => this.modal.setValues({
			id: todo.id,
			title: row.children[0].innerText,
			description: row.children[1].innerText,
			completed: row.children[2].children[0].checked,
		});
		row.children[3].appendChild(editBtn);


		let removeBtn = document.createElement("button");
		removeBtn.classList.add("btn", "btn-danger", "mb-1", "ml-1");
		removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
		removeBtn.onclick = () => this.removeTodo(todo.id);
		
		row.children[3].appendChild(removeBtn);
	}
}