'use strict';

let toggle = document.querySelector('.main-nav__toggle');
let mainNav = document.querySelector('.main-nav');

let header = document.querySelector('.page-header');

let mqMobileOnly = window.matchMedia('(max-width: 767px)');
let headerHeight;
let scrolledToFixed = false;
let hideTime = 1500;
let hideTimeout = null;
let lastScrollPosition = 0;

toggle.addEventListener('click', (e) => {
  mainNav.classList.toggle('main-nav--active');

  if (mainNav.classList.contains('main-nav--active')) {
    document.body.style.overflow = 'hidden';
    cancelHidingHeader();
  } else {
    document.body.style.overflow = 'auto';
    if (scrollY >= headerHeight && scrolledToFixed) makeHidingHeader();
  }
});

if (mqMobileOnly.matches) moMatchesHandler();

function moMatchesHandler() {
  headerHeight = header.offsetHeight;
  window.addEventListener('scroll', stickyHeaderScrollHandler);
  window.addEventListener('resize', stickyHeaderResizeHandler);
}
function moNotMatchesHandler() {
  fixedHeaderEnd();
  window.removeEventListener('scroll', stickyHeaderScrollHandler);
  window.removeEventListener('resize', stickyHeaderResizeHandler);
}

function fixedHeaderStart() {
  lastScrollPosition = scrollY;
  makeHidingHeader();
  document.body.style.paddingTop = headerHeight + 'px';
  header.classList.add('page-header--fixed');
  scrolledToFixed = true;

}

function hideHeaderScroll() {
  if (scrollY < lastScrollPosition) {
    clearTimeout(hideTimeout);
    showHeader();
    hideTimeout = setTimeout(() => {
      hideHeader();
    }, hideTime);
  }

  lastScrollPosition = scrollY;
}

function showHeader() {
  header.classList.remove('page-header--hide');
}

function hideHeader() {
  header.classList.add('page-header--hide');
}

function makeHidingHeader() {
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    hideHeader();
  }, hideTime);

  window.addEventListener('scroll', hideHeaderScroll);
}

function cancelHidingHeader() {
  header.classList.remove('page-header--hide');
  window.removeEventListener('scroll', hideHeaderScroll);
  clearTimeout(hideTimeout);
  showHeader();
}

function fixedHeaderEnd() {
  cancelHidingHeader();
  header.classList.remove('page-header--fixed');
  document.body.style.paddingTop = 0 + 'px';
  document.body.style.overflow = '';
  mainNav.classList.remove('main-nav--active');
  scrolledToFixed = false;
}

function stickyHeaderScrollHandler(e) {
  if (scrollY >= headerHeight && !scrolledToFixed) {
    fixedHeaderStart()
  } else if (scrollY < headerHeight && scrolledToFixed) {
    fixedHeaderEnd();
  }
}

function stickyHeaderResizeHandler(e) {
  headerHeight = header.offsetHeight;
}

mqMobileOnly.addListener(() => {
  if (mqMobileOnly.matches) {
    moMatchesHandler();
  } else {
    moNotMatchesHandler();
  }
});



// swiper

let swiper = new Swiper('.reviews__slider', {
  pagination: {
    el: '.reviews__pagination',
    clickable: true
  },

  spaceBetween: 50,

  loop: true,
});


// gallery swiper

let mqMax960px = matchMedia('(max-width: 960px)');
let gallerySwiper;
let gallery = document.body.querySelector('.gallery');

gallerySwiperHandler();

mqMax960px.addListener(gallerySwiperHandler);

function gallerySwiperHandler() {
  if (mqMax960px.matches) {
    gallerySwiper = new Swiper('.gallery', {

      spaceBetween: 50,

      loop: true,

      pagination: {
        el: '.gallery__pagination',
        clickable: true
      },
    });

    gallery.addEventListener('click', galleryCancelLinkDefault);
  } else {
    if (gallerySwiper) gallerySwiper.destroy();
    gallery.removeEventListener('click', galleryCancelLinkDefault);
  }
}

function galleryCancelLinkDefault(e) {
  if (!e.target.closest('a.gallery__link')) return;
  e.preventDefault();
}

// order__input

let orderInput = document.body.querySelector('.order__input');
let orderInputPlaceholderText = orderInput.placeholder;

orderInput.addEventListener('focus', (e) => {
  orderInput.placeholder = '';
});

orderInput.addEventListener('blur', (e) => {
  orderInput.placeholder = orderInputPlaceholderText;
});


