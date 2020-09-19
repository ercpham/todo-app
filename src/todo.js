const project = (name) => {
    let lists = [];
    function addList(list){
        lists.push(list);
    }
    function getList(name){
        let correctList;
        lists.forEach((list) => {
            if (list.name === name) {
                correctList = list;
            }
        });
        return correctList;
    }
    return {name, lists, addList, getList};
}

const todoList = (name, description = "") => {
    let items = [];
    function addItem(item) {
        items.push(item);
    }
    function getItem(name) {
        items.forEach((item) => {if (item.name == name) return item});
    }
    function listContents() {
        let string = ""
        items.forEach((item) => {
            string += item.name+ " ";
        });
        return string;
    }
    return {name, description, items, addItem, getItem, listContents};
}

const todoItem = (name, description = "", duedate = "", priority = "low") => {
    return {name, description, duedate, priority};
}

export {project, todoList, todoItem};