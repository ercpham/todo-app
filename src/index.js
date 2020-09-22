import {project, todoList, todoItem} from './todo.js';
import {displayProject, displayNewListForm, updateList, addProjectTab, getCurrentProject, setCurrentProject, displayNewProjectForm, removeProjectTab, closeForm, addProjectToStorage} from './dom.js';

// Initialize the inital project
let newProject = project('Default Project');
let newList = todoList('List 1', 'The first list in the project');
newProject.addList(newList);

/**
 * When the submit button is clicked an item is added to a project and
 * the list is updated
 * 
 * @param {project} project 
 */
function submit(project) {
    project.addItem(todoItem(document.getElementById("itemname").value,
            document.getElementById("itemdescription").value,
            document.getElementById("itemduedate").value,
            document.getElementById("itempriority").value));

    updateList(document.getElementById("listwrap"), project.getList());
    localStorage.setItem(project.name, JSON.stringify(project.getList()));
    closeForm();
}

/**
 * Creates a submit button associated with the correct project
 * 
 * @param {project} project 
 */
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

/**
 * Opens the form to create a new project
 */
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
        addProjectToStorage(newProject);
        closeForm();
    });
    formWrapper.appendChild(submitButton);
}

// Add a "new item" button with an event listener
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

// Add a "remove project" button with an event listener
let remove = document.createElement("button");
remove.textContent = "Remove project";
remove.addEventListener("click", () => {
    if (getCurrentProject() !== null) {
        if (JSON.parse(localStorage.getItem("projects")).length > 1) {
            console.log(getCurrentProject());
            removeProjectTab(getCurrentProject());
            setCurrentProject(null);
        }
        else {
            alert("You can't remove your only project!");
        }
    }
    else {
        alert("Please select a project before removing.");
    }
});
list.appendChild(remove);

// Add a "new project" button with an event listener
let newProjectButton = document.getElementById("newProject");
newProjectButton.addEventListener("click", () => {
    if (!document.querySelector(".form"))
        openProjectForm();
});

//localStorage.clear();

if (localStorage.getItem("projects") === null) {
    console.log("Local storage null. Adding default project");
    let projects = [];
    projects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem(`${newProject.name}`, JSON.stringify(newProject.getList()));
}

let firstProject;
let projects = JSON.parse(localStorage.getItem("projects"));
projects.forEach((item) => {
    let loaded = project(item.name, item.description);
    let loadedList = JSON.parse(localStorage.getItem(item.name));
    loaded.addList(todoList(loadedList.name, loadedList.description, loadedList.items));
    addProjectTab(loaded);
    firstProject = loaded;
});

displayProject(firstProject);
setCurrentProject(firstProject);

// Display the default project
// addProjectTab(newProject);
// displayProject(newProject);
// setCurrentProject(newProject);

