// Récupère les éléments du DOM
const saveButton = document.getElementById('saveButton');
const checklistForm = document.getElementById('checklist');
const statusDiv = document.getElementById('status');

// Ajoute un gestionnaire d'événement pour le clic sur le bouton "Sauvegarder"
saveButton.addEventListener('click', function () {
    // Récupère l'état des éléments de la classe "to-save" et les stocke dans le Web Storage
    const savedData = {};
    const elementsToSave = checklistForm.querySelectorAll('.to-save');
    
    elementsToSave.forEach(function (element) {
        if (element.type === 'checkbox') {
            savedData[element.id] = element.checked;
        } else {
            savedData[element.id] = element.value;
        }
    });
    
    localStorage.setItem('savedData', JSON.stringify(savedData));

    // Affiche un message de confirmation
    statusDiv.textContent = 'Les données ont été sauvegardées !';

    // Efface le texte après 3 secondes
    setTimeout(function () {
        statusDiv.textContent = '';
    }, 3000);
});

// Charge l'état sauvegardé lors du chargement de la page
window.addEventListener('load', function () {
    const savedData = localStorage.getItem('savedData');
    
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        const elementsToRestore = checklistForm.querySelectorAll('.to-save');
        
        elementsToRestore.forEach(function (element) {
            if (element.type === 'checkbox') {
                element.checked = parsedData[element.id] || false;
            } else {
                element.value = parsedData[element.id] || '';
            }
        });
    }
});