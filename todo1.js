const todoList = []; //creating an empty array

const todolistelement = document.querySelector("#todo-list-ul");
//assigning unordered list to todolistelement
//querySelector is used to bring html to js

class addtodo {
  deleteitem(delid) {
    const deleteindex = todoList.findIndex((item) => item.id == delid);
    todoList.splice(deleteindex, 1);
    this.displaytodos();
  }

  displaytodos() {
    todolistelement.innerHTML = ""; //this line is used to show result in html page
    document.querySelector("#todo-input").value = ""; //here we set out input as empty after clicking add button
    //render list items inside the ul tag
    todoList.forEach((item) => {
      const listelement = document.createElement("li");
      listelement.innerHTML = item.todotext;

      //to add delete button
      const delbtn = document.createElement("i");
      delbtn.setAttribute("data-id", item.id);
      delbtn.classList.add("fa");
      delbtn.classList.add("fa-trash-o");

      if (item.done) {
        listelement.setAttribute("class", "checked");
      }
      listelement.setAttribute("data-id", item.id);

      //add Event to list items
      listelement.addEventListener("click", function (e) {
        const selectedid = e.target.getAttribute("data-id");
        addtodoobj.donetodo(selectedid);
      });
      delbtn.addEventListener("click", function (e) {
        const delid = e.target.getAttribute("data-id");
        addtodoobj.deleteitem(delid);
      });
      todolistelement.appendChild(listelement);
      listelement.appendChild(delbtn);
    });
  }

  addtodom() {
    const todotext = document.querySelector("#todo-input").value; //here we are getting input from text box and storing in todotext

    if (todotext == "") {
      //if iput in empty then it will return ntng
      return;
    } else {
      let todoobject = {
        //here we create an object to store  all the values in input box and id
        id: todoList.length + 1,
        todotext: todotext,
        done: false,
      };
      todoList.unshift(todoobject); //unshift is used take the latest input in top of list
    }
    this.displaytodos();
  }

  deleteitem(delid) {
    const deleteindex = todoList.findIndex((item) => item.id == delid);
    todoList.splice(deleteindex, 1);
    this.displaytodos();
  }

  donetodo(selectedid) {
    const selectedidindex = todoList.findIndex((item) => item.id == selectedid);
    //console.log(todoList[selectedidindex]);
    if (selectedidindex == -1) {
      return;
    } else {
      todoList[selectedidindex].done
        ? (todoList[selectedidindex].done = false)
        : (todoList[selectedidindex].done = true);
      // console.log(todoList[selectedidindex]);
      this.displaytodos();
    }
  }
}
let addtodoobj = new addtodo();
//document.querySelector("#add_button").addEventListener("click", addtodoobj.addtodom()); //to button add and click on add button it will do addtodo function operations .

function keypresstodoTextHandler(e) {
  if (e.keyCode == 13) {
    //e is event object
    // console.log(e);
    addtodoobj.addtodom();
  }
}
