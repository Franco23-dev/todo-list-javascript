import Model from './model.js';
import View from './view.js';

document.addEventListener("DOMContentLoaded", function(){
	let model = new Model();
	let view = new View();

	model.setView(view);
	view.setModel(model);
	
	view.render();
});