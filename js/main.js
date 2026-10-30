/* Huntley Berry Farm homepage behaviour
   - sticky header state
   - mobile menu drawer
   - scroll-triggered reveals (respects prefers-reduced-motion)
   - hero video fallback */
(function () {
  'use strict';
  document.body.classList.add('has-js');

  var header = document.querySelector('.header');
  var drawer = document.getElementById('drawer');
  var openBtn = document.querySelector('[data-menu-open]');
  var closeEls = document.querySelectorAll('[data-menu-close]');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header: solid once the page has scrolled */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile drawer */
  function setMenu(open) {
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      var first = drawer.querySelector('a, button');
      if (first) first.focus();
    } else {
      openBtn.focus();
    }
  }
  openBtn.addEventListener('click', function () { setMenu(true); });
  closeEls.forEach(function (el) { el.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('open')) setMenu(false);
  });

  /* Scroll reveals */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Hero video: pause for reduced-motion users, hide if it cannot play */
  var video = document.querySelector('.hero video');
  if (video) {
    if (reduce) {
      video.removeAttribute('autoplay');
      video.pause();
    } else {
      var p = video.play();
      if (p && p.catch) p.catch(function () { video.style.display = 'none'; });
    }
    video.addEventListener('error', function () { video.style.display = 'none'; });
  }
})();
