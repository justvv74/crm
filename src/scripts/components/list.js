import { createNewContact, clearAddForm } from './add-client';
import { MODAL } from './change';
import { PHONE_SVG, MAIL_SVG, FB_SVG, VK_SVG, OTHER_SVG } from './sprite';

const TABLE = document.getElementById('clients-list');
const BODY = document.querySelector('body');
export const URL_PARAM = new URL(location);

export const NEW_CONTACT_BOX = document.createElement('div');
NEW_CONTACT_BOX.classList.add('new-contact');

export async function createClientsList(sortData) {
  document.getElementById('clients-list').classList.add('clients__table--waiting');
  const SPINER = document.createElement('div');
  SPINER.classList.add('clients__table-spiner');
  TABLE.append(SPINER);

  let DATA;
  if (sortData) {
    DATA = sortData
  } else {
    DATA = (await getClientsList()).sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
  }
  if (DATA) {
    document.getElementById('clients-list').classList.remove('clients__table--waiting');
  }

  if (TABLE.childNodes.length > 0) {
    TABLE.innerHTML = '';
  }

  for (let i = 0; i < DATA.length; ++i) {
    const ROW = document.createElement('div');
    const ID = document.createElement('p');
    const FULL_NAME = document.createElement('p');
    const CREATE_DATE = document.createElement('p');
    const CREATE_DATE_TIME = document.createElement('span');
    const CHANGE_DATE = document.createElement('p');
    const CHANGE_DATE_TIME = document.createElement('span');
    const CONTACT_BOX = document.createElement('div');

    for (let e = 0; e < DATA[i].contacts.length; ++e) {
      const CONTACT = document.createElement('div');
      const CONTACT_SVG = document.createElement('svg');
      const TOOLTIP = document.createElement('div');

      CONTACT.classList.add('clients__table-contact');
      TOOLTIP.classList.add('clients__table-contact-tooltip');

      if (DATA[i].contacts[e].type === 'Телефон') {
        CONTACT.classList.add('clients__table-contact-phone');
        CONTACT_SVG.innerHTML = PHONE_SVG;
        CONTACT.append(CONTACT_SVG);
        TOOLTIP.innerHTML = `${DATA[i].contacts[e].type}: <a href="tel:${DATA[i].contacts[e].value}" class="clients__table-contact-tooltip-link">${DATA[i].contacts[e].value}</a>`;
      }

      if (DATA[i].contacts[e].type === 'Email') {
        CONTACT.classList.add('clients__table-contact-email');
        CONTACT_SVG.innerHTML = MAIL_SVG;
        CONTACT.append(CONTACT_SVG);
        TOOLTIP.innerHTML = `${DATA[i].contacts[e].type}: <a href="mailto:${DATA[i].contacts[e].value}" class="clients__table-contact-tooltip-link">${DATA[i].contacts[e].value}</a>`;
      }

      if (DATA[i].contacts[e].type === 'Facebook') {
        CONTACT.classList.add('clients__table-contact-fb');
        CONTACT_SVG.innerHTML = FB_SVG;
        CONTACT.append(CONTACT_SVG);
        TOOLTIP.innerHTML = `${DATA[i].contacts[e].type}: <a href="${DATA[i].contacts[e].value}" class="clients__table-contact-tooltip-link" target="_blank">${DATA[i].contacts[e].value}</a>`;
      }

      if (DATA[i].contacts[e].type === 'Vk') {
        CONTACT.classList.add('clients__table-contact-vk');
        CONTACT_SVG.innerHTML = VK_SVG;
        CONTACT.append(CONTACT_SVG);
        TOOLTIP.innerHTML = `${DATA[i].contacts[e].type}: <a href="${DATA[i].contacts[e].value}" class="clients__table-contact-tooltip-link" target="_blank">${DATA[i].contacts[e].value}</a>`;
      }

      if (DATA[i].contacts[e].type === 'Другое') {
        CONTACT.classList.add('clients__table-contact-other');
        CONTACT_SVG.innerHTML = OTHER_SVG;
        CONTACT.append(CONTACT_SVG);
        TOOLTIP.innerHTML = `${DATA[i].contacts[e].type}: <a href="${DATA[i].contacts[e].value}" class="clients__table-contact-tooltip-link" target="_blank">${DATA[i].contacts[e].value}</a>`;
      }

      CONTACT.append(TOOLTIP);
      CONTACT_BOX.append(CONTACT);

      CONTACT.addEventListener('mouseenter', (e) => {
        TOOLTIP.classList.add('clients__table-contact-tooltip--visible');
      });

      CONTACT.addEventListener('mouseleave', (e) => {
        TOOLTIP.classList.remove('clients__table-contact-tooltip--visible');
      });

      BODY.addEventListener('click', (e) => {
        if (e.target !== TOOLTIP && e.target !== CONTACT) {
          TOOLTIP.classList.remove('clients__table-contact-tooltip--visible');
        }
      });
    }

    const BTN_BOX = document.createElement('div');
    const CHANGE_BTN = document.createElement('button');
    const CHANGE_BTN_IMG = document.createElement('img');
    const DELETE_BTN = document.createElement('button');
    const DELETE_BTN_IMG = document.createElement('img');

    ROW.classList.add('clients__table-row');
    ID.classList.add('clients__table-id', 'reset');
    FULL_NAME.classList.add('clients__table-fullname', 'reset');
    CREATE_DATE.classList.add('clients__table-create-date', 'reset');
    CREATE_DATE_TIME.classList.add('clients__table-create-date-time');
    CHANGE_DATE.classList.add('clients__table-change-date', 'reset');
    CHANGE_DATE_TIME.classList.add('clients__table-change-date-time');
    CONTACT_BOX.classList.add('clients__table-contact-box');
    BTN_BOX.classList.add('clients__table-btn-box');
    CHANGE_BTN_IMG.classList.add('clients__table-btn-img');
    CHANGE_BTN.classList.add('clients__table-btn');
    DELETE_BTN_IMG.classList.add('clients__table-btn-img');
    DELETE_BTN.classList.add('clients__table-btn');

    ROW.setAttribute('client-id', DATA[i].id);
    DATA[i].id.length > 10 ? ID.textContent = DATA[i].id.substring(4) : ID.textContent = DATA[i].id;
    FULL_NAME.textContent = `${DATA[i].surname} ${DATA[i].name} ${DATA[i].lastName}`;
    CREATE_DATE.textContent = `${DATA[i].createdAt.substring(8, 10)}.${DATA[i].createdAt.substring(5, 7)}.${DATA[i].createdAt.substring(0, 4)}`;
    CREATE_DATE_TIME.textContent = `${DATA[i].createdAt.substring(11, 16)}`;
    CHANGE_DATE.textContent = `${DATA[i].updatedAt.substring(8, 10)}.${DATA[i].updatedAt.substring(5, 7)}.${DATA[i].updatedAt.substring(0, 4)}`;
    CHANGE_DATE_TIME.textContent = `${DATA[i].updatedAt.substring(11, 16)}`;
    CHANGE_BTN_IMG.setAttribute('src', 'img/change.svg');
    CHANGE_BTN.classList.add('change__modal-open-btn');
    CHANGE_BTN.textContent = 'Изменить';
    DELETE_BTN_IMG.setAttribute('src', 'img/delete.svg');
    DELETE_BTN.setAttribute('id', `${DATA[i].id}`);
    DELETE_BTN.textContent = 'Удалить';

    CHANGE_BTN.addEventListener('click', (e) => {
      openChangeModal(DATA[i], DATA[i].id);
    });

    DELETE_BTN.addEventListener('click', (e) => {
      openDeleteModal(e.target.closest('.clients__table-row').getAttribute('client-id'));
    });

    ROW.append(ID);
    ROW.append(FULL_NAME);
    CREATE_DATE.append(CREATE_DATE_TIME);
    ROW.append(CREATE_DATE);
    CHANGE_DATE.append(CHANGE_DATE_TIME);
    ROW.append(CHANGE_DATE);
    CHANGE_BTN.prepend(CHANGE_BTN_IMG);
    ROW.append(CONTACT_BOX);
    BTN_BOX.append(CHANGE_BTN);
    DELETE_BTN.prepend(DELETE_BTN_IMG);
    BTN_BOX.append(DELETE_BTN);
    ROW.append(BTN_BOX);
    TABLE.append(ROW);

    if (URL_PARAM.hash !== '' && DATA[i].id === URL_PARAM.hash.substring(1)) {
      const BTN = document.querySelector(`.clients__table-row[client-id="${URL_PARAM.hash.substring(1)}"]`).getAttribute('client-id');
        openChangeModal(DATA[i], DATA[i].id, BTN);
    }
  }
}
createClientsList();

export function createClientDataChange() {
  const NAME = document.getElementById('change-name');
  const SURNAME = document.getElementById('change-surname');
  const MIDDLENAME = document.getElementById('change-middlename');
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

export function openDeleteModal(e) {
  const DELETE_MODAL = document.getElementById('client-del-modal');
  const DELETE_MODAL_BOX = document.getElementById('client-del-modal-box');
  const CONTACT_CLOSE = document.getElementById('client-del-close');
  const CONTACT_CANCEL = document.getElementById('client-del-cancel');

  if (document.getElementById('client-del-delete')) {
    document.getElementById('client-del-delete').remove();
  }

  DELETE_MODAL.classList.add('modal--visible');
  DELETE_MODAL_BOX.classList.add('modal__box--visible');
  BODY.classList.add('noscroll');

  const CONTACT_DELETE = document.createElement('button');
  CONTACT_DELETE.classList.add('btn-color');
  CONTACT_DELETE.textContent = 'Удалить';
  CONTACT_DELETE.setAttribute('id', 'client-del-delete');
  CONTACT_CANCEL.before(CONTACT_DELETE);

  DELETE_MODAL.addEventListener('click', (e) => {
    if (e.target === DELETE_MODAL) {
      closeDeleteModal();
    }
  });

  CONTACT_CLOSE.addEventListener('click', () => {
    closeDeleteModal();
  });

  CONTACT_DELETE.addEventListener('click', () => {
    removeContactFromList(e);
    closeDeleteModal();

    setTimeout(() => {
      createClientsList();
    }, 100);
  });

  CONTACT_CANCEL.addEventListener('click', () => {
    closeDeleteModal();
  });
}

function closeDeleteModal() {
  const DELETE_MODAL = document.getElementById('client-del-modal');
  const DELETE_MODAL_BOX = document.getElementById('client-del-modal-box');
  DELETE_MODAL.classList.remove('modal--visible');
  DELETE_MODAL_BOX.classList.remove('modal__box--visible');
  BODY.classList.remove('noscroll');
}

async function openChangeModal(data, id, e) {
  // const DATA = await getClientData(id);
  const MODAL_NAME = document.getElementById('change-modal');
  const MODAL_ID = document.getElementById('change-id');
  const CHANGE_MODAL_BOX = document.getElementById('change-modal-box');
  const FORM = document.getElementById('change-form');
  const NAME = document.getElementById('change-name');
  const SURNAME = document.getElementById('change-surname');
  const MIDDLENAME = document.getElementById('change-middlename');
  const NEW_CONTACT = document.querySelector('.new-contact');
  const NEW_CONTACT_ROWS = document.querySelectorAll('.new-contact__row');
  // const ERROR = document.getElementById(`change-error`);
  const CANCEL_BTN = document.getElementById('change-cancel');


  // if (DATA.message === 'Not Found') {
  //   console.log(DATA)
  //   ERROR.textContent = 'Клиент не найден';
  // }

  if (URL_PARAM.hash === '' || URL_PARAM.hash.substring(1) === data.id) {
    URL_PARAM.hash = `#${data.id}`;
    setLocation(`#${data.id}`);
  }

  if (NEW_CONTACT) {
    NEW_CONTACT_ROWS.forEach((e) => {
      e.remove();
    })
    NEW_CONTACT.remove();
  }

  MODAL_NAME.classList.add('modal--visible');
  CHANGE_MODAL_BOX.classList.add('modal__box--visible');
  BODY.classList.add('noscroll');

  data.id.length > 10 ? MODAL_ID.textContent = `ID: ${data.id.substring(4)}` : MODAL_ID.textContent = `ID: ${data.id}`
  MODAL_ID.setAttribute('href', URL_PARAM);
  MODAL_ID.setAttribute('client-id', `${data.id}`);
  SURNAME.value = data.surname;
  NAME.value = data.name;
  MIDDLENAME.value = data.lastName;

  if (data.contacts.length > 0) {
    FORM.after(NEW_CONTACT_BOX);

    for (let q = 0; q < data.contacts.length; ++q) {
      createNewContact(MODAL, data.contacts[q].value, data.contacts[q].type);
    }
  }

  const BTN = document.querySelector(`.clients__table-row[client-id="${URL_PARAM.hash.substring(1)}"]`).getAttribute('client-id')

  CANCEL_BTN.addEventListener('click', () => {
    clearAddForm('change');
    openDeleteModal(e ? e : BTN);
  });
}

export function setLocation(curLoc) {
  try {
    history.pushState(null, null, curLoc);
    return;
  } catch (e) { }
  location.hash = curLoc;
}

async function removeContactFromList(id) {
  const RESPONSE = await fetch(`http://localhost:3005/api/clients/${id}`, {
    method: 'DELETE',
  });
  const RESULT = RESPONSE.json();

  return RESULT;
}

export async function getClientsList() {
  const RESPONSE = await fetch('http://localhost:3005/api/clients');
  const RESULT = RESPONSE.json();

  return RESULT;
}

export async function editClientData(id, data) {
  const RESPONSE = await fetch(`http://localhost:3005/api/clients/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  const RESULT = await RESPONSE.json();

  return RESULT;
}

async function getClientData(id) {
  const RESPONSE = await fetch(`http://localhost:3005/api/client/${id}`);
  const RESULT = RESPONSE.json();

  return RESULT;
}
