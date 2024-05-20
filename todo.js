(function(){
let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');
function addTaskToDOM(task){
       const li=document.createElement('li');
       li.innerHTML=`
            <input type="checkbox" id="${task.id}" class="custom-checkbox" ${task.completed?'checked':''}>
            <label for="${task.id}">${task.title}</label>
             <img src="https://www.svgrepo.com/show/21045/delete-button.svg" data-id="${task.id}" class="delete" >
       `;
       taskList.append(li);
}

function renderList () {
	taskList.innerHTML='';
   for(let i=0;i<tasks.length;i++){
   	addTaskToDOM(tasks[i]);

   }
   tasksCounter.innerHTML=tasks.length;
}

function toggleTask (taskId) {
let task=tasks.filter(function(task){
	return task.id === Number(taskId);
});
if(task.length>0){
	let task1=task[0];
	task1.completed=!task1.completed;
	renderList();
	showNotification('task toggled');
	return;
}
showNotification('task doesnot toggled');

}

function deleteTask (taskId) {

       let newtasks=tasks.filter(function(task){
       	return task.id !== Number(taskId);
       });
       tasks=newtasks;
       renderList();
       showNotification('task deleted');
       return;

}

function addTask (task) {
	if(task){
	tasks.push(task);
	renderList(task);
	showNotification('task added');
	return;
}
showNotification('task can no be added');
}

function showNotification(text) {
	alert(text);
}

function handleInputKeypress(e){
if(e.key==='Enter'){
	const text=e.target.value;
	if(!text){
		showNotification('task can not be empty');
	}
	const task={
		title:text,
		id:Date.now(),
		completed:false

	}
	e.target.value='';
	addTask(task);
}

}
function clickHandler(e){
	const target=e.target;

	if(target.className==='delete'){
	
		let id=target.getAttribute('data-id');
		deleteTask(id);
		return;
	}
	else if(target.className==='custom-checkbox'){
		
		let id=target.id;
		toggleTask(id);

		return;
	}
}
async function gettodo(){
	// fetch('https://jsonplaceholder.typicode.com/todos')
	// .then(function(response){
	// 	return response.json();
	// }).then(function (data){
	// 	tasks=data.slice(0,10);
	// 	renderList();
	// })
try{
	const response=await fetch('https://jsonplaceholder.typicode.com/todos');
	const data=await response.json();
	tasks=data.slice(0,10);
	renderList();

}
catch(error){
	alert(error);
}
}
function todo(){
gettodo();
addTaskInput.addEventListener('keyup',handleInputKeypress);

document.getElementById('list').addEventListener('click',clickHandler);
}
todo();
})();