export const createPopup = (img, name, type, breed, description, age, inoculations, diseases, parasites) => {
  const popup = document.querySelector('.pop-message-wrapper');

  popup.innerHTML = '';

  popup.insertAdjacentHTML('beforeend', `
        <img class="pop-image" src="${img}" alt="${name}" width="500" height="500">
        <div class="pop-info">
            <h4 class="pop-pet-name">${name}</h4>
            <span class="pop-pet-type">${type} - ${breed}</span>
            <p class="pop-pet-description">${description}</p>
            <ul class="pop-pet-add">
                <li class="pop-pet-add-text">
                    <span class="text-headling">Age:</span> <span class="text-value">${age}</span>
                </li>
                <li class="pop-pet-add-text">
                    <span class="text-headling">Inoculations:</span> <span class="text-value">${[...inoculations]}</span>
                </li>
                <li class="pop-pet-add-text">
                    <span class="text-headling">Diseases:</span> <span class="text-value">${[...diseases]}</span>
                </li>
                <li class="pop-pet-add-text">
                    <span class="text-headling">Parasites:</span> <span class="text-value">${[...parasites]}</span>
                </li>
          </ul>
  `);
};