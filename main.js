let deleteButton = document.getElementById("removeItem");
let addButton = document.getElementById("addItem")
let listOfToDos = document.getElementById("toDoList");
let writeSomething = document.getElementById("noOutput");
let list = JSON.parse(localStorage.getItem('list')) || [];
document.body.style.backgroundColor = "black";
document.body.style.color = "white";

function getApi(){
    let list = [];

    axios.get("https://jsonplaceholder.typicode.com/todos")
        .then(response => {
            const responseData = response.data;
            for (let i = 0; i < 5; i++) {
            let inputId = Math.floor(Math.random() * 100);    
            let objectOfStuff = {text: responseData[i].title, id: inputId}
            list.push(objectOfStuff);
            }
            localStorage.setItem("list", JSON.stringify(list))
        })
}

function showOutput (list) {
  listOfToDos.innerHTML = "";
  list.map(({text, id}) => {
    let li = document.createElement("li");
    let deleteCheck = document.createElement("input");
    deleteCheck.type = "checkbox";
    deleteCheck.className = "delete-box";
    li.setAttribute("id", id);
    li.className = "item";
    li.appendChild(document.createTextNode(text));
    li.appendChild(deleteCheck);
    listOfToDos.appendChild(li);
  })
}

showOutput(list);

addButton.addEventListener("click", addItem);
function addItem() {
  let userInputValue = document.getElementById("toDoInput").value;
  let inputId = Math.floor(Math.random() * 100);

  if (userInputValue === "") {
    writeSomething.innerHTML = "You must enter something.";
    writeSomething.style.color = "red"
    return false;
  } else {//pushing to localstorage
    let objectOflist = {text: userInputValue, id: inputId}
    list.push(objectOflist);
    //getApi()
    localStorage.setItem("list", JSON.stringify(list));
    writeSomething.innerHTML = "";
    }

  showOutput(list, userInputValue);
  document.getElementById("toDoInput").value = "";
}

deleteButton.addEventListener("click", deleteItem)
function deleteItem() {
  let checkboxes = document.getElementsByClassName("delete-box");
  let items = document.getElementsByClassName("item");

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxes[i].parentNode.removeChild(checkboxes[i]);
      items[i].parentNode.removeChild(items[i]);
      list.splice([i], 1);
      localStorage.setItem("list", JSON.stringify(list));//
      writeSomething.innerHTML = "";
    } else {
      writeSomething.innerHTML = "Pick something to delete."
      writeSomething.style.color = "red"
    }
  }
}
getApi();
