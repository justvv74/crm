import { addNewClients, createClientDataAdd, clearAddForm } from './add-client';
import { createClientDataChange, editClientData, createClientsList } from './list';

const FORM_ADD = document.getElementById('add-client-form');
const FORM_CHANGE = document.getElementById('change-form');

FORM_ADD.addEventListener('submit', (e) => {
  e.preventDefault();

  if (validation(setFormName())[1] !== true) {
    btnLoading('add-client');

    async function loading() {
      const ANSWER = await addNewClients(createClientDataAdd());

      if (ANSWER.id !== '') {
        clearAddForm('add-client');
        createClientsList();
        btnLoaded('add-client');
      }
    }
    loading();
  }
});

FORM_CHANGE.addEventListener('submit', (e) => {
  e.preventDefault();

  if (validation(setFormName())[1] !== true) {
    btnLoading('change');

    async function loading() {
      const ANSWER = await editClientData(document.getElementById('change-id').getAttribute('client-id'), createClientDataChange());
      if (ANSWER.id !== '') {
        clearAddForm('change');
        createClientsList();
        btnLoaded('change');
      }
    }
    loading();
  }
});

function setFormName() {
  const MODAL_CHANGE = document.getElementById(`change-modal`);
  const MODAL_ADD = document.getElementById(`add-client-modal`);
  let formName;

  if (MODAL_CHANGE.classList.contains('modal--visible')) {
    return formName = 'change';
  }

  if (MODAL_ADD.classList.contains('modal--visible')) {
    return formName = 'add-client';
  }
}

function validation(formName) {
  const FORM = document.getElementById(`${formName}-form`);
  const NAME = document.getElementById(`${formName}-name`);
  const SURNAME = document.getElementById(`${formName}-surname`);
  const MIDDLE_NAME = document.getElementById(`${formName}-middlename`);
  const INPUTS = document.querySelectorAll(`.${formName}-input`);
  const ERROR = document.getElementById(`${formName}-error`);
  const CONTACT_BOX = document.querySelector('.new-contact');
  const CONTACT_ROW = document.querySelectorAll('.new-contact__row');
  let error = true;

  if (FORM) {
    const NAME_VALUE = NAME.value;
    const SURNAME_VALUE = SURNAME.value;
    const MIDDLE_NAME_VALUE = MIDDLE_NAME.value;
    const EMPTY_INPUTS = Array.from(INPUTS).filter(input => input.value === '');

    // Вешаем ошибку на все пустые инпуты
    INPUTS.forEach((e) => {
      if (e.value === '') {
        e.classList.add('modal__input_error');
      } else {
        e.classList.remove('modal__input_error');
      }
    });

    // Если есть пустой инпут, запрещаем нажатие
    if (EMPTY_INPUTS.length > 0) {
      ERROR.textContent = 'Заполните все обязательные поля';
      return [
        false,
        error = true
      ];
    } else {
      ERROR.textContent = '';
      error = false;
    }

    if (!validateName(SURNAME_VALUE)) {
      SURNAME.classList.add('modal__input_error');
      ERROR.textContent = 'Введите фамилию от 2 до 30 русских букв';
      return [
        false,
        error = true
      ];
    } else {
      SURNAME.classList.remove('modal__input_error');
      ERROR.textContent = '';
      error = false;
    }

    if (!validateName(NAME_VALUE)) {
      NAME.classList.add('modal__input_error');
      ERROR.textContent = 'Введите имя от 2 до 30 русских букв';
      return [
        false,
        error = true
      ];
    } else {
      NAME.classList.remove('modal__input_error');
      ERROR.textContent = '';
      error = false;
    }

    if (!validateName(MIDDLE_NAME_VALUE)) {
      MIDDLE_NAME.classList.add('modal__input_error');
      ERROR.textContent = 'Введите отчество от 2 до 30 русских букв';
      return [
        false,
        error = true
      ];
    } else {
      MIDDLE_NAME.classList.remove('modal__input_error');
      ERROR.textContent = '';
      error = false;
    }

    if (CONTACT_BOX) {
      for (let i = 0; i < CONTACT_ROW.length; ++i) {
        const CONTACT_SELECT = CONTACT_ROW[i].getElementsByTagName('select');
        const CONTACT_INPUT = CONTACT_ROW[i].getElementsByTagName('input');
        const SELECT = Array.from(CONTACT_SELECT)[0]
        const INPUT = Array.from(CONTACT_INPUT)[0]

        if (SELECT.value === 'Телефон') {
          if (!validatePhone(INPUT.value)) {
            INPUT.classList.add('new-contact__input_error');
            ERROR.textContent = 'Введите номер телефона';
            return [
              false,
              error = true
            ];
          } else {
            INPUT.classList.remove('new-contact__input_error');
            ERROR.textContent = '';
            error = false;
          }
        }

        if (SELECT.value === 'Email') {
          if (!validateEmail(INPUT.value)) {
            INPUT.classList.add('new-contact__input_error');
            ERROR.textContent = 'Введите корректный Email (В формате example@mail.ru)';
            return [
              false,
              error = true
            ];
          } else {
            INPUT.classList.remove('new-contact__input_error');
            ERROR.textContent = '';
            error = false;
          }
        }

        if (SELECT.value === 'Facebook' || SELECT.value === 'Vk' || SELECT.value === 'Другое') {
          if (!validateInput(INPUT.value)) {
            INPUT.classList.add('new-contact__input_error');
            ERROR.textContent = 'Заполните поле от 3 до 60 символов';
            return [
              false,
              error = true
            ];
          } else {
            INPUT.classList.remove('new-contact__input_error');
            ERROR.textContent = '';
            error = false;
          }
        }
      }
    }

    return error;
  }

  function validateName(name) {
    const NAME_RULE = /^[А-Яа-я\ /ёЁ]{2,30}$/;
    return NAME_RULE.test(String(name));
  }

  // Валидация поля контактов 'Телефон'
  function validatePhone(phone) {
    const PHONE_RULE = /^[0-9\s\-\(\)\+]{18,18}/;
    return PHONE_RULE.test(String(phone));
  }

  // Валидация поля контактов 'Email'
  function validateEmail(email) {
  const emailRule = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  return emailRule.test(String(email).toLowerCase());
}

// Валидация остальных полей контактов на заполненность
function validateInput(text) {
  const NAME_RULE = /^.{3,60}$/;
    return NAME_RULE.test(String(text));
}
}

function btnLoading(formName) {
  const BTN = document.getElementById(`${formName}-save`);
  const SPINNER = document.getElementById(`${formName}-save-loading`);

  BTN.setAttribute('disable', '');
  SPINNER.classList.add('btn-color-loading--visible');
}

function btnLoaded(formName) {
  const BTN = document.getElementById(`${formName}-save`);
  const SPINNER = document.getElementById(`${formName}-save-loading`);

  BTN.removeAttribute('disable', '');
  SPINNER.classList.remove('btn-color-loading--visible');
}
