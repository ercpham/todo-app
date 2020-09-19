import {project, todoList, todoItem} from './todo.js';
import {displayProject} from './dom.js';

let newProject = project('Default Project');
let newList = todoList('List 1', 'The first list in the project');
let list2 = todoList('List 2', 'The second list in the project')
let newItem = todoItem('Fill up gas', 'Go to Costco and fill up premium gas', 'Today');

newProject.addList(newList);
newProject.addList(list2);
newProject.getList('List 2').addItem(todoItem("Wash the dishes"));
newProject.getList('List 2').addItem(todoItem("Walk the Dog"));



console.log(newProject.getList('List 1'));
newProject.getList('List 1').addItem(newItem);
newProject.getList('List 1').addItem(todoItem("Wash the car"));
console.log(newProject.getList('List 1').listContents());

displayProject(newProject);
// alert("Here");