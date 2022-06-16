const itemMenu = () => {
  const navList = document.querySelectorAll('.nav-link');

  navList.forEach(item => {
    item.addEventListener('click', () => {
      navList.forEach(link => {
        link.classList.remove('active-nav-link');
      });
      item.classList.add('active-nav-link');
    })
  });

};

export default itemMenu;