function displayProject(project) {

    // Add new project tab
    

    // Display lists in the project
    let listContent = document.getElementById("lists");

    let listWrapper = document.createElement("div");
    listWrapper.setAttribute("id", `listwrap`);

        // Create and append list header
        //let listNames = document.createElement("h3");
        //listNames.textContent = list.name;
        //listWrapper.appendChild(listNames);

    // Create and append list contents

    let list = project.getList();

    let bullets = document.createElement("ul");
    list.items.forEach((item) => {
        let bullet = document.createElement("li");
        bullet.textContent = item.name;
        bullets.appendChild(bullet);
    });

        // Add button to add new list items
    // let add = document.createElement("button");
    // add.textContent = "Add new list item";
    // add.addEventListener("click", displayNewListForm);
    // listWrapper.appendChild(add);

    listWrapper.appendChild(bullets);

    listContent.prepend(listWrapper);
}

function clearProject() {
    document.getElementById("listwrap").remove();
}

function addProjectTab(project) {
    let projectDiv = document.getElementById("projects");
    let newTab = document.createElement("div");
    newTab.classList.add("projectTab");
    let projName = document.createElement("h2");
    projName.textContent = project.name;
    newTab.appendChild(projName);
    newTab.addEventListener("click", () => {
        clearProject();
        displayProject(project);
    })
    projectDiv.prepend(newTab);
}

function updateList(listWrapper, list) {
    while (listWrapper.firstChild) {
        listWrapper.removeChild(listWrapper.lastChild);
    }
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
        //bullets.appendChild(bullet);
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

function toggleCompletion(container, item) {
    if (item.complete) {
        item.complete = false;
        container.style.textDecoration = "none";
    }
    else {
        item.complete = true;
        container.style.textDecoration = "line-through";
    }
    return false;
}

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
    }
    else {
        let info = container.querySelectorAll("p");
        info.forEach((i) => {
            i.remove();
        });
    }
}

function displayNewListForm() {
    let page = document.getElementById("content");
    let formWrapper = document.createElement("div");
    formWrapper.classList.add("form");
    let itemAttributes = ["Name", "Description", "Due Date", "Priority"];

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
        input.setAttribute("id", `item${attribute.replace(/\s+/g, '').toLowerCase()}`);
        fieldWrap.appendChild(label);
        fieldWrap.appendChild(input);
        formWrapper.appendChild(fieldWrap);
    });

    // let submitButton = document.createElement("button");
    // submitButton.classList.add("formSubmit");
    // submitButton.textContent = "Submit";
    // submitButton.addEventListener("click", submit);
    // formWrapper.appendChild(submitButton);

    page.appendChild(formWrapper);
}



function closeForm() {
    let parent = document.querySelector(".form");
    parent.remove();
}

export {displayProject, displayNewListForm, updateList, addProjectTab};