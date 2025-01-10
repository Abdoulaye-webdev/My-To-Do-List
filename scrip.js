/*document.getElementById("add-btn").addEventListener("click", function() {
    const taskInput = document.getElementById("task-input");
    const taskValue = taskInput.value;
    const deleteButton = document.getElementById('deleteButton');
    const content = document.getElementById('content');
    const bouton = document.getElementById("supprimer");

    
    if (taskValue.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = taskValue;
        document.getElementById("task-list").appendChild(li);
        taskInput.value = "";
               

        function supprimerElement() {
            // Supprimer l'élément parent du bouton
            bouton.parentElement.remove();
        }
    }
    document.getElementById("add-btn").addEventListener("click", function() {
        const taskInput = document.getElementById("task-input");
        const taskValue = taskInput.value;
        const taskList = document.getElementById("task-list");
    
        // Vérifier si la valeur de l'entrée n'est pas vide
        if (taskValue.trim() !== "") {
            // Créer un nouvel élément de liste <li>
            const li = document.createElement("li");
            li.textContent = taskValue;
    
            // Créer un bouton de suppression
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Supprimer";
            deleteButton.classList.add("delete-btn");
            
        }
    });



});*/

document.getElementById('add-btn').addEventListener('click', function() {
    // Récupérer les informations des champs
    const taskInput = document.getElementById('task-input');
    const dueDate = document.getElementById('dueDate').value;
    const taskPriority = document.getElementById('taskpriorite').value;
    
    // Vérifier si le champ de tâche est vide
    if (taskInput.value.trim() === '') {
        alert('Veuillez entrer une tâche');
        return;
    }

    // Créer un nouvel élément de tâche
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');

    // Créer un contenu pour la tâche
    const taskContent = document.createElement('span');
    taskContent.textContent = taskInput.value + ' - ' + dueDate + ' - ' + taskPriority;
    
    // Créer un bouton Modifier
    const editButton = document.createElement('button');
    editButton.textContent = 'Modifier';
    editButton.addEventListener('click', function() {
        // Permet de modifier la tâche
        const newTask = prompt('Modifier la tâche:', taskInput.value);
        if (newTask !== null) {
            taskContent.textContent = newTask + ' - ' + dueDate + ' - ' + taskPriority;
        }
    });

    // Créer un bouton Supprimer
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', function() {
        // Supprimer la tâche
        taskItem.remove();
    });

    // Ajouter les boutons et le contenu à la tâche
    taskItem.appendChild(taskContent);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Ajouter la tâche à la liste
    document.getElementById('task-list').appendChild(taskItem);
    if (taskInput.value.trim() === '') {
        alert('Veuillez entrer une tâche');
        return;
    }


    // Effacer l'input de la tâche après ajout
    taskInput.value = '';

    const taskCategory = document.getElementById('taskCategory').value;

});

const searchInput = document.getElementById('search-input');

// Applique le filtre initial dès le chargement de la page
filterTasks(searchInput.value.toLowerCase());

// Ajoute un écouteur d'événements sur le champ de recherche
searchInput.addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    filterTasks(filter);
});

// Fonction pour filtrer les tâches
function filterTasks(filter) {
    // Récupère tous les éléments 'li' dans la liste des tâches
    const tasks = document.getElementById('task-list').getElementsByTagName('li');

    // Convertit la collection HTML en tableau pour pouvoir itérer dessus
    Array.from(tasks).forEach(function(task) {
        const taskText = task.textContent.toLowerCase();
        
        // Si le texte de la tâche contient le filtre, on l'affiche, sinon on le cache
        if (taskText.includes(filter)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

document.getElementById('add-task').addEventListener('click', function() {
    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('due-date').value;
    const category = document.getElementById('category').value;
    const priority = document.getElementById('priority').value;

    // Vérifier que le nom de la tâche et la date limite sont renseignés
    if (!taskName || !dueDate) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }

    // Créer un élément de liste pour la tâche
    const taskItem = document.createElement('li');

    // Créer un élément pour le nom de la tâche
    const taskNameElem = document.createElement('strong');
    taskNameElem.textContent = taskName;
    
    // Créer un élément pour la date limite
    const dueDateElem = document.createElement('span');
    dueDateElem.textContent = ` (Date limite: ${new Date(dueDate).toLocaleDateString()})`;
    dueDateElem.style.fontStyle = 'italic';

    // Créer un élément pour la catégorie
    const categoryElem = document.createElement('span');
    categoryElem.textContent = ` [Catégorie: ${category}]`;
    categoryElem.style.fontWeight = 'bold';

    // Créer un élément pour la priorité
    const priorityElem = document.createElement('span');
    priorityElem.textContent = ` - Priorité: ${capitalizeFirstLetter(priority)}`;
    priorityElem.style.fontWeight = 'bold';

    // Appliquer une classe pour la priorité
    taskItem.classList.add(`priority-${priority}`);

    // Ajouter les éléments créés à l'élément de la tâche
    taskItem.appendChild(taskNameElem);
    taskItem.appendChild(dueDateElem);
    taskItem.appendChild(categoryElem);
    taskItem.appendChild(priorityElem);

    // Ajouter la tâche à la liste
    document.getElementById('task-list').appendChild(taskItem);

    // Réinitialiser les champs du formulaire
    document.getElementById('task-name').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('category').value = '';
    document.getElementById('priority').value = 'low';
});

// Fonction pour capitaliser la première lettre de la priorité
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function resetTasks() {
    localStorage.removeItem('tasks');
    loadTasks(); // Recharger la liste vide
}

// Initialiser l'application
const resetBtn = document.getElementById('reset-btn');
addTaskBtn.addEventListener('click', addTask);
searchInput.addEventListener('input', filterTasks);
filterCompletedBtn.addEventListener('click', filterCompletedTasks);
filterInProgressBtn.addEventListener('click', filterInProgressTasks);
resetBtn.addEventListener('click', resetTasks);

// Charger les tâches sauvegardées au démarrage
document.addEventListener('DOMContentLoaded', loadTasks);


/*let tasks = []; // Stocker toutes les tâches
let filteredTasks = []; // Tâches filtrées pour affichage
let taskList = document.getElementById('task-list');

// Fonction pour ajouter une tâche
document.getElementById('add-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const dueDate = document.getElementById('dueDate').value;
    const taskPriority = document.getElementById('taskpriorite').value;
    const taskCategory = document.getElementById('taskCategory').value;

    if (taskInput.value.trim() === '') {
        alert('Veuillez entrer une tâche');
        return;
    }

    const task = {
        id: Date.now(),
        name: taskInput.value,
        dueDate: dueDate,
        priority: taskPriority,
        category: taskCategory,
        status: 'in-progress', // par défaut
    };

    tasks.push(task);
    filteredTasks = [...tasks]; // Réinitialiser les tâches filtrées
    saveToLocalStorage(); // Sauvegarder les tâches localement
    displayTasks(filteredTasks);
    taskInput.value = ''; // Réinitialiser le champ de saisie
});

// Fonction pour afficher les tâches
function displayTasks(tasksToDisplay) {
    taskList.innerHTML = ''; // Vider la liste existante
    tasksToDisplay.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.name} - ${task.dueDate} - ${task.priority} - ${task.category}
            <button onclick="toggleStatus(${task.id})">${task.status === 'in-progress' ? 'Compléter' : 'Réactiver'}</button>
            <button onclick="deleteTask(${task.id})">Supprimer</button>
        `;
        taskList.appendChild(li);
    });
}

// Fonction pour changer le statut de la tâche
function toggleStatus(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.status = task.status === 'in-progress' ? 'completed' : 'in-progress';
    saveToLocalStorage();
    displayTasks(filteredTasks);
}

// Fonction pour supprimer une tâche
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveToLocalStorage();
    displayTasks(filteredTasks);
}

// Fonction pour sauvegarder les tâches dans le LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fonction pour charger les tâches depuis le LocalStorage
function loadFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        tasks = savedTasks;
        filteredTasks = [...tasks];
        displayTasks(filteredTasks);
    }
}

// Filtrer les tâches par mot-clé
function filterTasks() {
    const keyword = document.getElementById('search-input').value.toLowerCase();
    filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(keyword));
    displayTasks(filteredTasks);
}

// Trier les tâches par date ou priorité
function sortTasks() {
    const sortBy = document.getElementById('sort-select').value;
    if (sortBy === 'date') {
        filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === 'priority') {
        const priorityOrder = { 'Basse': 1, 'Moyenne': 2, 'Haute': 3 };
        filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    displayTasks(filteredTasks);
}

// Filtrer par statut (complétées ou en cours)
function filterByStatus(status) {
    if (status === 'completed') {
        filteredTasks = tasks.filter(task => task.status === 'completed');
    } else if (status === 'in-progress') {
        filteredTasks = tasks.filter(task => task.status === 'in-progress');
    }
    displayTasks(filteredTasks);
}

// Afficher toutes les tâches
function showAllTasks() {
    filteredTasks = [...tasks];
    displayTasks(filteredTasks);
}

// Charger les tâches depuis le LocalStorage au démarrage
window.onload = loadFromLocalStorage;*/

