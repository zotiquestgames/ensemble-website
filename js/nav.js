(function () {
  var STORAGE_KEY = 'ensemble-theme';
  var root = document.documentElement;

  if (localStorage.getItem(STORAGE_KEY) === 'dark') {
    root.setAttribute('data-theme', 'dark');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var themeToggle = document.getElementById('themeToggle');
    var menuToggle = document.getElementById('menuToggle');
    var siteNav = document.getElementById('siteNav');

    function syncThemeLabel() {
      themeToggle.textContent = root.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark';
    }
    syncThemeLabel();

    themeToggle.addEventListener('click', function () {
      var isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem(STORAGE_KEY, 'light');
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem(STORAGE_KEY, 'dark');
      }
      syncThemeLabel();
    });

    if (menuToggle && siteNav) {
      menuToggle.addEventListener('click', function () {
        var open = siteNav.classList.toggle('is-open');
        menuToggle.textContent = open ? '✕' : '☰';
        menuToggle.setAttribute('aria-expanded', String(open));
      });
    }
  });
})();
