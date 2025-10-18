// alert("Hello world")
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearAll = document.getElementById("clearAll");
const filter = document.getElementById("filter");
const addBtn = document.getElementById("addbtn");
let isEditMode = false;
// const itemList = document.getElementById('item-list')
// const hello = document.getElementById("hello");
// const items = document.querySelectorAll('li')
// console.log(items)
// console.log(itemForm)
// console.log(itemInput)

function addItem(e) {
  // console.log(e)
  e.preventDefault();

  const item = itemInput.value;
  if (item === "") {
    alert("enter the item");
    return;
  }
  if (isEditMode) {
    const itemtoEdit = itemList.querySelector(".edit");
    removeItemFromLocalStorage(itemtoEdit.textContent);
    itemtoEdit.remove();
    isEditMode = false;
  }
  let itemlower = item.toLowerCase();
  if (duplicateItem(itemlower)) {
    alert(`${item} already exits`);
    itemInput.value = "";
    return;
  }

  DOMmaItemadd(item);
  addItemtoStorage(item);

  checkPage();
  // console.log(li)
}

function DOMmaItemadd(item) {
  const text = document.createTextNode(item);
  const li = document.createElement("li");
  const btn = document.createElement("button");
  const icon = document.createElement("i");
  btn.classList.add("cross");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-xmark");
  li.appendChild(text);
  li.appendChild(btn);
  btn.appendChild(icon);
  itemList.appendChild(li);
  itemInput.value = "";
}

//remove item

function onClickItem(e) {
  const btn = e.target.parentElement;
  console.log(btn);
  if (btn.classList.contains("cross")) {
    // btn.parentElement.remove();
    removeItem(btn.parentElement); //apple banana
  } else {
    ItemEdit(e.target);
  }
}

// let a = 3
// let b =2

// function removeItem(e) {
//     const btn = e.target.parentElement;

//     // console.log(btn)
//     // btn.parentElement.remove()
//     if (btn.classList.contains("cross")) {
//         btn.parentElement.remove();
//     }
//     checkPage()

// }

function removeItem(item) {
  console.log(item);
  console.log(item.textContent);
  if (confirm("are you sure want to delete")) {
    item.remove();

    removeItemFromLocalStorage(item.textContent);
  }

  checkPage();
}

function removeItemFromLocalStorage(item) {
  //banana
  let itemsFromLocalStorage = getItemsFromLocalStorage();
  console.log(itemsFromLocalStorage); //banana
  //  <li>banana<button class="cross">
  // <i class="fa-solid fa-xmark"></i>
  // </button></li>
  //[banana,apples,strawberry]
  console.log(item);
  let newFilterItems = itemsFromLocalStorage.filter((i) => i !== item);
  console.log(newFilterItems);
  localStorage.setItem("items", JSON.stringify(newFilterItems));
}

function ItemEdit(item) {
  isEditMode = true;
  // item.style.color = "red"
  itemInput.value = item.textContent.toString().trim();
  itemList.querySelectorAll("li").forEach((i) => i.classList.remove("edit"));
  item.classList.add("edit");
  addBtn.innerHTML = ' <i class="fa-solid fa-pen"></i> Update Item';
  addBtn.style.backgroundColor = "green";
}

function clearAllItem() {
  itemList.innerHTML = "";
  localStorage.removeItem("items"); // filter.remove();
  // clearAll.remove()
  checkPage();
}

function checkPage() {
  const items = document.querySelectorAll("li");
  // console.log(items)
  if (items.length === 0) {
    filter.style.display = "none";
    clearAll.style.display = "none";
  } else {
    filter.style.display = "block";
    clearAll.style.display = "block";
  }
  addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  // console.log(isEditMode)
  addBtn.style.backgroundColor = "black";
}

function filterItems(e) {
  const value = e.target.value.toLowerCase(); //ApPle apple
  console.log(value);
  const items = document.querySelectorAll("li");
  items.forEach((item) => {
    console.log(item.firstChild.textContent.toLowerCase());
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(value) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function addItemtoStorage(item) {
  let itemsFromLocalStorage = getItemsFromLocalStorage();
  itemsFromLocalStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromLocalStorage));
  // console.log(itemsFromLocalStorage)
}

function duplicateItem(item) {
  let itemsFromLocalStorage = getItemsFromLocalStorage();
  // console.log(`duplicate function ${itemsFromLocalStorage}`)
  if (itemsFromLocalStorage.includes(item)) {
    console.log("true");
    return true;
  } else {
    console.log("false");
    return false;
  }
}
// duplicateItem("banana")

function getItemsFromLocalStorage() {
  let itemsFromLocalStorage = localStorage.getItem("items");
  console.log(typeof itemsFromLocalStorage);
  if (itemsFromLocalStorage === null) {
    itemsFromLocalStorage = []; //empty array
    console.log("no");
  } else {
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));
    console.log(itemsFromLocalStorage);
    console.log(typeof itemsFromLocalStorage);
  }
  return itemsFromLocalStorage;
}

function displayonDOM() {
  // let itemsFromLocalStorage = localStorage.getItem('items')
  // if (itemsFromLocalStorage === null) {
  //     itemsFromLocalStorage = [] //empty array
  // }
  // else {
  //     itemsFromLocalStorage = JSON.parse(localStorage.getItem('items'))
  //     console.log(itemsFromLocalStorage)
  // }
  const itemsFromLocalStorage = getItemsFromLocalStorage();
  //banana,milk
  itemsFromLocalStorage.forEach((item) => {
    DOMmaItemadd(item);
  });
}
displayonDOM();
// addItemtoStorage("hello")
// addItemtoStorage("orange")
// addItemtoStorage("milk")

// addItem()
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", onClickItem);
clearAll.addEventListener("click", clearAllItem);
filter.addEventListener("input", filterItems);

checkPage();
