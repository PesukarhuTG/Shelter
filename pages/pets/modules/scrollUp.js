function scrollUp() {
  const btnTop = document.querySelector('.btn-up');
  const navList = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const clientHeight = document.documentElement.clientHeight;
    btnTop.style.display = (window.scrollY > clientHeight / 4) ? 'block' : '';
  });

  btnTop.addEventListener('click', () => {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    navList.forEach(item => {
      item.classList.remove('active-nav-link');
    });

    navList[1].classList.add('active-nav-link');
  });
}

export default scrollUp;