function displayProject(project) {
    let page = document.getElementById("projects");
    let newTab = document.createElement("div");
    newTab.classList.add("projectTab");
    let projName = document.createElement("h2");
    projName.textContent = project.name;
    newTab.appendChild(projName);
    page.prepend(newTab);

    let lists = document.getElementById("lists");

    project.lists.forEach((list) => {

        let listWrapper = document.createElement("div");
        let listNames = document.createElement("h3");
        listNames.textContent = list.name;
        listWrapper.appendChild(listNames);

        let bullets = document.createElement("ul");
        list.items.forEach((item) => {
            let bullet = document.createElement("li");
            bullet.textContent = item.name;
            bullets.appendChild(bullet);
        });
        listWrapper.appendChild(bullets);
        lists.appendChild(listWrapper);
    });
    
}

export {displayProject};