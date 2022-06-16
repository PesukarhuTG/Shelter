import { getData } from './getData.js';
import { createCard } from './createCard.js';
import slidesPopUp from './popUp.js';

const data = await getData();

let cardCounter = 6;
if (window.matchMedia("(max-width: 1279px)").matches) cardCounter = 8;
if (window.matchMedia("(max-width: 767px)").matches) cardCounter = 16;

const randomSort = (item) => {
  return item.sort(() => Math.random() - 0.5);
};

const staticSlider = () => {
  const slider = document.querySelector('.slider');
  const pagination = document.querySelector('.slider-pagination');
  const pageNumber = document.querySelector('.page-number');
  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');
  const btnStart = document.querySelector('.btn-start');
  const btnEnd = document.querySelector('.btn-end');

  slider.innerHTML = '';

  //создаем массив из 6 подмассивов по 8 элементов
  let array = [];
  for (let i = 0; i < 6; i++) {
    array.push(data);
  }

  //**чтобы была разная генерация массивов при загрузке страницы, т.к. через обычный random массивы идентичные выходят
  const generateRandomArrays = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (i % 1 === 0) {
        arr[i] = randomSort(arr[i]);
      } else if (i % 2 === 0) {
        arr[i] = randomSort(arr[i]);
      } else if (i % 3 === 0) {
        arr[i] = randomSort(arr[i]);
      } else {
        arr[i] = randomSort(arr[i]);
      }
    }
  };

  //создание слайдов-страниц в зависимости от ширины экрана
  const createSliderPages = () => {
    for (let m = 0; m < cardCounter; m++) {
      const div = document.createElement('div');
      div.className = 'slider-page';
      div.setAttribute('data-page', m + 1);
      slider.append(div);
    }
  };

  //разделение массива на кусочки и запись в новый для дальнейшей работы 
  const cutArrayToSubarrays = (arrayFrom, arrayTo, size) => {
    for (let i = 0; i < Math.ceil(arrayFrom.length / size); i++) {
      arrayTo[i] = arrayFrom.slice((i * size), (i * size) + size);
    }
  };

  //наполняем каждый слайд-страничку карточками
  const appendCardsToSliderPages = (arrayFrom, size) => {
    const pages = document.querySelectorAll('.slider-page');

    for (let t = 0; t < pages.length; t++) {
      for (let n = 0; n < size; n++) {
        pages[t].append(createCard(arrayFrom[t][n].id, arrayFrom[t][n].img, arrayFrom[t][n].name))
      }
    }
  };

  // ДЛЯ ЭКРАНОВ 1280 И БОЛЕЕ - создаем 6 страничек слайдов по 8 элементов
  if (cardCounter === 6) {
    let size = 8;
    //создаем глубокую копию массива
    let arrayDesktop = JSON.parse(JSON.stringify(array));
    //в каждом кусочке намиксуем карточки внутри
    generateRandomArrays(arrayDesktop);
    //создаем 6 страничек по 8 элементов
    createSliderPages();
    //наполняем каждую страничку карточками
    appendCardsToSliderPages(arrayDesktop, size);
  }

  // ДЛЯ ЭКРАНОВ ОТ 768 ДО 1279 - создаем 8 страничек слайдов по 6 элементов
  if (cardCounter === 8) {
    let commonArray = JSON.parse(JSON.stringify(array));
    let arrayPad = commonArray.flat();
    let size = 6;
    let subArray = [];

    //разделиляем массив на кусочки
    cutArrayToSubarrays(arrayPad, subArray, size);
    //в каждом кусочке намиксуем карточки внутри
    generateRandomArrays(subArray);
    //создаем 8 страничек по 6 элементов
    createSliderPages();
    //наполняем каждую страничку карточками
    appendCardsToSliderPages(subArray, size);
  }

  // ДЛЯ ЭКРАНОВ ДО 767 - создаем 16 страничек слайдов по 3 элемента
  if (cardCounter === 16) {
    let commonArray = JSON.parse(JSON.stringify(array));
    let arrayMobile = commonArray.flat();
    let size = 3;
    let subArray = [];

    //разделиляем массив на кусочки
    cutArrayToSubarrays(arrayMobile, subArray, size);
    //в каждом кусочке намиксуем карточки внутри
    generateRandomArrays(subArray);
    //создаем 16 страничек по 3 элемента
    createSliderPages();
    //наполняем каждую страничку карточками
    appendCardsToSliderPages(subArray, size);
  }


  //ПАГИНАЦИЯ ДЛЯ ВСЕХ ЭКРАНОВ
  let position = 0, itemWidth;

  if (cardCounter === 6) {
    itemWidth = 1200;
  } else if (cardCounter === 8) {
    itemWidth = 580;
  } else if (cardCounter === 16) {
    itemWidth = 270;
  }

  const movePosition = itemWidth;

  const checkButton = () => {
    if (position === 0) {
      btnPrev.setAttribute('disabled', true);
      btnStart.setAttribute('disabled', true);
    } else {
      btnPrev.removeAttribute('disabled');
      btnStart.removeAttribute('disabled');
    }

    if (position === -6000 || position === -4050 || position === -4060) {
      btnNext.setAttribute('disabled', true);
      btnEnd.setAttribute('disabled', true);
    } else {
      btnNext.removeAttribute('disabled');
      btnEnd.removeAttribute('disabled');
    }
  };

  const changePage = (position) => {
    switch (position) {
      case 0:
        pageNumber.textContent = 1;
        break;
      case -270:
        pageNumber.textContent = 2;
        break;
      case -540:
        pageNumber.textContent = 3;
        break;
      case -580:
        pageNumber.textContent = 2;
        break;
      case -810:
        pageNumber.textContent = 4;
        break;
      case -1080:
        pageNumber.textContent = 5;
        break;
      case -1160:
        pageNumber.textContent = 3;
        break;
      case -1200:
        pageNumber.textContent = 2;
        break;
      case -1350:
        pageNumber.textContent = 6;
        break;
      case -1620:
        pageNumber.textContent = 7;
        break;
      case -1740:
        pageNumber.textContent = 4;
        break;
      case -1890:
        pageNumber.textContent = 8;
        break;
      case -2160:
        pageNumber.textContent = 9;
        break;
      case -2320:
        pageNumber.textContent = 5;
        break;
      case -2400:
        pageNumber.textContent = 3;
        break;
      case -2430:
        pageNumber.textContent = 10;
        break;
      case -2700:
        pageNumber.textContent = 11;
        break;
      case -2900:
        pageNumber.textContent = 6;
        break;
      case -2970:
        pageNumber.textContent = 12;
        break;
      case -3240:
        pageNumber.textContent = 13;
        break;
      case -3480:
        pageNumber.textContent = 7;
        break;
      case -3510:
        pageNumber.textContent = 14;
        break;
      case -3600:
        pageNumber.textContent = 4;
        break;
      case -3780:
        pageNumber.textContent = 15;
        break;
      case -4050:
        pageNumber.textContent = 16;
        break;
      case -4060:
        pageNumber.textContent = 8;
        break;
      case -4800:
        pageNumber.textContent = 5;
        break;
      case -6000:
        pageNumber.textContent = 6;
        break;
    }
  }

  const clickPagination = e => {
    //запрет на лики во время перемотки слайда
    pagination.removeEventListener('click', clickPagination);
    setTimeout(function () {
      pagination.addEventListener('click', clickPagination);
    }, 1100);

    let target = e.target;

    if (target.closest('.btn-next')) {
      if (target.closest('.btn-next').hasAttribute('disabled')) {
        return;
      } else {
        position -= movePosition;
        slider.style.transform = `translateX(${position}px)`;
        changePage(position);
        checkButton();
      }
    }

    if (target.closest('.btn-prev')) {
      if (target.closest('.btn-prev').hasAttribute('disabled')) {
        return;
      } else {
        position += movePosition;
        slider.style.transform = `translateX(${position}px)`;
        changePage(position);
        checkButton();
      }
    }

    if (target.closest('.btn-end')) {
      if (cardCounter === 6) {
        position = -6000;
      } else if (cardCounter === 8) {
        position = -4060;
      } else if (cardCounter === 16) {
        position = -4050;
      }

      slider.style.transform = `translateX(${position}px)`;
      changePage(position);
      checkButton();
    }

    if (target.closest('.btn-start')) {
      position = 0;
      slider.style.transform = `translateX(${position}px)`;
      changePage(position);
      checkButton();
    }
  };

  pagination.addEventListener('click', clickPagination);

  checkButton();
  slidesPopUp();
};

export default staticSlider;