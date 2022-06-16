import { getData } from './getData.js';
import { createPopup } from './createPopup.js';

const data = await getData();

const slidesPopUp = () => {

  const slider = document.querySelector('#slider');
  const modal = document.querySelector('#modal');
  const popMessage = document.querySelector('#pop-message');
  const btnClose = document.querySelector('.btn-close');
  const header = document.querySelector('.header');

  let disabled = false;

  function disabledScroll() {
    if (document.disabledScroll) return;

    const widthScroll = window.innerWidth - document.body.offsetWidth;  //ширина правого скролла
    disabled = true;

    document.body.style.cssText = `
                  overflow: hidden;
                  padding-right: ${widthScroll}px;
              `;
    header.style.cssText = `
                padding-right: ${widthScroll}px;
    `;
  }

  function enabledScroll() {
    disabled = false;
    document.body.style.cssText = '';
    header.style.cssText = `
                padding-right: 0px;
    `;
  }

  slider.addEventListener('click', e => {
    if (e.target.closest('.slide')) {

      let currentId = e.target.closest('.slide').getAttribute('data-pets');
      let currentElem = data.findIndex(item => +item.id === +currentId);
      createPopup(data[currentElem].img, data[currentElem].name, data[currentElem].type, data[currentElem].breed, data[currentElem].description, data[currentElem].age, data[currentElem].inoculations, data[currentElem].diseases, data[currentElem].parasites);
      modal.classList.remove('hidden');
      popMessage.classList.remove('hidden');
      disabledScroll();
    }
  });

  btnClose.addEventListener('click', () => {
    modal.classList.add('hidden');
    popMessage.classList.add('hidden');
    enabledScroll();
  });

  modal.addEventListener('click', () => {
    modal.classList.add('hidden');
    popMessage.classList.add('hidden');
    enabledScroll();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modal.classList.add('hidden');
      popMessage.classList.add('hidden');
      enabledScroll();
    }
  })
};

export default slidesPopUp;