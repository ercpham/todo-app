import {project, todoList, todoItem} from './todo.js';
import {displayProject, displayNewListForm, updateList, addProjectTab, getCurrentProject, setCurrentProject, displayNewProjectForm} from './dom.js';

let newProject = project('Default Project');
let diffProject = project('New Project');
let newList = todoList('List 1', 'The first list in the project');
let list2 = todoList('List 2', 'The second list in the project')

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

function openProjectForm() {
    displayNewProjectForm();
    let formWrapper = document.querySelector(".form");
    let submitButton = document.createElement("button");
    submitButton.classList.add("formSubmit");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", () => {
        let newProject = project(document.getElementById("projectname").value);
        newProject.addList(todoList("List"));
        addProjectTab(newProject);
    });
    formWrapper.appendChild(submitButton);
}

let list = document.getElementById("lists");
let add = document.createElement("button");
add.textContent = "Add new list item";

add.addEventListener("click", () => {
    associateForm(getCurrentProject());
});
list.appendChild(add);

newProject.addList(newList);
addProjectTab(newProject);
displayProject(newProject);
setCurrentProject(newProject);

diffProject.addList(list2);
let newProjectButton = document.getElementById("newProject");
newProjectButton.addEventListener("click", () => {
    openProjectForm();
});


// alert("Here");