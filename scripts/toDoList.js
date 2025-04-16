const input = document.getElementById("taskInput");
const addButton = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", function () {
  const taskText = input.value.trim();

  if (taskText !== "") {
    const li = document.createElement("li");
    li.textContent = taskText;

    taskList.appendChild(li);
    input.value = "";

    li.addEventListener("click", function () {
      li.classList.toggle("completed");
    });
  }
});
