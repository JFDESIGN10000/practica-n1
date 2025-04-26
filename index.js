$(document).ready(function() {
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    $('#task-list').empty();
    tasks.forEach((task, index) => {
      const taskElement = createTaskElement(task, index);
      $('#task-list').append(taskElement);
    });
  }

  function createTaskElement(task, index) {
    const taskElement = $('<li></li>');
    if (task.completed) {
      taskElement.addClass('completed');
    }
    taskElement.html(`
      <span>${task.text}</span>
      <div>
        <button class="complete-btn" data-index="${index}">✔</button>
        <button class="delete-btn" data-index="${index}">✖</button>
      </div>
    `);
    return taskElement;
  }

  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  $('#add-task-btn').click(function() {
    const taskText = $('#task-input').val();
    if (taskText.trim()) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push({ text: taskText, completed: false });
      saveTasks(tasks);
      loadTasks();
      $('#task-input').val('');
    }
  });

  $(document).on('click', '.complete-btn', function() {
    const index = $(this).data('index');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadTasks();
  });

  $(document).on('click', '.delete-btn', function() {
    const index = $(this).data('index');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
  });

  loadTasks();
});
