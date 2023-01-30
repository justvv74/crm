import { getClientsList, createClientsList } from './list';

const BTN_ID = document.getElementById('btn-id');
const BTN_NAME = document.getElementById('btn-name');
const BTN_DATE_CREATE = document.getElementById('btn-date-create');
const BTN_DATE_CHANGE = document.getElementById('btn-date-change');
const SORT_BTN = document.querySelectorAll('.clients__header-btn');

BTN_ID.setAttribute('sort', 'down');
BTN_NAME.setAttribute('sort', 'down');
BTN_DATE_CREATE.setAttribute('sort', 'down');
BTN_DATE_CHANGE.setAttribute('sort', 'down');

// Вешаем на кнопки заголовков столбцов таблицы прослушиватели событий
BTN_ID.addEventListener('click', () => {
  sort(BTN_ID, 0);
});

BTN_NAME.addEventListener('click', () => {
  sort(BTN_NAME, 1);
});

BTN_DATE_CREATE.addEventListener('click', () => {
  sortDate(BTN_DATE_CREATE, 'createdAt');
});

BTN_DATE_CHANGE.addEventListener('click', () => {
  sortDate(BTN_DATE_CHANGE, 'updatedAt');
});

SORT_BTN.forEach((e) => {
  e.addEventListener('click', () => {
    const BTN = e;

    SORT_BTN.forEach((a) => {
      const ARROW = a.querySelector('.clients__header-btn-img');

      if (a != BTN) {
        a.setAttribute('sort', 'down');
        ARROW.classList.remove('clients__header-btn-img--upside');
      }
    });
  });
});

// Функция сортировки для первых двух столбцов
async function sort(btn, propNum) {
  const DATA = await getClientsList();
  const propArr = ['id', 'surname'];
  const ARROW = btn.querySelector('.clients__header-btn-img');

  if (btn.getAttribute('sort') === 'down') {
    createClientsList(DATA.sort(function (a, b) {
      if (a[propArr[propNum]] < b[propArr[propNum]]) {
        return 1;
      }
      if (a[propArr[propNum]] > b[propArr[propNum]]) {
        return -1;
      }
      return 0;
    }));
    btn.setAttribute('sort', 'up');
    ARROW.classList.add('clients__header-btn-img--upside');
  } else {
    createClientsList(DATA.sort(function (a, b) {
      if (a[propArr[propNum]] > b[propArr[propNum]]) {
        return 1;
      }
      if (a[propArr[propNum]] < b[propArr[propNum]]) {
        return -1;
      }
      return 0;
    }));
    btn.setAttribute('sort', 'down');
    ARROW.classList.remove('clients__header-btn-img--upside');
  }
}

// Функция сортировки последних двух столбцов, отличается тем, что учитывает полное время создания или изменения, в т.ч. минуты, часы, дни, месяцы и годы
async function sortDate(btn, time) {
  const DATA = await getClientsList();
  const ARROW = btn.querySelector('.clients__header-btn-img');

  if (btn.getAttribute('sort') === 'down') {
    createClientsList(DATA.sort(function (a, b) {
      if (a[time].substring(0,4) + a[time].substring(5,7) + a[time].substring(8,10) + a[time].substring(11,13) + a[time].substring(14,16) < b[time].substring(0,4) + b[time].substring(5,7) + b[time].substring(8,10) + b[time].substring(11,13) + b[time].substring(14,16)) {
        return 1;
      }
      if (a[time].substring(0,4) + a[time].substring(5,7) + a[time].substring(8,10) + a[time].substring(11,13) + a[time].substring(14,16) > b[time].substring(0,4) + b[time].substring(5,7) + b[time].substring(8,10) + b[time].substring(11,13) + b[time].substring(14,16)) {
        return -1;
      }
      return 0;
    }));
    btn.setAttribute('sort', 'up');
    ARROW.classList.add('clients__header-btn-img--upside');
  } else {
    createClientsList(DATA.sort(function (a, b) {
      if (a[time].substring(0,4) + a[time].substring(5,7) + a[time].substring(8,10) + a[time].substring(11,13) + a[time].substring(14,16) > b[time].substring(0,4) + b[time].substring(5,7) + b[time].substring(8,10) + b[time].substring(11,13) + b[time].substring(14,16)) {
        return 1;
      }
      if (a[time].substring(0,4) + a[time].substring(5,7) + a[time].substring(8,10) + a[time].substring(11,13) + a[time].substring(14,16) < b[time].substring(0,4) + b[time].substring(5,7) + b[time].substring(8,10) + b[time].substring(11,13) + b[time].substring(14,16)) {
        return -1;
      }
      return 0;
    }));
    btn.setAttribute('sort', 'down');
    ARROW.classList.remove('clients__header-btn-img--upside');
  }
}

