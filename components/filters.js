export default class filters {
	constructor(){
		this.form = document.getElementById("filters");
		this.btn = document.getElementById("search");

	}
	onClick(callback){
		this.btn.onclick = (e) => {
			e.preventDefault();
			let data = new FormData(this.form);
			callback({
				type: data.get("type"),
				words: data.get("words"),
			});
		}
	}
	
}