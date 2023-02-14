import { NEW_CONTACT_BOX, URL_PARAM, setLocation } from './list';

const BODY = document.querySelector('body');
const MODAL = 'add-client'
const ADD_CLIENT_MODAL = document.getElementById('add-client-modal');
const ADD_MODAL_BOX = document.getElementById('add-client-modal-box');
const ADD_CLIENT_BTN_OPEN = document.getElementById('add-client-modal-open');
const ADD_CLIENT_BTN_CLOSE = document.getElementById('add-client-modal-close');
const FORM = document.querySelector('.modal__form');
const ADD_CLIENT_ADD_NEW_CONTACT_BTN = document.getElementById('add-client-add-contact');
const CHANGE_ADD_NEW_CONTACT_BTN = document.getElementById('change-add-contact');
const ADD_CLIENT_ADD_CANCEL = document.getElementById('add-client-cancel');

// Открываем и закрываем модалку добавления клиента
ADD_CLIENT_BTN_OPEN.addEventListener('click', () => {
  ADD_CLIENT_MODAL.classList.add('modal--visible');
  ADD_MODAL_BOX.classList.add('modal__box--visible');
  BODY.classList.add('noscroll');
});

ADD_CLIENT_BTN_CLOSE.addEventListener('click', () => {
  ADD_CLIENT_MODAL.classList.remove('modal--visible');
  ADD_MODAL_BOX.classList.remove('modal__box--visible');
  BODY.classList.remove('noscroll');
});

ADD_CLIENT_MODAL.addEventListener('click', (e) => {
  if (e.target === ADD_CLIENT_MODAL) {
    ADD_CLIENT_MODAL.classList.remove('modal--visible');
    ADD_MODAL_BOX.classList.remove('modal__box--visible');
    BODY.classList.remove('noscroll');
  }
});

// Добавляем новые поля ввода для контактов
ADD_CLIENT_ADD_NEW_CONTACT_BTN.addEventListener('click', () => {

  if (!document.querySelector('.new-contact__row')) {
    FORM.after(NEW_CONTACT_BOX);
  }

  if (NEW_CONTACT_BOX.childNodes.length > 8) {
    ADD_CLIENT_ADD_NEW_CONTACT_BTN.classList.add('modal__add-input--invis')
    NEW_CONTACT_BOX.classList.add('new-contact--full');
  }

  createNewContact(MODAL);
});

// Функция, добавляющая нового человека в список
export function createNewContact(modal, value, type) {
  const NEW_CONTACT = document.createElement('div');
  const CONTACT_TYPE = document.createElement('select');
  const CONTACT_TYPE_PHONE = document.createElement('option');
  const CONTACT_TYPE_EMAIL = document.createElement('option');
  const CONTACT_TYPE_FACEBOOK = document.createElement('option');
  const CONTACT_TYPE_VK = document.createElement('option');
  const CONTACT_TYPE_OTHER = document.createElement('option');
  const CONTACT_VALUE = document.createElement('input');
  const DELETE_CONTACT = document.createElement('button');
  const DELETE_CONTACT_IMG = document.createElement('img');

  NEW_CONTACT.classList.add('new-contact__row');
  CONTACT_TYPE.classList.add('new-contact__select');
  CONTACT_VALUE.classList.add('new-contact__input', `new-contact__${modal}-input`);
  DELETE_CONTACT.classList.add('new-contact__delete');
  DELETE_CONTACT_IMG.classList.add('new-contact__delete-img');

  CONTACT_TYPE.setAttribute('form', `${modal}-modal`);
  CONTACT_VALUE.setAttribute('form', `${modal}-modal`);
  DELETE_CONTACT_IMG.setAttribute('src', 'img/cross-circle.svg');
  CONTACT_TYPE_PHONE.setAttribute('value', 'Телефон');
  CONTACT_TYPE_EMAIL.setAttribute('value', 'Email');
  CONTACT_TYPE_FACEBOOK.setAttribute('value', 'Facebook');
  CONTACT_TYPE_VK.setAttribute('value', 'Vk');
  CONTACT_TYPE_OTHER.setAttribute('value', 'Другое');

  CONTACT_TYPE_PHONE.textContent = 'Телефон';
  CONTACT_TYPE_EMAIL.textContent = 'Email';
  CONTACT_TYPE_FACEBOOK.textContent = 'Facebook';
  CONTACT_TYPE_VK.textContent = 'Vk';
  CONTACT_TYPE_OTHER.textContent = 'Другое';

  CONTACT_TYPE.addEventListener('change', () => {
    CONTACT_VALUE.value = '';
    if (CONTACT_TYPE.value === 'Телефон') {
      maskForInput()
    } else {
      Inputmask.remove(CONTACT_VALUE);
    }
  });

  DELETE_CONTACT.addEventListener('click', (e) => {
    e.target.closest('div').remove();

    if (!document.querySelector('.new-contact__row') && !document.querySelector('.new-contact__row_filled')) {
      document.querySelector('.new-contact').remove();
    }

    if (document.querySelector('.new-contact') && document.querySelector('.new-contact').childNodes.length < 10) {
      if (ADD_CLIENT_ADD_NEW_CONTACT_BTN) {
        ADD_CLIENT_ADD_NEW_CONTACT_BTN.classList.remove('modal__add-input--invis');
      }

      if (CHANGE_ADD_NEW_CONTACT_BTN) {
        CHANGE_ADD_NEW_CONTACT_BTN.classList.remove('modal__add-input--invis');
      }

      document.querySelector('.new-contact').classList.remove('new-contact--full');
    }
  });

  CONTACT_TYPE.append(CONTACT_TYPE_PHONE);
  CONTACT_TYPE.append(CONTACT_TYPE_EMAIL);
  CONTACT_TYPE.append(CONTACT_TYPE_FACEBOOK);
  CONTACT_TYPE.append(CONTACT_TYPE_VK);
  CONTACT_TYPE.append(CONTACT_TYPE_OTHER);
  DELETE_CONTACT.append(DELETE_CONTACT_IMG);
  NEW_CONTACT.append(CONTACT_TYPE);
  NEW_CONTACT.append(CONTACT_VALUE);
  NEW_CONTACT.append(DELETE_CONTACT);
  document.querySelector('.new-contact').append(NEW_CONTACT);

  if (value) {
    CONTACT_VALUE.value = value;
    NEW_CONTACT.classList.add('new-contact__row_filled');
  }

  if (type) {
    const SELECTED_SELECT = CONTACT_TYPE.getElementsByTagName('option');

    for (let s = 0; s < SELECTED_SELECT.length; ++s) {
      if (SELECTED_SELECT[s].value === type) {
        CONTACT_TYPE.getElementsByTagName('option')[s].setAttribute('selected', '')
      }
    }
  }

  function maskForInput() {
    if (CONTACT_TYPE.value === 'Телефон') {
    let im = new Inputmask({
      "mask": "+7 (999) 999-99-99",
    }).mask(CONTACT_VALUE);
    }
  }
  maskForInput();
}

ADD_CLIENT_ADD_CANCEL.addEventListener('click', () => {
  clearAddForm('add-client');
});


export function clearAddForm(formName) {
  const MODAL = document.getElementById(`${formName}-modal`);
  const FORM = document.getElementById(`${formName}-form`);
  FORM.reset();

  if (document.querySelector('.new-contact')) {
    document.querySelectorAll('.new-contact__row').forEach((e) => {
      e.remove();
    });

    ADD_CLIENT_ADD_NEW_CONTACT_BTN.classList.remove('modal__add-input--invis');
    NEW_CONTACT_BOX.classList.remove('new-contact--full');

    document.querySelector('.new-contact').remove();
  }

  if (URL_PARAM.hash !== '') {
    URL_PARAM.hash = '';
    setLocation(' ');
  }

  MODAL.classList.remove('modal--visible');
  BODY.classList.remove('noscroll');
}

export async function addNewClients(data) {
  const RESPONSE = await fetch('http://localhost:3005/api/clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })

  const RESULT = RESPONSE.json();
  return RESULT;
}

export function createClientDataAdd() {
  const NAME = document.getElementById('add-client-name');
  const SURNAME = document.getElementById('add-client-surname');
  const MIDDLENAME = document.getElementById('add-client-middlename');
  const CONTACTS_ARR = document.querySelectorAll('.new-contact__row');
  const CONTACTS = [];

  if (document.querySelector('.new-contact__row')) {
    for (let i = 0; i < CONTACTS_ARR.length; ++i) {
      const OBJ_KEY = CONTACTS_ARR[i].querySelector('.new-contact__select').value;
      const OBJ_VALUE = CONTACTS_ARR[i].querySelector('.new-contact__input').value;
      const OBJ = {
        'type': OBJ_KEY,
        'value': OBJ_VALUE
      };
      CONTACTS.push(OBJ);
    }
  }

  const ADD_CLIENT_DATA = {
    'name': NAME.value.trim().substring(0,1).toUpperCase() + NAME.value.trim().substring(1).toLowerCase(),
    'surname': SURNAME.value.trim().substring(0,1).toUpperCase() + SURNAME.value.trim().substring(1).toLowerCase(),
    'lastName': MIDDLENAME.value.trim().substring(0,1).toUpperCase() + MIDDLENAME.value.trim().substring(1).toLowerCase(),
    'contacts': CONTACTS,
  };

  return ADD_CLIENT_DATA;
}
