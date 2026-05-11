let tasks = [
    { id: 1, text: 'Погасить кредит', isCompleted: false, dueDate: '2026-05-01' },
    { id: 2, text: 'Отложить деньги', isCompleted: false, dueDate: '2026-05-10' },
    { id: 3, text: 'Спланировать расходы на следующую неделю', isCompleted: false, dueDate: '2026-05-05' },
    { id: 4, text: 'Обновить инвестиционный портфель', isCompleted: true, dueDate: '2026-04-20' }, 
    { id: 5, text: 'Отправлять отчеты о расходах', isCompleted: false, dueDate: '2026-04-25' } 
];
const taskListEl = document.querySelector('.task-list');
const tabs = document.querySelectorAll('.tabs-navigation .tab');
const completedCountEl = document.getElementById('completedCount');
const pendingCountEl = document.getElementById('pendingCount');
const overdueCountEl = document.getElementById('overdueCount');
const currentViewTitleEl = document.getElementById('currentViewTitle');

let currentFilter = 'pending'; 

function updateStats() {
    const now = new Date();
    now.setHours(0, 0, 0, 0); 

    const completedTasks = tasks.filter(task => task.isCompleted);
    const pendingTasks = tasks.filter(task => !task.isCompleted && new Date(task.dueDate) > now);
    const overdueTasks = tasks.filter(task => !task.isCompleted && new Date(task.dueDate) <= now);

    completedCountEl.textContent = completedTasks.length;
    pendingCountEl.textContent = pendingTasks.length;
    overdueCountEl.textContent = overdueTasks.length;

    document.getElementById('pendingTab').textContent = `Pending (${pendingTasks.length + overdueTasks.length})`;
    document.getElementById('completedTab').textContent = `Completed (${completedTasks.length})`;
    document.getElementById('allTab').textContent = `All (${tasks.length})`;
}


function renderTasks() {
    taskListEl.innerHTML = ''; 
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'completed') return task.isCompleted;
        if (currentFilter === 'pending') return !task.isCompleted; 
        return false;
    });

    currentViewTitleEl.textContent = currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        if (task.isCompleted) {
            taskItem.classList.add('completed-task');
        } else if (new Date(task.dueDate) <= now) {
            taskItem.classList.add('overdue-task');
        }
        taskItem.innerHTML = `
        <input type="checkbox" data-id="${task.id}" ${task.isCompleted ? 'checked' : ''}>
        <span class="task-name">${task.text}</span> 
    `;
        taskListEl.appendChild(taskItem);
    });

 
    taskListEl.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });
}

function handleCheckboxChange(event) {
    const taskId = parseInt(event.target.dataset.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.isCompleted = event.target.checked;
    }
    renderTasks(); 
    updateStats(); 
}
function handleTabClick(event) {
    tabs.forEach(tab => tab.classList.remove('active')); 
    event.target.classList.add('active');
    currentFilter = event.target.dataset.filter;
    renderTasks();
    updateStats(); 
}


document.addEventListener('DOMContentLoaded', () => {

    tabs.forEach(tab => {
        tab.addEventListener('click', handleTabClick);
    });

    renderTasks();
    updateStats();
});

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  
  function addNewTaskFromPopup() {
      const textInput = document.getElementById("taskTextInput");
      const dateInput = document.getElementById("taskDateInput");
      
      const text = textInput.value.trim();
      const date = dateInput.value;
  
      if (text === "") {
          alert("Please enter a task description");
          return;
      }
  
      const newTask = {
          id: Date.now(),
          text: text,
          isCompleted: false,
          dueDate: date || null
      };
  
      tasks.push(newTask);
 
      localStorage.setItem('tasks', JSON.stringify(tasks));
  
      textInput.value = "";
      dateInput.value = "";
      closeForm();
  
      renderTasks();
      updateStats();
  }
  const searchInput = document.querySelector('#task-search');

searchInput.addEventListener('keyup', () => {
  
    let filter = searchInput.value.toLowerCase();
 
    let tasks = document.querySelectorAll('.task-item');

    tasks.forEach(task => {
   
        let taskText = task.querySelector('.task-name').textContent.toLowerCase();

        if (taskText.includes(filter)) {
    
            task.classList.remove('is-hidden');
        } else {
        
            task.classList.add('is-hidden');
        }
    });
});

let isSortedAscending = true; 

function sortTasksAlphabetically() {
    tasks.sort((a, b) => {
        const textA = a.text.toLowerCase();
        const textB = b.text.toLowerCase();

        if (isSortedAscending) {
          
            if (textA < textB) return -1;
            if (textA > textB) return 1;
        } else {
        
            if (textA > textB) return -1;
            if (textA < textB) return 1;
        }
        return 0; 
    });
    isSortedAscending = !isSortedAscending;
    renderTasks();
}
   