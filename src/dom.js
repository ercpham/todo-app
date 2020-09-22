/**
 * Contains the methods to manipulate the DOM of the to-do list program
 */

// The current project being focused on
let currentProject = null;
function setCurrentProject(project) {
    currentProject = project;
    if (project !== null)
        document.getElementById(`tab_${project.name}`).classList.add("selected");
}
function getCurrentProject() {
    return currentProject;
}

/**
 * Lists the contents of a given project inside the "lists" div
 * 
 * @param {project} project 
 */
function displayProject(project) {

    // Display lists in the project
    let listContent = document.getElementById("lists");

    let listWrapper = document.createElement("div");
    listWrapper.setAttribute("id", `listwrap`);

    let name = document.createElement("h2");
    name.textContent = project.name;
    listWrapper.append(name);

    let description = document.createElement("h3");
    description.textContent = project.description;
    listWrapper.append(description);

    // Create and append list contents
    let list = project.getList();

    let bullets = document.createElement("ul");
    list.items.forEach((item) => {
        let bullet = document.createElement("li");
        bullet.textContent = item.name;
        bullets.appendChild(bullet);
    });

    listWrapper.appendChild(bullets);

    listContent.prepend(listWrapper);

    updateList(listWrapper, list);
}

/**
 * Removes the container for the to-do list tasks
 */
function clearProject() {
    document.getElementById("listwrap").remove();
}

/**
 * Creates a new project tab
 * 
 * @param {project} project 
 */
function addProjectTab(project) {
    let projectDiv = document.getElementById("projects");
    let newTab = document.createElement("div");
    newTab.classList.add("projectTab");
    newTab.setAttribute("id", `tab_${project.name}`);
    let projName = document.createElement("h2");
    projName.textContent = project.name;
    newTab.appendChild(projName);
    newTab.addEventListener("click", () => {
        clearSelected();
        // newTab.classList.add("selected");
        clearProject();
        displayProject(project);
        setCurrentProject(project);
        updateList(document.getElementById("listwrap"), project.getList());
    })
    projectDiv.prepend(newTab);

}

function addProjectToStorage(project) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem(`${project.name}`, JSON.stringify(project.getList()));
}

/**
 * Clears the selected CSS style from all the project tabs
 */
function clearSelected() {
    let tabs = document.querySelectorAll(".projectTab");
    tabs.forEach((tab) => tab.classList.remove("selected"));
}

/**
 * Removes a project tab and clears the list.
 * @param {project} project 
 */
function removeProjectTab(project) {
    document.getElementById(`tab_${project.name}`).remove();
    let listWrapper = document.getElementById("listwrap");
    while (listWrapper.firstChild) {
        listWrapper.removeChild(listWrapper.lastChild);
    }

    let projects = JSON.parse(localStorage.getItem("projects"));
    projects.forEach(item => {
        if (item.name == project.name) {
            projects.splice(projects.indexOf(item), 1);
        }
    })
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.removeItem(`${project.name}`);
}

/**
 * Fills the "lists" div with the relevant content
 * 
 * @param {div} listWrapper 
 * @param {todoList} list 
 */
function updateList(listWrapper, list) {
    listWrapper.querySelector("ul").remove();
    let bullets = document.createElement("ul");
    list.items.forEach((item) => {
        let bullet = document.createElement("li");
        bullet.textContent = item.name;
        if (item.complete) {
            bullet.style.textDecoration = "line-through";
            bullets.appendChild(bullet);
        }
        else {
            bullets.prepend(bullet);
        }

        bullet.addEventListener("click", () => {
            displayItemInfo(bullet, item);
        });
        bullet.addEventListener("contextmenu", (ev) => {
            ev.preventDefault();
            toggleCompletion(bullet, item);
        }, false);
    });
    listWrapper.appendChild(bullets);
}

/**
 * Toggles if the task has been complete, indicating completion with a
 * line-through text decoration.
 * 
 * @param {li} container 
 * @param {togoItem} item 
 */
function toggleCompletion(container, item) {
    if (item.complete) {
        item.complete = false;
        container.style.textDecoration = "none";
    }
    else {
        item.complete = true;
        container.style.textDecoration = "line-through";
    }
    localStorage.setItem(currentProject.name, JSON.stringify(currentProject.getList()));
    return false;
}

/**
 * Expands a list element to show more information about the item
 * 
 * @param {li} container 
 * @param {togoItem} item 
 */
function displayItemInfo(container, item) {
    let properLabels = ["Description: ", "Due Date: ", "Priority: "];
    let index = 0;
    if (container.querySelector("p") == undefined) {
        for (let prop in item) {
            if (Object.prototype.hasOwnProperty.call(item, prop)) {
                if (prop !== "name" && prop != "complete") {
                    let info = document.createElement('p');
                    info.textContent = `${properLabels[index++]}${item[prop]}`;
                    container.appendChild(info);
                }
            }
        }
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("removebutton");
        removeButton.addEventListener("click", () => {
            currentProject.getList().removeItem(item.name);
            localStorage.setItem(currentProject.name, JSON.stringify(currentProject.getList()));
            container.remove();
        });
        container.appendChild(removeButton);
    }
    else {
        let info = container.querySelectorAll("p");
        info.forEach((i) => {
            i.remove();
        });
        container.querySelector("button").remove();
    }
}

/**
 * Displays a form with text fields labeled the item attributes
 * @param {array} itemAttributes 
 * @param {string} idPrefix 
 */
function displayNewForm(itemAttributes, idPrefix) {
    let page = document.getElementById("content");
    let formWrapper = document.createElement("div");
    formWrapper.classList.add("form");

    let heading = document.createElement("h2");
    heading.textContent = "New List Item";
    formWrapper.appendChild(heading);

    let closeButton = document.createElement("div");
    closeButton.classList.add("close");
    closeButton.textContent = "X";

    closeButton.addEventListener("click", closeForm);

    formWrapper.appendChild(closeButton);

    itemAttributes.forEach((attribute) => {
        let fieldWrap = document.createElement("div");
        fieldWrap.classList.add("fieldWrap");
        let label = document.createElement("label");
        let input = document.createElement("input");
        label.textContent = `${attribute}: `;
        input.setAttribute("type", "text");
        input.setAttribute("id", `${idPrefix}${attribute.replace(/\s+/g, '').toLowerCase()}`);
        fieldWrap.appendChild(label);
        fieldWrap.appendChild(input);
        formWrapper.appendChild(fieldWrap);
    });

    page.appendChild(formWrapper);
}

/**
 * Displays the form to create a new item
 */
function displayNewListForm() {
    displayNewForm(["Name", "Description", "Due Date", "Priority"], "item");
}

/**
 * Displays the form to create a new project
 */
function displayNewProjectForm() {
    displayNewForm(["Name", "Description"], "project");
}

/**
 * Closes any open form
 */
function closeForm() {
    let parent = document.querySelector(".form");
    parent.remove();
}

export {displayProject, displayNewListForm, updateList,
     addProjectTab, setCurrentProject, getCurrentProject, displayNewProjectForm,
    removeProjectTab, closeForm, addProjectToStorage};