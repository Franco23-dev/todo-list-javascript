import Alert from './alert.js';

export default class AddTodo {
	constructor(){
		this.btn = document.getElementById("add");
		this.title = document.getElementById("title");
		this.description = document.getElementById("description");

		this.alert = new Alert("alert");
	}

	onclick(callback){
		this.btn.onclick = () => {
			if (title.value === '' || description.value === '') {
				this.alert.show("Se necesita completar titulo y descripcion, porfavor");
			} else {
				this.alert.hide();
				callback(this.title.value, this.description.value);
			}
		}
	}
}