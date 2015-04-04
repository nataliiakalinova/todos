var list = document.getElementById("tasks-list");
todoModule.initList(list);

// add all necessary listeners
addListener(document.getElementById("new-task"), "keydown", todoModule.add);
addListener(document.getElementById("delete-all"), "click", todoModule.deleteAll);
addListener(document.getElementById("check-all"), "click", todoModule.checkAll);
addListener(document.getElementById("view-checked"), "click", todoModule.viewChecked);
addListener(document.getElementById("view-unchecked"), "click", todoModule.viewUnchecked);
addListener(document.getElementById("view-all"), "click", todoModule.viewAll);


// wrapper for different ways
function addListener(element, type, handler){
    if (document.addEventListener) {
        element.addEventListener(type, handler, false);
    }
    // IE
    else if (document.attachEvent) {
        element.attachEvent("on"+type, handler);
    }
    else {
        element["on"+type] = handler;
    }
}