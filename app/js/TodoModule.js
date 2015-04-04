var todoModule = (function(){

    // pointer to list in a document
    var list;

    // delete the concrete task
    var deleteTask = function (e) {
        // it should work only for delete images
        var target = e && e.target || window.event.srcElement;
        if (target.nodeName!="IMG") return;

        // ul - li - img
        // so parent of the parent is needed
        var task =  target.parentNode.parentNode;
        task.parentNode.removeChild(task);
    };

    // remove class for sort indication
    function removeClass(e, className) {
        e.className = e.className.replace(new RegExp("\\b" + className + "\\b\\s*", "g"), "");
    }

    return {
        // initialize list
        initList: function(listObj) {
            list = listObj;
        },

        // add new task
        add: function(e) {
            // get target and event
            var target = e && e.target || window.event.srcElement;
            var event = e || window.event;

            // add only when Enter is pressed
            if (e.keyCode === 13|| e.charCode == 13) {
                // if empty text - return
                if (!target.value) {
                    return false;
                }

                // prevent page reload onkeypress
                if (event.preventDefault) {  // W3C variant
                event.preventDefault()
                } else { // IE<9 variant:
                    event.returnValue = false
                }

                // and line to the list
                var task = document.createElement("li");
                task.className = "task-list-view-item";

                // add ckeckbox
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "task";
                checkbox.className = "task-list-view-item__check";
                task.appendChild(checkbox);

                // add label
                var label = document.createElement("label");
                label.innerHTML = target.value;
                task.appendChild(label);

                // add delete icon
                var deleteLink = document.createElement("a");
                deleteLink.href = "#";
                deleteLink.className = "task-list-view-item__delete";
                deleteLink.onclick = deleteTask;
                // add img
                var img = document.createElement("img");
                img.src = "images/delete-icon.png";

                // append all parts of the line
                deleteLink.appendChild(img);
                task.appendChild(deleteLink);
                list.appendChild(task);

                // clean add field
                target.value = "";
            }
        },

        deleteAll: function() {
            // delete all elements
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
        },

        checkAll: function() {
            // check all element
            var checkboxes = list.getElementsByTagName("input");
            for (var i=0; i<checkboxes.length; i++) {
                checkboxes[i].checked = true;
            }
        },

        viewChecked: function() {
            var elements = list.getElementsByClassName("task-list-view-item");
            for (var i=0; i < elements.length; i++){
                if (!elements[i].children[0].checked) {
                    elements[i].className+=" task-list-view-item_hide";
                }

            }
        },

        viewUnchecked: function() {
            var elements = list.getElementsByClassName("task-list-view-item");
            for (var i=0; i < elements.length; i++){
                if (elements[i].children[0].checked) {
                    elements[i].className+=" task-list-view-item_hide";
                }
                else {
                    removeClass(elements[i], "task-list-view-item_hide");
                }

            }
        },

        viewAll: function() {
            var elements = list.getElementsByClassName("task-list-view-item");
            for (var i=0; i < elements.length; i++){
                removeClass(elements[i], "task-list-view-item_hide");
            }
        }

    };

}());