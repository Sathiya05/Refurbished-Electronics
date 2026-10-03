/* =============================================================
   ReTech — navbar.js
   Injects the shared sticky navigation bar with the Home
   dropdown, mobile menu, theme toggle and RTL toggle.
   Every page only needs: <div id="navbar"></div>
   (No Products dropdown, no search, no cart icon by design.)
   ============================================================= */
(function (global) {
  'use strict';

  var RT = global.ReTech || {};
  var MOUNT_ID = 'navbar';
  var THEME_KEY = 'retech.theme';
  var DIR_KEY = 'retech.dir';

  var homeDropdownItems = [
    { label: 'Home 1', href: 'index.html', desc: 'Classic storefront layout', icon: 'home' },
    { label: 'Home 2', href: 'home2.html', desc: 'Deals hero with top picks', icon: 'spark' }
  ];

  var links = [
    { label: 'Home', href: 'index.html', key: 'home', hasDropdown: true, items: homeDropdownItems, menuId: 'home-menu' },
    { label: 'About', href: 'about.html', key: 'about' },
    { label: 'Products', href: 'products.html', key: 'products' },
    { label: 'Warranty & Quality', href: 'warranty-quality.html', key: 'warranty' },
    { label: 'Sell Your Device', href: 'sell-device.html', key: 'sell' },
    { label: 'Contact', href: 'contact.html', key: 'contact' }
  ];

  var icons = {
    chevron: '<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>',
    home: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"/>',
    spark: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>',
    menu: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>',
    close: '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>',
    check: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    sun: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>',
    moon: '<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0012 21.75a9.753 9.753 0 009.752-6.748z"/>',
    rtl: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.008v.008H3.75V6.75zm0 5.25h.008v.008H3.75V12zm0 5.25h.008v.008H3.75v-.008z"/>'
  };

  function icon(name, cls) {
    return (
      '<svg class="' +
      (cls || 'h-5 w-5') +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false">' +
      icons[name] +
      '</svg>'
    );
  }

  function currentFile() {
    var path = global.location.pathname.split('/').pop();
    return path || 'index.html';
  }

  var ACTIVE_FILES = {
    home: ['index.html', 'home2.html'],
    products: ['products.html', 'product-details.html'],
    warranty: ['warranty-quality.html'],
    sell: ['sell-device.html'],
    about: ['about.html'],
    contact: ['contact.html']
  };

  function isActive(key) {
    var file = currentFile().split('?')[0].toLowerCase();
    return (ACTIVE_FILES[key] || [(key + '.html')]).indexOf(file) > -1;
  }

  function isCurrentPage(href) {
    return currentFile().split('?')[0].toLowerCase() === String(href).split('?')[0].toLowerCase();
  }

  function logoMarkup() {
    return (
      '<a href="index.html" class="group flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700" aria-label="' +
      (RT.store ? RT.store.name : 'ReTech') +
      ' — home">' +
      '<span class="grid h-10 w-10 place-items-center rounded-xl bg-brand-700 text-white shadow-sm transition-transform duration-300 group-hover:-rotate-6">' +
      '<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false">' +
      '<path stroke-linecap="round" stroke-linejoin="round" d="M7 19H5.5A2.5 2.5 0 013 16.5v-9A2.5 2.5 0 015.5 5H11a2 2 0 012 2v12a2 2 0 01-2 2m-4 0a2 2 0 002 2h4m-6-2h6m6 0h1.5A2.5 2.5 0 0021 16.5v-6A2.5 2.5 0 0018.5 8H15m-2-3h4.5A2.5 2.5 0 0120 7.5v.5a2 2 0 01-2 2h-5V5z"/>' +
      '</svg></span>' +
      '<span class="flex flex-col leading-none">' +
      '<span class="text-xl font-extrabold tracking-tight text-ink">ReTech</span>' +
      '<span class="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-700">Certified Refurbished</span>' +
      '</span></a>'
    );
  }

  function desktopLinksMarkup() {
    return links
      .map(function (link) {
        var active = isActive(link.key);
        if (link.hasDropdown) {
          var menuId = link.menuId || (link.key + '-menu');
          var items = link.items || [];
          return (
            '<div class="relative" data-dropdown>' +
            '<button type="button" data-dropdown-trigger aria-expanded="false" aria-haspopup="true" aria-controls="' + menuId + '" ' +
            'aria-current="' + (active ? 'page' : 'false') + '" ' +
            'class="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ' +
            (active ? 'bg-sage-100 text-brand-700' : 'text-ink hover:text-brand-700') +
            ' focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' +
            link.label +
            '<span data-chevron class="transition-transform duration-200">' +
            icon('chevron', 'h-4 w-4') +
            '</span></button>' +
            '<div id="' + menuId + '" data-dropdown-panel hidden ' +
            'class="absolute left-0 top-full z-50 mt-2 w-72 origin-top-left rounded-2xl border border-sage-200 bg-white p-2 shadow-card">' +
            items
              .map(function (item) {
                var itemActive = isCurrentPage(item.href);
                return (
                  '<a href="' +
                  item.href +
                  '" data-dropdown-link aria-current="' +
                  (itemActive ? 'page' : 'false') +
                  '" class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ' +
                  (itemActive ? 'bg-sage-100' : 'hover:bg-sage-100') +
                  ' focus-visible:bg-sage-100 focus-visible:outline-none">' +
                  '<span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">' +
                  icon(item.icon, 'h-5 w-5') +
                  '</span>' +
                  '<span><span class="block text-sm font-semibold ' +
                  (itemActive ? 'text-brand-700' : 'text-ink') +
                  '">' +
                  item.label +
                  '</span></span></a>'
                );
              })
              .join('') +
            '</div></div>'
          );
        }
        return (
          '<a href="' +
          link.href +
          '" ' +
          'aria-current="' +
          (active ? 'page' : 'false') +
          '" class="rounded-lg px-3 py-2 text-sm font-semibold transition-colors ' +
          (active ? 'bg-sage-100 text-brand-700' : 'text-ink hover:text-brand-700') +
          ' focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' +
          link.label +
          '</a>'
        );
      })
      .join('');
  }

  function mobileLinksMarkup() {
    return links
      .map(function (link) {
        var active = isActive(link.key);
        if (link.hasDropdown) {
          var mobileId = 'mobile-' + (link.menuId || (link.key + '-menu'));
          var items = link.items || [];
          return (
            '<div class="rounded-2xl border border-sage-200 ' + (active ? 'border-brand-700/40 bg-sage-100' : 'bg-sage-50') + '">' +
            '<button type="button" data-mobile-dropdown-trigger aria-expanded="false" aria-controls="' + mobileId + '" ' +
            'aria-current="' + (active ? 'page' : 'false') + '" ' +
            'class="flex w-full items-center justify-between gap-2 rounded-2xl px-4 py-3 text-left text-base font-semibold transition-colors ' +
            (active ? 'text-brand-700' : 'text-ink') +
            ' focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' +
            link.label +
            '<span data-mobile-chevron class="transition-transform duration-200">' +
            icon('chevron', 'h-4 w-4') +
            '</span></button>' +
            '<div id="' + mobileId + '" hidden class="space-y-1 px-2 pb-3">' +
            items
              .map(function (item) {
                var itemActive = isCurrentPage(item.href);
                return (
                  '<a href="' +
                  item.href +
                  '" data-mobile-link aria-current="' +
                  (itemActive ? 'page' : 'false') +
                  '" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ' +
                  (itemActive ? 'bg-white font-bold text-brand-700' : 'text-slate-700 hover:bg-white hover:text-brand-700') +
                  ' focus-visible:bg-white focus-visible:outline-none">' +
                  '<span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">' +
                  icon(item.icon, 'h-4 w-4') +
                  '</span>' +
                  item.label +
                  '</a>'
                );
              })
              .join('') +
            '</div></div>'
          );
        }
        return (
          '<a href="' +
          link.href +
          '" data-mobile-link aria-current="' +
          (active ? 'page' : 'false') +
          '" class="block rounded-2xl px-4 py-3 text-base font-semibold transition-colors ' +
          (active ? 'bg-brand-700 text-white' : 'text-ink hover:bg-sage-100') +
          ' focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' +
          link.label +
          '</a>'
        );
      })
      .join('');
  }

  function ensureThemeStyles() {
    if (document.getElementById('retech-theme-styles')) return;
    var style = document.createElement('style');
    style.id = 'retech-theme-styles';
    style.textContent =
      'header[data-navbar]{position:-webkit-sticky;position:sticky;top:0;z-index:50}' +
      '#navbar{position:sticky;top:0;z-index:50}' +
      'html.dark{color-scheme:dark}' +
      'html.dark body{background-color:#0f172a!important;color:#e2e8f0!important}' +
      'html.dark header[data-navbar]{background-color:rgba(15,23,42,.95)!important;border-color:#1e293b!important}' +
      'html.dark .bg-white{background-color:#1e293b!important}' +
      'html.dark .bg-sage-50{background-color:#0f172a!important}' +
      'html.dark .bg-sage-100{background-color:#16202e!important}' +
      'html.dark .text-ink{color:#f1f5f9!important}' +
      'html.dark .text-slate-700,html.dark .text-slate-600{color:#cbd5e1!important}' +
      'html.dark .text-slate-500,.html.dark .text-slate-400{color:#94a3b8!important}' +
      'html.dark .border-sage-200{border-color:#334155!important}' +
      'html.dark .text-brand-700{color:#86efac!important}' +
      'html.dark .text-brand-800{color:#bbf7d0!important}' +
      'html.dark .bg-sage-100.text-brand-700,html.dark .bg-sage-100 .text-brand-700{color:#86efac!important}' +
      'html.dark img{filter:brightness(.92)}' +
      'html.dark input,html.dark select,html.dark textarea{background-color:#0f172a!important;color:#e2e8f0!important;border-color:#334155!important}';
    document.head.appendChild(style);
  }

  function getStored(key, fallback) {
    try {
      return global.localStorage.getItem(key) || fallback;
    } catch (err) {
      return fallback;
    }
  }

  function setStored(key, value) {
    try {
      global.localStorage.setItem(key, value);
    } catch (err) {
      /* storage unavailable — ignore */
    }
  }

  function template() {
    return (
      '<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">Skip to main content</a>' +
      '<header data-navbar class="sticky top-0 z-50 border-b border-sage-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">' +
      '<div class="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-4 sm:px-6 xl:h-20 xl:px-8">' +
      logoMarkup() +
      '<nav aria-label="Main" class="hidden flex-1 items-center justify-center gap-0.5 text-center xl:flex">' +
      desktopLinksMarkup() +
      '</nav>' +
      '<div class="ml-auto flex items-center gap-1.5 sm:gap-2">' +
      /* Theme toggle */
      '<button type="button" data-theme-toggle aria-pressed="false" aria-label="Switch to dark theme" title="Toggle dark / light theme" ' +
      'class="hidden xl:grid h-11 w-11 place-items-center rounded-xl border border-sage-200 text-ink transition-colors hover:border-brand-700 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' +
      '<span data-theme-icon-moon>' + icon('moon', 'h-5 w-5') + '</span>' +
      '<span data-theme-icon-sun hidden>' + icon('sun', 'h-5 w-5') + '</span>' +
      '</button>' +
      /* RTL toggle */
      '<button type="button" data-rtl-toggle aria-pressed="false" aria-label="Switch to right-to-left layout" title="Toggle RTL / LTR layout" ' +
      'class="hidden xl:flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-xl border border-sage-200 px-2.5 text-ink transition-colors hover:border-brand-700 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' +
      icon('rtl', 'h-5 w-5') +
      '<span data-rtl-label class="text-xs font-bold">RTL</span>' +
      '</button>' +
      /* Navbar CTA */
      '<a href="sell-device.html" class="hidden items-center gap-1.5 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 xl:inline-flex">' +
      icon('check', 'h-4 w-4') +
      'Sell Your Device</a>' +
      /* Hamburger */
      '<button type="button" data-menu-open aria-expanded="false" aria-controls="mobile-menu" aria-label="Open main menu" ' +
      'class="grid h-11 w-11 place-items-center rounded-xl border border-sage-200 text-ink transition-colors hover:border-brand-700 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 xl:hidden">' +
      '<span data-menu-icon-open>' +
      icon('menu', 'h-5 w-5') +
      '</span>' +
      '<span data-menu-icon-close hidden>' +
      icon('close', 'h-5 w-5') +
      '</span>' +
      '</button>' +
      '</div></div>' +
      /* Mobile menu */
      '<div id="mobile-menu" hidden class="border-t border-sage-200 bg-white xl:hidden">' +
      '<div class="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">' +
      mobileLinksMarkup() +
      '<a href="sell-device.html" data-mobile-link class="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-brand-700 px-4 py-3 text-base font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' +
      'Sell Your Device</a>' +
      '<div class="mt-4 flex items-center gap-3 border-t border-sage-200 pt-4">' +
      '<button type="button" data-theme-toggle aria-pressed="false" aria-label="Switch to dark theme" title="Toggle dark / light theme" class="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-sage-200 text-ink transition-colors hover:border-brand-700 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' +
      '<span data-theme-icon-moon>' + icon('moon', 'h-5 w-5') + '</span>' +
      '<span data-theme-icon-sun hidden>' + icon('sun', 'h-5 w-5') + '</span>' +
      '<span class="text-sm font-semibold">Theme</span>' +
      '</button>' +
      '<button type="button" data-rtl-toggle aria-pressed="false" aria-label="Switch to right-to-left layout" title="Toggle RTL / LTR layout" class="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-sage-200 text-ink transition-colors hover:border-brand-700 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' +
      icon('rtl', 'h-5 w-5') +
      '<span data-rtl-label class="text-sm font-semibold">RTL</span>' +
      '</button>' +
      '</div>' +
      '</div></div>' +
      '</header>'
    );
  }

  function init() {
    var mount = document.getElementById(MOUNT_ID);
    if (!mount) return;

    ensureThemeStyles();
    mount.innerHTML = template();

    var header = mount.querySelector('[data-navbar]');
    var menuPanel = document.getElementById('mobile-menu');
    var menuButton = mount.querySelector('[data-menu-open]');
    var themeButtons = Array.prototype.slice.call(mount.querySelectorAll('[data-theme-toggle]'));
    var rtlButtons = Array.prototype.slice.call(mount.querySelectorAll('[data-rtl-toggle]'));

    /* ---------- shadow on scroll ---------- */
    var onScroll = function () {
      header.classList.toggle('is-scrolled', global.scrollY > 8);
    };
    global.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- mobile menu ---------- */
    function setMenu(open) {
      menuPanel.hidden = !open;
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close main menu' : 'Open main menu');
      menuButton.querySelector('[data-menu-icon-open]').hidden = open;
      menuButton.querySelector('[data-menu-icon-close]').hidden = !open;
    }

    menuButton.addEventListener('click', function () {
      setMenu(menuPanel.hidden);
    });

    /* ---------- nested mobile dropdowns ---------- */
    var mobileTriggers = Array.prototype.slice.call(mount.querySelectorAll('[data-mobile-dropdown-trigger]'));
    mobileTriggers.forEach(function (trigger) {
      var subId = trigger.getAttribute('aria-controls');
      var sub = subId ? document.getElementById(subId) : null;
      var chev = trigger.querySelector('[data-mobile-chevron]');
      if (!sub) return;
      trigger.addEventListener('click', function () {
        var open = sub.hidden;
        sub.hidden = !open;
        trigger.setAttribute('aria-expanded', String(open));
        if (chev) chev.classList.toggle('rotate-180', open);
      });
    });

    /* ---------- desktop dropdowns ---------- */
    var ddWraps = Array.prototype.slice.call(mount.querySelectorAll('[data-dropdown]'));
    function setDropdownByWrap(wrap, open) {
      var panel = wrap.querySelector('[data-dropdown-panel]');
      var trigger = wrap.querySelector('[data-dropdown-trigger]');
      var chev = wrap.querySelector('[data-chevron]');
      if (!panel || !trigger) return;
      panel.hidden = !open;
      trigger.setAttribute('aria-expanded', String(open));
      if (chev) chev.classList.toggle('rotate-180', open);
    }
    function closeAllDropdowns(exceptWrap) {
      ddWraps.forEach(function (w) { if (w !== exceptWrap) setDropdownByWrap(w, false); });
    }
    ddWraps.forEach(function (wrap) {
      var trigger = wrap.querySelector('[data-dropdown-trigger]');
      var panel = wrap.querySelector('[data-dropdown-panel]');
      if (!trigger || !panel) return;
      trigger.addEventListener('click', function (event) {
        event.stopPropagation();
        var willOpen = panel.hidden;
        closeAllDropdowns(wrap);
        setDropdownByWrap(wrap, willOpen);
      });
      trigger.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          closeAllDropdowns(wrap);
          setDropdownByWrap(wrap, true);
          var first = panel.querySelector('a');
          if (first) first.focus();
        }
      });
      panel.addEventListener('keydown', function (event) {
        var items = Array.prototype.slice.call(panel.querySelectorAll('a'));
        var index = items.indexOf(document.activeElement);
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          items[(index + 1 + items.length) % items.length].focus();
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          if (index <= 0) trigger.focus();
          else items[index - 1].focus();
        }
      });
    });

    /* ---------- theme toggle (dark / light) ---------- */
    function applyTheme(theme) {
      var dark = theme === 'dark';
      document.documentElement.classList.toggle('dark', dark);
      themeButtons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', String(dark));
        btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
        btn.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
        var moonIcon = btn.querySelector('[data-theme-icon-moon]');
        var sunIcon = btn.querySelector('[data-theme-icon-sun]');
        if (moonIcon) moonIcon.hidden = dark;
        if (sunIcon) sunIcon.hidden = !dark;
      });
    }

    /* ---------- RTL toggle ---------- */
    function applyDir(dir) {
      var rtl = dir === 'rtl';
      document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
      rtlButtons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', String(rtl));
        btn.setAttribute('aria-label', rtl ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout');
        btn.setAttribute('title', rtl ? 'Switch to LTR layout' : 'Switch to RTL layout');
        var label = btn.querySelector('[data-rtl-label]');
        if (label) label.textContent = rtl ? 'LTR' : 'RTL';
      });
    }

    applyTheme(getStored(THEME_KEY, 'light'));
    applyDir(getStored(DIR_KEY, document.documentElement.getAttribute('dir') || 'ltr'));

    themeButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        setStored(THEME_KEY, next);
        applyTheme(next);
      });
    });

    rtlButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        setStored(DIR_KEY, next);
        applyDir(next);
      });
    });

    /* ---------- close behaviour ---------- */
    document.addEventListener('click', function (event) {
      ddWraps.forEach(function (wrap) {
        var panel = wrap.querySelector('[data-dropdown-panel]');
        if (panel && !panel.hidden && !wrap.contains(event.target)) setDropdownByWrap(wrap, false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      var openWrap = null;
      ddWraps.forEach(function (wrap) {
        var panel = wrap.querySelector('[data-dropdown-panel]');
        if (panel && !panel.hidden) {
          setDropdownByWrap(wrap, false);
          if (!openWrap) openWrap = wrap;
        }
      });
      if (openWrap) {
        var t = openWrap.querySelector('[data-dropdown-trigger]');
        if (t) t.focus();
      }
      if (!menuPanel.hidden) {
        setMenu(false);
        menuButton.focus();
      }
    });

    /* ---------- close menu on navigation ---------- */
    mount.addEventListener('click', function (event) {
      var link = event.target.closest('[data-mobile-link]');
      if (link) setMenu(false);
    });

    setMenu(false);
    closeAllDropdowns(null);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);



