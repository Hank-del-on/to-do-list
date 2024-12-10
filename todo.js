const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#user-input");
const taskContainer = document.querySelector("#list-container");

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Load tasks from local storage

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  const newTask = {
    timeStamp: new Date().toLocaleString("en-UK"),
    description: formData.get("user-input"),
    completed: false,
  };
  tasks.push(newTask);
  renderList(tasks);
  saveStateToLocalStorage();
  taskForm.reset();
});

function renderList(taskArr) {
  taskContainer.innerHTML = ""; // Clear the container
  taskArr.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task-container");

    const timeStampElem = document.createElement("p");
    timeStampElem.classList.add("timestamp");
    timeStampElem.textContent = task.timeStamp;

    const descriptionElem = document.createElement("p");
    descriptionElem.classList.add("description");
    descriptionElem.textContent = task.description;

    const completedElem = document.createElement("input");
    completedElem.type = "checkbox";
    completedElem.checked = task.completed;
    completedElem.addEventListener("change", () => {
      task.completed = completedElem.checked; // Update the task's completion status
      saveStateToLocalStorage();
      renderList(tasks); // Re-render the list to show updated state
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
      const newDescription = prompt("Edit task:", task.description);
      if (newDescription) {
        task.description = newDescription;
        saveStateToLocalStorage();
        renderList(tasks); // Re-render the list to show updated task
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1); // Remove the task from the array
      saveStateToLocalStorage();
      renderList(tasks); // Re-render the list
    });

    taskElement.append(
      timeStampElem,
      descriptionElem,
      completedElem,
      editButton,
      deleteButton
    );
    taskContainer.prepend(taskElement);
  });
}

function saveStateToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Store tasks in local storage
}

// Initial render of tasks from local storage
renderList(tasks);
