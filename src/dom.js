function displayProject(project) {

    // Add new project tab
    let projectDiv = document.getElementById("projects");
    let newTab = document.createElement("div");
    newTab.classList.add("projectTab");
    let projName = document.createElement("h2");
    projName.textContent = project.name;
    newTab.appendChild(projName);
    projectDiv.prepend(newTab);

    // Display lists in the project
    let lists = document.getElementById("lists");

    project.lists.forEach((list) => {

        let listWrapper = document.createElement("div");

        // Create and append list header
        let listNames = document.createElement("h3");
        listNames.textContent = list.name;
        listWrapper.appendChild(listNames);

        // Create and append list contents
        let bullets = document.createElement("ul");
        list.items.forEach((item) => {
            let bullet = document.createElement("li");
            bullet.textContent = item.name;
            bullets.appendChild(bullet);
        });

        // Add button to add new list items
        let add = document.createElement("button");
        add.textContent = "Add new list item"
        listWrapper.appendChild(add);

        listWrapper.appendChild(bullets);

        lists.appendChild(listWrapper);
    });
    
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
    formWrapper.appendChild(closeButton);

    itemAttributes.forEach((attribute) => {
        let fieldWrap = document.createElement("div");
        fieldWrap.classList.add("fieldWrap");
        let label = document.createElement("label");
        let input = document.createElement("input");
        label.textContent = `${attribute}: `;
        input.setAttribute("type", "text");
        input.classList.add(`item${attribute.replace(/\s+/g, '').toLowerCase()}`);
        fieldWrap.appendChild(label);
        fieldWrap.appendChild(input);
        formWrapper.appendChild(fieldWrap);
    });
    let submitButton = document.createElement("button");
    submitButton.classList.add("formSubmit");
    submitButton.textContent = "Submit";
    formWrapper.appendChild(submitButton);

    page.appendChild(formWrapper);
}

export {displayProject, displayNewListForm};