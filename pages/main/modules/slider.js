import { getData } from './getData.js';
import { createCard } from './createCard.js';

const data = await getData();

// ===== кол-во слайдов на странице в зависимости от экрана ===========
let cardCounter = 3;

if (window.matchMedia("(max-width: 1279px)").matches) {
  cardCounter = 2;
}

if (window.matchMedia("(max-width: 767px)").matches) {
  cardCounter = 1;
}

const slider = () => {
  const btnLeft = document.querySelector('#btn-left');
  const btnRight = document.querySelector('#btn-right');
  const carousel = document.querySelector('#carousel');
  const itemActive = document.querySelector('#item-active');
  const itemLeft = document.querySelector('#item-left');
  const itemRight = document.querySelector('#item-right');
  let currentActive, sideElements;

  // возвращает рэндом массива
  const randomize = (list) => list
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  // возвращает разницу между двумя массивами
  const getDifference = (list1, list2) => list1.filter(x => !list2.includes(x));

  // возвращает нужную длину
  const sliceItems = (list, length) => list.slice(0, length || list.length);

  // возвращает отсутствующие в текущей выборке элементы
  const getAnotherItems = (currentList) => {
    return sliceItems(randomize(getDifference(data, currentList)), currentList.length);
  }

  // первый запуск - формируем начальный массив для активного слайда
  const firstRender = sliceItems(randomize(data), cardCounter);

  // последующие клики
  const handleClick = (currentItems) => getAnotherItems(currentItems);

  // формируем массив для боковых слайдов
  let newItems = handleClick(firstRender);

  //размещаем контент на странице
  const createBlockCards = (element, fromArray) => {
    element.textContent = '';

    const appendCards = () => {
      for (let i = 0; i < fromArray.length; i++) {
        element.append(createCard(fromArray[i].id, fromArray[i].img, fromArray[i].name));
      }
    }

    if (element.id === 'item-active') {
      appendCards();
      currentActive = fromArray; //запомнили активный массив
    }

    if (element.id === 'item-left' || element.id === 'item-right') {
      appendCards();
      sideElements = fromArray; //запомнили боковой массив
    }
  };


  /* ==================== slider controlls ============================== */
  const moveLeft = () => {
    btnLeft.removeEventListener('click', moveLeft);
    setTimeout(function () {
      btnLeft.addEventListener('click', moveLeft);
    }, 1000);

    btnRight.removeEventListener('click', moveRight);
    setTimeout(function () {
      btnRight.addEventListener('click', moveRight);
    }, 1000);

    carousel.classList.add('transition-left');
  }
  const moveRight = () => {
    btnLeft.removeEventListener('click', moveLeft);
    setTimeout(function () {
      btnLeft.addEventListener('click', moveLeft);
    }, 1000);

    btnRight.removeEventListener('click', moveRight);
    setTimeout(function () {
      btnRight.addEventListener('click', moveRight);
    }, 1000);

    carousel.classList.add('transition-right');
  }

  carousel.addEventListener('animationend', (e) => {
    if (e.animationName === 'move-left') {
      carousel.classList.remove('transition-left');
      //запомнили контент, что было слева, в переменную
      const leftItem = itemLeft.innerHTML;
      //левый контент прописали в центр
      itemActive.innerHTML = leftItem;
      //массив левого зафиксировали в переменной как теперь активный
      currentActive = newItems;
      //сгенерировать новый левый контент отличный от центрального
      newItems = handleClick(currentActive);

      //append этот новый контент в левый и правый слайды
      createBlockCards(itemLeft, newItems);
      createBlockCards(itemRight, newItems);

    } else {
      carousel.classList.remove('transition-right');
      //запомнили, что было справа, в переменную
      const rightItem = itemRight.innerHTML;
      //правый контент прописали в центр
      itemActive.innerHTML = rightItem;
      //массив правого зафиксировали в переменной как теперь активный
      currentActive = newItems;
      //сгенерировать новый правый контент отличный от центрального
      newItems = handleClick(currentActive);

      //append этот новый контент в левый и правый слайды
      createBlockCards(itemLeft, newItems);
      createBlockCards(itemRight, newItems);
    }
  });

  btnLeft.addEventListener('click', moveLeft);
  btnRight.addEventListener('click', moveRight);

  /* ==================== //slider controlls ============================== */

  //при начальной загрузке страницы очищаем слайдер и герерируем карточки
  createBlockCards(itemActive, firstRender);
  createBlockCards(itemLeft, newItems);
  createBlockCards(itemRight, newItems);
};

export default slider;