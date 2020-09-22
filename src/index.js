import {project, todoList, todoItem} from './todo.js';
import {displayProject, displayNewListForm, updateList, addProjectTab, getCurrentProject, setCurrentProject, displayNewProjectForm, removeProjectTab, closeForm} from './dom.js';

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
    closeForm();
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
        let newProject = project(document.getElementById("projectname").value,
                                document.getElementById("projectdescription").value);
        newProject.addList(todoList("List"));
        addProjectTab(newProject);
        closeForm();
    });
    formWrapper.appendChild(submitButton);
}

let list = document.getElementById("lists");
let add = document.createElement("button");
add.textContent = "Add new list item";

add.addEventListener("click", () => {
    if (getCurrentProject() !== null) {
        if (!document.querySelector(".form"))
        associateForm(getCurrentProject());
    }
    else {
        alert("Please select a project to add to.");
    }
});
list.appendChild(add);

let remove = document.createElement("button");
remove.textContent = "Remove project";
remove.addEventListener("click", () => {
    if (getCurrentProject() !== null) {
        removeProjectTab(getCurrentProject());
        setCurrentProject(null);
    }
    else {
        alert("Please select a project before removing.");
    }
});
list.appendChild(remove);

newProject.addList(newList);
addProjectTab(newProject);
displayProject(newProject);
setCurrentProject(newProject);


diffProject.addList(list2);
let newProjectButton = document.getElementById("newProject");
newProjectButton.addEventListener("click", () => {
    if (!document.querySelector(".form"))
        openProjectForm();
});


// alert("Here");