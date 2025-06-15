document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false = don't save again
        });
    }

    // Add a task to the list and optionally save it to localStorage
    function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // When remove is clicked:
        removeBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            removeFromStorage(taskText);
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to localStorage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Remove a task from localStorage
    function removeFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Handle button click
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (!taskText) {
            alert('Please enter a Task');
            return;
        }
        addTask(taskText);
        taskInput.value = '';
    });

    // Handle Enter key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (!taskText) {
                alert('Please enter a Task');
                return;
            }
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Initial load of saved tasks
    loadTasks();
});
