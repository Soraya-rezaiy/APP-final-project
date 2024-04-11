//create list array for storage

let list = [];
let listFromStorage = localStorage.getItem("list"); 
if (listFromStorage) {
    list = JSON.parse(listFromStorage);
    for (let i = 0; i < list.length; i++) {
        let currentItem = list[i];

        let color = "";
        if( currentItem.categoryDropdown === 'fruit') {
            color = 'bg-pink-300';
        }
        else if(currentItem.categoryDropdown === 'dairy') {
            color = 'bg-red-500'
        }
        else if(currentItem.categoryDropdown === 'grain') {
            color = 'bg-green-400'
        }

    
        let htmlString = `
        <li class="border-b border-gray-200 border-solid py-2.5">
        <span>➡️</span>
                ${currentItem.name}
                <span class="rounded-full text-md px-3 text-grey-600 py-1 ${color}">${currentItem.categoryDropdown}</span>
            </li>
        `;

        // Add the htmlstring into the parent
        document.querySelector("#list-items").innerHTML += htmlString;

    }
}

document.querySelector("button").addEventListener("click", function(event) {
    event.preventDefault();
    add();
});

document.querySelector("#list-items").addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        console.log("clicked on emoji");
        let listItem = e.target.parentNode;

        // removing the element from listitem
        let children = listItem.parentNode.children;
        let childrenArray = Array.from(children);
        let index = childrenArray.indexOf(listItem);
        list.splice(index, 1);
        let jsonString = JSON.stringify(list);
        localStorage.setItem("list", jsonString);
        listItem.remove();
    
    }
});
//function for validating input
function isValidated() {
    let isValid = false;
    let itemInput = document.querySelector("#itemInput").value.trim();
    let categoryDropdown = document.querySelector("#categorydropdown").value.trim();

    if (itemInput.length <= 0 && categoryDropdown.length <= 0) {
        document.querySelector("#itemInput").classList.add("border-pink-600");
        document.querySelector("#categorydropdown").classList.add("border-pink-600");
    } else if (itemInput.length <= 0) {
        document.querySelector("#itemInput").classList.add("border-pink-600");
        document.querySelector("#categorydropdown").classList.remove("border-pink-600");
    } else if (categoryDropdown.length <= 0) {
        document.querySelector("#dropdown").classList.add("border-pink-600");
        document.querySelector("#categorydropdown").classList.remove("border-pink-600");
    } else {
        document.querySelector("#itemInput").classList.remove("border-pink-600");
        document.querySelector("#categorydropdown").classList.remove("border-pink-600");
        isValid = true;
    }
    return isValid;
}
//create add function
function add() {
    if (isValidated()) {
        let itemInput = document.querySelector("#itemInput").value.trim();
        let categoryDropdown = document.querySelector("#categorydropdown").value.trim();
        let color = "";

        if (categoryDropdown === 'fruit') {
            color = 'bg-pink-300';
        } else if (categoryDropdown === 'dairy') {
            color = 'bg-red-500';
        } else if (categoryDropdown === 'grain') {
            color = 'bg-green-400';
        }
//declare newitems
        let newItem = {
            name: itemInput,
            categoryDropdown: categoryDropdown,
        };
        list.push(newItem);

        let jsonString = JSON.stringify(list);

        localStorage.setItem("list", jsonString);

        let htmlString = `
        <li class="border-b border-gray-200 border-solid py-2.5">
        <span>➡️</span>
            ${itemInput}
            <span class="rounded-full text-md px-3 text-grey-600 py-1 ${color}">${categoryDropdown}</span>
        </li>
        `;

        document.querySelector("#list-items").innerHTML += htmlString;

        document.querySelector("#itemInput").value = "";
        document.querySelector("#categorydropdown").value = "";
    } else {
        console.log("Invalid inputs");
    }
}
