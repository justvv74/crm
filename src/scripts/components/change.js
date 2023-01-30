import {NEW_CONTACT_BOX} from './list';
import {createNewContact, clearAddForm} from './add-client';

export const MODAL = 'change';
const BODY = document.querySelector('body');
const CHANGE_MODAL = document.getElementById('change-modal');
const CHANGE_MODAL_BOX = document.getElementById('change-modal-box');
const CHANGE_BTN_CLOSE = document.getElementById('change-modal-close');
const ADD_NEW_CONTACT_BTN = document.getElementById('change-add-contact');

CHANGE_BTN_CLOSE.addEventListener('click', () => {
  CHANGE_MODAL.classList.remove('modal--visible');
  CHANGE_MODAL_BOX.classList.remove('modal__box--visible');
  BODY.classList.remove('noscroll');
  clearAddForm('change');
});

CHANGE_MODAL.addEventListener('click', (e) => {
  if (e.target === CHANGE_MODAL) {
    CHANGE_MODAL.classList.remove('modal--visible');
    CHANGE_MODAL_BOX.classList.remove('modal__box--visible');
    BODY.classList.remove('noscroll');
    clearAddForm('change');
  }
});

ADD_NEW_CONTACT_BTN.addEventListener('click', () => {
  if (!document.querySelector('.new-contact')) {
    document.getElementById('change-form').after(NEW_CONTACT_BOX);
    createNewContact(MODAL);
  } else {
    createNewContact(MODAL);
  }
  if (NEW_CONTACT_BOX.childNodes.length > 9) {
    document.getElementById('change-add-contact').classList.add('modal__add-input--invis');
    NEW_CONTACT_BOX.classList.add('new-contact--full');
  }
});
