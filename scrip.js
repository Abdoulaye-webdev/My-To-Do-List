document.getElementById("add-btn").addEventListener("click", function() {
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
    
});
