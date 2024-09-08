// Array to store tasks
let tasks = [];

// Function to show the relevant section based on button clicked
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
    
    // Update Task List and Delete Task messages after showing the section
    updateTaskMessages();
}

// Function to add a task to the tasks array
function addTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    
    if (taskTitle && taskDescription) {
        // Add new task to tasks array
        tasks.push({ title: taskTitle, description: taskDescription.split('\n') });  // Split description by new lines
        
        // Clear form input fields after adding task
        document.getElementById('taskForm').reset();
        
        // Update task display and messages
        updateTaskMessages();
    }
}

// Function to delete a task by its index
function deleteTask(index) {
    tasks.splice(index, 1); // Remove task from array by index
    updateTaskMessages();    // Update task list and messages
}

// Function to update task list and "NO TASK" messages in different sections
function updateTaskMessages() {
    const taskListElement = document.getElementById('taskList');
    const taskMessageElement = document.getElementById('taskMessage');
    const deleteMessageElement = document.getElementById('deleteMessage');
    
    // Update Task List section
    if (tasks.length > 0) {
        // Clear the task list and hide the "NO TASK" message
        taskListElement.innerHTML = '';
        taskMessageElement.style.display = 'none';
        
        // Add each task to the task list with a delete button
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            
            // Create a span for the task title (bold and green)
            const titleSpan = document.createElement('span');
            titleSpan.classList.add('task-title');
            titleSpan.textContent = task.title;
            li.appendChild(titleSpan);
            
            // Add description as multiple rows (each new line becomes a new row)
            const ul = document.createElement('ul');
            task.description.forEach(desc => {
                const descLi = document.createElement('li');
                descLi.textContent = desc;
                ul.appendChild(descLi);
            });
            li.appendChild(ul);

            // Create a delete button for each task
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.marginLeft = '10px';
            deleteButton.onclick = () => deleteTask(index); // Attach delete function
            
            li.appendChild(deleteButton);
            taskListElement.appendChild(li);
        });
    } else {
        // Show the "NO TASK" message and clear task list when there are no tasks
        taskMessageElement.style.display = 'block';
        taskMessageElement.textContent = 'NO TASK';
        taskListElement.innerHTML = '';
    }
    
    // Update Delete Task section
    if (tasks.length === 0) {
        deleteMessageElement.textContent = 'NO TASK';
    } else {
        deleteMessageElement.textContent = 'Tasks available for deletion';
    }
}
