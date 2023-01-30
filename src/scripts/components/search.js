const SEARCH = document.getElementById('search');
let SEARCH_LIST = document.getElementById('search-list');

SEARCH.addEventListener('input', (e) => {
  setTimeout(() => {
    search(e);
  }, 500);
});

async function search(e) {
  const SEARCH_DATA = await getSearchData(SEARCH.value)

  if (e.target.value) {
    SEARCH_LIST.classList.add('header__search-list--visible');

    if (SEARCH_DATA.length > 0) {
      let listArr = [];
      for (let i = 0; i < SEARCH_DATA.length; ++i) {
        let contactPhone = '';
        let contactMail = '';

        if (SEARCH_DATA[i].contacts) {
          for (let q = 0; q < SEARCH_DATA[i].contacts.length; ++q) {
            if (SEARCH_DATA[i].contacts[q].type === 'Телефон') {
              contactPhone = `Телефон: ${SEARCH_DATA[i].contacts[q].value}`;
            }

            if (SEARCH_DATA[i].contacts[q].type === 'Email') {
              contactMail = `Email: ${SEARCH_DATA[i].contacts[q].value}`;
              if (contactMail.length > 25) {
                contactMail = `Email: ${SEARCH_DATA[i].contacts[q].value.substring(0,25)}...`;
              }
            }
          }
        }

        listArr.push(`<li class="header__search-item" client-id="${SEARCH_DATA[i].id}"><span class="header__search-text">${SEARCH_DATA[i].surname} ${SEARCH_DATA[i].name}</span><span class="header__search-conacts"><a href="tel:${contactPhone}" class="header__search-phone">${contactPhone}</a><a href="mailto:${contactMail}" class="header__search-mail">${contactMail}</a></span></li>`);
        SEARCH_LIST.innerHTML = listArr.join('');
      }
    } else {
      SEARCH_LIST.innerHTML = 'Нет совпадений';
    }

  }
  if (e.target.value === '') {
    SEARCH_LIST.innerHTML = '';
    SEARCH_LIST.classList.remove('header__search-list--visible');
  }

  const CLIENT_IN_SEARCH = document.querySelectorAll('.header__search-item');
  const CLIENT_IN_LIST = document.querySelectorAll('.clients__table-row');
  let clientId;

  CLIENT_IN_SEARCH.forEach((e) => {
    CLIENT_IN_LIST.forEach((e) => {
      e.classList.remove('clients__table-row--active');
    });

    e.addEventListener('mouseenter', (a) => {
      a.target.classList.add('header__search-item--active');
      clientId = a.target.getAttribute('client-id');

      CLIENT_IN_LIST.forEach((e) => {
        if (clientId === e.getAttribute('client-id')) {
          e.classList.add('clients__table-row--active');
        }
      });
    });

    e.addEventListener('mouseleave', (a) => {
      a.target.classList.remove('header__search-item--active');
      CLIENT_IN_LIST.forEach((e) => {
        e.classList.remove('clients__table-row--active');
      });
    });

    e.addEventListener('click', (a) => {
      window.location.href = '#' + clientId;
      window.scrollTo(window.scrollX, window.scrollY - 100);
      SEARCH.value = '';
      SEARCH_LIST.innerHTML = '';
      SEARCH_LIST.classList.remove('header__search-list--visible');

      setTimeout(() => {
        lineHighlight();
      }, 1500);

      function lineHighlight() {
        CLIENT_IN_LIST.forEach((e) => {
          if (clientId === e.getAttribute('client-id')) {
            e.classList.remove('clients__table-row--active');
          }
        });
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (SEARCH_LIST.childNodes.length > 0 && e.target !== SEARCH_LIST) {
      SEARCH.value = '';
      SEARCH_LIST.innerHTML = '';
      SEARCH_LIST.classList.remove('header__search-list--visible');
    }
  });
}

async function getSearchData(e) {
  const RESPONSE = await fetch(`http://localhost:3000/api/clients?search=${e}`);
  const RESULT = RESPONSE.json();

  return RESULT;
}
