/* main.js — runs on all pages */
document.addEventListener('click', function(e) {
  var nav = document.getElementById('siteNav');
  var btn = document.querySelector('.nav-toggle');
  if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target)) {
    nav.classList.remove('open');
  }
});
