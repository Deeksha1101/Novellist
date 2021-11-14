let globalTaskData = [];
taskContents = document.getElementById("taskContents");

const addCard = () => {
  const newTaskDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("imageURL").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("taskDescription").value,
  };

  taskContents.insertAdjacentHTML(
    "beforeend",
    generateTaskCard(newTaskDetails)
  ); // we can also use append

  globalTaskData.push(newTaskDetails);
  savaToLocalStorage();
};

const generateTaskCard = ({
  id,
  key,
  url,
  title,
  type,
  description,
}) => ` <div class="col-md-6 col-lg-4 mt-3 my-4 g-3" id=${id} key=${key}>
            <div class="card bg-dark text-white">
              <div class="card-header">
                <div class="card-header d-flex justify-content-end">
                  <button type="button" class="btn btn-outline-info mx-2" name=${id} onclick="editTask(this)">
                    <i class="fas fa-pencil-alt" name=${id}"></i>
                  </button>
                  <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
                    <i class="fas fa-trash-alt" name=${id})"></i>
                  </button>
                </div>
              </div>

              <img
            style="width: 175px; height: 275px; align-self: center;"
                src=${url}
                alt="cardPhoto"
                class="card-img-top"
              />
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>

                <span class="badge bg-success">${type}</span>
              </div>

              <div class="card-footer">
                <button class="btn btn-outline-primary float-end" name=${id}>
                 SAVED
                </button>
              </div>
            </div>
          </div>`;

// to save data in local storage
const savaToLocalStorage = () => {
  localStorage.setItem("tasky", JSON.stringify({ tasks: globalTaskData }));
};

// to retrieve data
const reloadTaskCard = () => {
  const localStorageCopy = JSON.parse(localStorage.getItem("tasky"));

  if (localStorageCopy) {
    globalTaskData = localStorageCopy["tasks"];
  }

  // we can also use e instead of cardData
  globalTaskData.map((cardData) => {
    taskContents.insertAdjacentHTML("beforeend", generateTaskCard(cardData)); // this line is responsible for showing the data in frontend
  });
};

const editTask = (e) => {
  // const targetID = e.getAttribute("name");

  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute(
    "contenteditable",
    "true"
  );

  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1]);
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute(
    "contenteditable",
    "true"
  );
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute(
    "contenteditable",
    "true"
  );

  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute(
    "onclick",
    "saveEditTask(this)"
  );
  // savaToLocalStorage();
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML =
    "Save Changes";

  // window.location.reload();
};

const saveEditTask = (e) => {
  const targetID = e.getAttribute("name");
  console.log(targetID);

  const updatedData = {
    title: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
    type: e.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML,
    description: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML,
  };

  const updateGlobalTasks = globalTaskData.map((task) => {
    if (task.id === targetID) {
      return { ...task, ...updatedData };
    }
    return task;
  });

  globalTaskData = updateGlobalTasks;

  savaToLocalStorage();
  // console.log(e.parentNode.parentNode.childNodes[5].childNodes[1]);
  e.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute(
    "contenteditable",
    "false"
  );
  e.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute(
    "contenteditable",
    "false"
  );
  e.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute(
    "contenteditable",
    "false"
  );
  e.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVED";
  savaToLocalStorage();
};

const deleteTask = (e) => {
  console.log(e);
  const targetID = e.getAttribute("name");
  console.log(targetID);

  globalTaskData = globalTaskData.filter(
    (cardData) => cardData.id !== targetID
  );
  savaToLocalStorage();
  window.location.reload();
};
