 var firebaseConfig = {
    apiKey: "AIzaSyDYZpQ0scI1r0kq7jiU0RjpwGUVk6-Slv0",
    authDomain: "assighnent22.firebaseapp.com",
    databaseURL: "https://assighnent22-default-rtdb.firebaseio.com",
    
    projectId: "assighnent22",
    storageBucket: "assighnent22.appspot.com",
    messagingSenderId: "262914163052",
    appId: "1:262914163052:web:3cd8263dd702cc33923349",
    measurementId: "G-39FVCFPFVL"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
  // var auth = getAnalytics(app);
//   Initialize Firebase
//   var app = firebase.initializeApp(firebaseConfig);
  
// Function to create and update the image element
// function updateImageElement(imageUrl) {
//   var imgElement = document.createElement("img");
//   imgElement.style.width = "50px";
//   imgElement.src = imageUrl;
//   return imgElement;
// }

imageUrlInput.addEventListener("input", function() {
  var imageUrl = imageUrlInput.value.trim();
  var imgElement = document.getElementById("dynamicImage");

  if (imageUrl) {
      // Update the image element if URL is provided
      if (!imgElement) {
          // If image element doesn't exist, create it
          imgElement = updateImageElement(imageUrl);
          imgElement.id = "dynamicImage";
          document.body.appendChild(imgElement); // Append to body or wherever needed
      } else {
          // If image element exists, update its source
          imgElement.src = imageUrl;
      }
  } else {
      // If input is empty, remove the image element
      if (imgElement) {
          imgElement.remove();
      }
  }
});

firebase
  .database()
  .ref("todos")
  .on("child_added", function(data) {
    var list = document.getElementById("list");

    var liElement = document.createElement("li");
var imageUrl = data.val().imageUrl;
var imgElement = null;
    // Append the image element if URL is provided
    
    if (imageUrl) {
      imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.style.width = "50px";
      imgElement.style.height = "50px";
      liElement.appendChild(imgElement);
  }
    // Append the image element (already created above)
    liElement.appendChild(imgElement);

    var liText = document.createTextNode(data.val().todoValue);
    liElement.appendChild(liText);

    list.style.margin = "auto";
    list.style.width = "25%";
    list.style.fontSize = "18px";
    list.style.backgroundColor = "black";
    list.style.color = "white";
    list.appendChild(liElement);

    var delBtnELement = document.createElement("button");
    var delBtnText = document.createTextNode("delete");
    delBtnELement.appendChild(delBtnText);
    liElement.appendChild(delBtnELement);
    delBtnELement.style.backgroundColor = "blue";
    delBtnELement.style.color = "white";
    delBtnELement.setAttribute("onclick", "deleteItem(this)");
    delBtnELement.setAttribute("id", data.val().key);

    // Edit button creation
    var EditBtnELement = document.createElement("button");
    var EditBtnText = document.createTextNode("edit");
    EditBtnELement.appendChild(EditBtnText);
    liElement.appendChild(EditBtnELement);
    EditBtnELement.setAttribute("class", "editBtn");
    EditBtnELement.style.backgroundColor = "green";
    EditBtnELement.style.color = "white";
    EditBtnELement.setAttribute("id", data.val().key);
    EditBtnELement.setAttribute("onclick", "editItem(this)");
  });


    function addTodo() {
    var input = document.getElementById("todoInput");
    var imageUrlInput = document.getElementById("imageUrlInput");

    var id = Date.now().toString(31);
  
    var obj = {
      key: id,
      todoValue: input.value,
      imageUrl: imageUrlInput.value || null// Store image URL in the database
    };
  
    console.log(obj);
  
    firebase
      .database()
      .ref("todos/" + id)
      .set(obj);
  }
  
  function delteAll() {
    firebase.database().ref("todos").remove();
    var list = document.getElementById("list");
    list.innerHTML = "";
  }
  
  function deleteItem(e) {
    firebase
      .database()
      .ref("todos/" + e.id)
      .remove();
    e.parentNode.remove();
  }
  
  function editItem(e) {
    // var ValId = faraz.id;
    var updateValue = prompt("Enter updated value..");
  
    firebase
      .database()
      .ref("todos/" + e.id//ValId

      )
      .set({
        key: e.id,
        todoValue: updateValue,
      });
  
    e.parentNode.firstChild.nodeValue = updateValue;
  }


    function addTodo() {
      var input = document.getElementById("todoInput");
      var imageUrlInput = document.getElementById("imageUrlInput");

      var id = Date.now().toString(31);

      var obj = {
        key: id,
        todoValue: input.value,
        imageUrl: imageUrlInput.value || null
      };

      firebase
        .database()
        .ref("todos/" + id)
        .set(obj);
    }

    function delteAll() {
      firebase.database().ref("todos").remove();
      var list = document.getElementById("list");
      list.innerHTML = "";
    }

    firebase
      .database()
      .ref("todos")
      .on("child_added", function(data) {
        var list = document.getElementById("list");

        var liElement = document.createElement("li");

        var imageUrl = data.val().imageUrl;
        var imgElement = null;

        if (imageUrl) {
          imgElement = document.createElement("img");
          imgElement.src = imageUrl;
          imgElement.style.width = "50px";
          imgElement.style.height = "50px";
          liElement.appendChild(imgElement);
        }

        var liText = document.createTextNode(data.val().todoValue);
        liElement.appendChild(liText);

        list.style.margin = "auto";
        list.style.width = "25%";
        list.style.fontSize = "18px";
        list.style.backgroundColor = "black";
        list.style.color = "white";
        list.appendChild(liElement);

        var delBtnELement = document.createElement("button");
        var delBtnText = document.createTextNode("delete");
        delBtnELement.appendChild(delBtnText);
        liElement.appendChild(delBtnELement);
        delBtnELement.style.backgroundColor = "blue";
        delBtnELement.style.color = "white";
        delBtnELement.setAttribute("onclick", "deleteItem(this)");
        delBtnELement.setAttribute("id", data.val().key);

        // Edit button creation
        var EditBtnELement = document.createElement("button");
        var EditBtnText = document.createTextNode("edit");
        EditBtnELement.appendChild(EditBtnText);
        liElement.appendChild(EditBtnELement);
        EditBtnELement.setAttribute("class", "editBtn");
        EditBtnELement.style.backgroundColor = "green";
        EditBtnELement.style.color = "white";
        EditBtnELement.setAttribute("id", data.val().key);
        EditBtnELement.setAttribute("onclick", "editItem(this)");
      });

    function deleteItem(e) {
      firebase
        .database()
        .ref("todos/" + e.id)
        .remove();
      e.parentNode.remove();
    }

    function editItem(e) {
      var updateValue = prompt("Enter updated value..");

      firebase
        .database()
        .ref("todos/" + e.id)
        .set({
          key: e.id,
          todoValue: updateValue,
          // imageUrl: e.parentNode.querySelector('img') ? e.parentNode.querySelector('img').src : null
        });

      e.parentNode.firstChild.nodeValue = updateValue;
    }



