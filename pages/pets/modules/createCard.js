export const createCard = (id, img, name) => {
  const card = document.createElement('div');
  card.classList.add('slide');
  card.setAttribute('data-pets', id);

  card.innerHTML = `
        <div class="slide-img" style="background-image: url('${img}')"></div>
        <span class="slide-name">${name}</span>
        <button class="btn-slide" data-pets-id="${id}">Learn more</button>
    `;
  return card;
};