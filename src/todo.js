/**
 * Creates a project object that has-a todoList
 * 
 * @param {string} name 
 * @param {string} description 
 */
const project = (name, description = "") => {
    let list;

    function addList(newList){
        list = newList;
    }

    function getList(){
        return list;
    }

    function addItem(item) {
        list.addItem(item);
    }
    return {name, description, list, addList, getList, addItem};
}

/**
 * Creates a todoList object that has-an array of todoItems
 * 
 * @param {string} name 
 * @param {string} description 
 */
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
    function removeItem(name) {
        let index = items.indexOf(name);
        items.splice(index, 1);
    }
    return {name, description, items, addItem, getItem, listContents, removeItem};
}

/**
 * Returns an item with all the given properties
 * 
 * @param {string} name 
 * @param {string} description 
 * @param {string} duedate 
 * @param {string} priority 
 * @param {boolean} complete 
 */
const todoItem = (name, description = "", duedate = "", priority = 0, complete = false) => {
    return {name, description, duedate, priority, complete};
}

export {project, todoList, todoItem};