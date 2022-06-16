const itemMenu = () => {
  const navList = document.querySelectorAll('.nav-link');
  const aboutDiv = document.querySelector('#about');
  const petsDiv = document.querySelector('#pets');
  const helpDiv = document.querySelector('#help');
  const contactsDiv = document.querySelector('#contacts');

  navList.forEach(item => {
    item.addEventListener('click', () => {
      navList.forEach(link => {
        link.classList.remove('active-nav-link');
      });
      item.classList.add('active-nav-link');
    })
  });

  //изменяем активность link menu при прокрутке по странице
  window.addEventListener('scroll', () => {
    const customerScroll = window.scrollY;

    const aboutDivPosition = aboutDiv.getBoundingClientRect().top + window.scrollY;
    const petsDivPosition = petsDiv.getBoundingClientRect().top + window.scrollY;
    const helpDivPosition = helpDiv.getBoundingClientRect().top + window.scrollY;
    const contactsDivPosition = contactsDiv.getBoundingClientRect().top + window.scrollY;

    const changeLinkActiveClass = (item) => {
      navList.forEach(item => {
        item.classList.remove('active-nav-link');
      });

      navList[item].classList.add('active-nav-link');
    };

    if (customerScroll > (aboutDivPosition - 100) || customerScroll < (aboutDivPosition + 100)) {
      changeLinkActiveClass(0);
    } else if (customerScroll > (petsDivPosition - 100) || customerScroll < (petsDivPosition + 100)) {
      changeLinkActiveClass(1);
    } else if (customerScroll > (helpDivPosition - 100) || customerScroll < (helpDivPosition + 100)) {
      changeLinkActiveClass(2);
    } else if (customerScroll > (contactsDivPosition - 100) || customerScroll < (contactsDivPosition + 100)) {
      changeLinkActiveClass(3);
    }
  });
};

export default itemMenu;