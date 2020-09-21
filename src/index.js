import {project, todoList, todoItem} from './todo.js';
import {displayProject, displayNewListForm, updateList, addProjectTab} from './dom.js';



let newProject = project('Default Project');
let diffProject = project('New Project');
let newList = todoList('List 1', 'The first list in the project');
let list2 = todoList('List 2', 'The second list in the project')
let newItem = todoItem('Fill up gas', 'Go to Costco and fill up premium gas', 'Today');

function submit(project) {
    project.addItem(todoItem(document.getElementById("itemname").value,
            document.getElementById("itemdescription").value,
            document.getElementById("itemduedate").value,
            document.getElementById("itempriority").value));

    updateList(document.getElementById("listwrap"), project.getList());
}

function associateForm(project) {
    displayNewListForm();
    let formWrapper = document.querySelector(".form");
    let submitButton = document.createElement("button");
    submitButton.classList.add("formSubmit");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", () => {
        submit(project);
    });
    formWrapper.appendChild(submitButton);
}

diffProject.addList(list2);
let newProjectButton = document.getElementById("newProject");
newProjectButton.addEventListener("click", addProjectTab(diffProject));

newProject.addList(newList);

addProjectTab(newProject);
displayProject(newProject);

let list = document.getElementById("lists");
let add = document.createElement("button");
add.textContent = "Add new list item";
add.addEventListener("click", () => {
    associateForm(newProject);
});
list.appendChild(add);
// alert("Here");