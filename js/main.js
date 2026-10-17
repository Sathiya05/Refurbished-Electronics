/* =============================================================
   ReTech — main.js
   Shared frontend runtime used on every page:
     • reusable product card renderer
     • cart state (localStorage) + cart drawer
     • toast notifications
     • FAQ accordion
     • reveal-on-scroll, counters, smooth anchors, form helpers
   ============================================================= */
(function (global) {
  'use strict';

  var RT = global.ReTech || {};
  var fmt = RT.formatPrice || function (n) { return '₹' + n; };
  var CART_KEY = 'retech.cart.v1';
  var reduceMotion = global.matchMedia
    ? global.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  /* ---------------------------------------------------------
     Icons used by the shared components
     --------------------------------------------------------- */
  var ICON = {
    star: '<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>',
    shield: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>',
    check: '<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>',
    cart: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0Zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0Z"/>',
    close: '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>',
    trash: '<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L5.772 5.79m13.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>',
    plus: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>',
    minus: '<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14"/>'
  };

  function icon(name, cls) {
    return (
      '<svg class="' + (cls || 'h-4 w-4') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true" focusable="false">' +
      ICON[name] +
      '</svg>'
    );
  }

  function starsMarkup(rating) {
    var stars = RT.starsFromRating ? RT.starsFromRating(rating) : '★★★★★';
    return (
      '<span class="inline-flex items-center gap-0.5 text-accent-500" aria-hidden="true">' +
      Array.prototype.map
        .call(stars, function (s) {
          return '<span class="text-sm leading-none">' + s + '</span>';
        })
        .join('') +
      '</span>'
    );
  }

  /* ---------------------------------------------------------
     Reusable product card (used on home, products, related)
     --------------------------------------------------------- */
  function productCard(p) {
    var discount = p.discount || RT.discountPercent(p.price, p.originalPrice);
    return (
      '<article class="group flex h-full flex-col overflow-hidden rounded-2xl border border-sage-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover" data-product-card data-id="' +
      p.id +
      '">' +

      '<a href="product-details.html?id=' + p.id + '" class="relative block aspect-[4/3] overflow-hidden bg-sage-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' +
      '<img src="' + p.image + '" alt="' + p.brand + ' ' + p.name + ' refurbished' + (p.category === 'Laptops' ? ' laptop' : p.category === 'Phones' ? ' smartphone' : p.category === 'Tablets' ? ' tablet' : ' accessory') + '" width="800" height="600" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]">' +
      '<span class="absolute left-3 top-3 rounded-lg bg-accent-500 px-2 py-1 text-xs font-bold text-white shadow-sm">' +
      discount +
      '% OFF</span>' +
      '<span class="absolute right-3 top-3 rounded-lg border border-sage-200 bg-white/95 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-700">' +
      p.condition +
      '</span>' +
      '<span class="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center rounded-xl bg-brand-700 px-3 py-2 text-xs font-semibold text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">View Details</span>' +
      '</a>' +

      '<div class="flex flex-1 flex-col p-4 sm:p-5">' +
      '<p class="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700">' + p.brand + '</p>' +
      '<h3 class="mt-1 line-clamp-2 text-base font-bold leading-snug text-ink">' +
      '<a href="product-details.html?id=' + p.id + '" class="rounded transition-colors hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' + p.name + '</a>' +
      '</h3>' +

      '<div class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">' +
      starsMarkup(p.rating) +
      '<span class="text-xs text-slate-500">' + RT.formatRating(p.rating) + ' · ' + p.reviews + ' reviews</span>' +
      '</div>' +

      '<div class="mt-3 flex flex-wrap items-baseline gap-2">' +
      '<span class="text-lg font-extrabold text-ink">' + fmt(p.price) + '</span>' +
      '<span class="text-sm text-slate-400 line-through">' + fmt(p.originalPrice) + '</span>' +
      '</div>' +

      '<div class="mt-3 flex items-center gap-2 text-xs font-semibold text-brand-800">' +
      '<span class="inline-flex items-center gap-1 rounded-lg bg-sage-100 px-2 py-1">' + icon('shield', 'h-3.5 w-3.5 text-brand-700') + p.warranty + ' warranty</span>' +
      '<span class="text-slate-500">' + p.storage + '</span>' +
      '</div>' +

      '<div class="mt-auto flex flex-col gap-2 pt-4">' +
      '<button type="button" data-add-to-cart="' + p.id + '" class="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' +
      icon('cart', 'h-4 w-4') + 'Add to Cart</button>' +
      '<a href="product-details.html?id=' + p.id + '" class="flex min-h-11 w-full items-center justify-center rounded-xl border border-sage-200 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-700 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">Details</a>' +
      '</div></div></article>'
    );
  }

  /* ---------------------------------------------------------
     Toasts
     --------------------------------------------------------- */
  var toastHost = null;
  function ensureToastHost() {
    if (toastHost && document.body.contains(toastHost)) return toastHost;
    toastHost = document.createElement('div');
    toastHost.className =
      'pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex flex-col items-center gap-2 p-4 sm:bottom-6 sm:right-6 sm:left-auto sm:items-end';
    toastHost.setAttribute('aria-live', 'polite');
    toastHost.setAttribute('aria-atomic', 'false');
    document.body.appendChild(toastHost);
    return toastHost;
  }

  function toast(message, tone) {
    var host = ensureToastHost();
    var styles = {
      success: 'bg-brand-700 text-white',
      info: 'bg-ink text-white',
      warning: 'bg-accent-500 text-white',
      error: 'bg-red-600 text-white'
    };
    var el = document.createElement('div');
    el.className =
      'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ' +
      (styles[tone] || styles.success) +
      ' transition duration-300 opacity-0 translate-y-2';
    el.innerHTML =
      '<span class="mt-0.5 shrink-0">' +
      icon(tone === 'error' ? 'close' : 'check', 'h-5 w-5') +
      '</span><span class="flex-1">' +
      message +
      '</span>';
    host.appendChild(el);
    global.requestAnimationFrame(function () {
      el.classList.remove('opacity-0', 'translate-y-2');
    });
    global.setTimeout(function () {
      el.classList.add('opacity-0', 'translate-y-2');
      global.setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 320);
    }, 3200);
  }

  /* ---------------------------------------------------------
     Cart
     --------------------------------------------------------- */
  var cart = (function () {
    var items = [];

    function read() {
      try {
        var raw = global.localStorage.getItem(CART_KEY);
        items = raw ? JSON.parse(raw) : [];
      } catch (err) {
        items = [];
      }
      if (!Array.isArray(items)) items = [];
      return items;
    }

    function write() {
      try {
        global.localStorage.setItem(CART_KEY, JSON.stringify(items));
      } catch (err) {
        /* storage unavailable (private mode / file://) — cart stays in memory */
      }
    }

    function broadcast() {
      document.dispatchEvent(
        new CustomEvent('retech:cart-updated', {
          bubbles: true,
          detail: { count: count(), items: items.slice(), subtotal: subtotal() }
        })
      );
    }

    function count() {
      return items.reduce(function (sum, item) {
        return sum + item.qty;
      }, 0);
    }

    function subtotal() {
      return items.reduce(function (sum, item) {
        return sum + item.price * item.qty;
      }, 0);
    }

    function add(id, qty) {
      var product = RT.getProductById ? RT.getProductById(id) : null;
      if (!product) return null;
      var amount = qty || 1;
      var existing = items.filter(function (item) {
        return item.id === product.id;
      })[0];
      if (existing) existing.qty = Math.min(existing.qty + amount, 10);
      else
        items.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          qty: amount
        });
      write();
      broadcast();
      return product;
    }

    function setQty(id, qty) {
      items = items
        .map(function (item) {
          if (String(item.id) === String(id)) item.qty = Math.max(1, Math.min(10, qty));
          return item;
        })
        .filter(function (item) {
          return item.qty > 0;
        });
      write();
      broadcast();
    }

    function remove(id) {
      items = items.filter(function (item) {
        return String(item.id) !== String(id);
      });
      write();
      broadcast();
    }

    function clear() {
      items = [];
      write();
      broadcast();
    }

    return {
      read: read,
      add: add,
      setQty: setQty,
      remove: remove,
      clear: clear,
      count: count,
      subtotal: subtotal,
      items: function () {
        return items.slice();
      },
      broadcast: broadcast
    };
  })();

  /* ---------------------------------------------------------
     Cart drawer
     --------------------------------------------------------- */
  var drawer = (function () {
    var panel = null;
    var backdrop = null;
    var lastFocused = null;

    function build() {
      if (panel) return;
      backdrop = document.createElement('div');
      backdrop.className = 'fixed inset-0 z-[80] bg-ink/50 opacity-0 transition-opacity duration-300';
      backdrop.hidden = true;

      panel = document.createElement('div');
      panel.hidden = true;
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
      panel.setAttribute('aria-labelledby', 'cart-drawer-title');
      panel.className =
        'fixed inset-0 z-[85] flex items-end justify-end sm:items-stretch';
      panel.innerHTML =
        '<div class="absolute inset-0" data-cart-backdrop></div>' +
        '<div class="relative flex max-h-[88vh] w-full flex-col rounded-t-2xl border border-sage-200 bg-white shadow-2xl sm:max-h-none sm:h-full sm:max-w-md sm:rounded-none sm:rounded-l-2xl" data-cart-panel>' +
        '<div class="flex items-center justify-between gap-3 border-b border-sage-200 px-5 py-4">' +
        '<h2 id="cart-drawer-title" class="flex items-center gap-2 text-lg font-bold text-ink">' + icon('cart', 'h-5 w-5 text-brand-700') + 'Your Cart <span data-cart-heading-count class="rounded-lg bg-sage-100 px-2 py-0.5 text-xs font-bold text-brand-800">0</span></h2>' +
        '<button type="button" data-cart-close aria-label="Close cart" class="grid h-10 w-10 place-items-center rounded-xl border border-sage-200 text-ink transition-colors hover:border-brand-700 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' + icon('close', 'h-5 w-5') + '</button>' +
        '</div>' +
        '<div data-cart-body class="flex-1 overflow-y-auto px-5 py-4"></div>' +
        '<div class="border-t border-sage-200 bg-sage-50 px-5 py-4">' +
        '<div class="flex items-center justify-between text-sm"><span class="font-semibold text-ink">Subtotal</span><span data-cart-subtotal class="text-lg font-extrabold text-brand-700">₹0</span></div>' +
        '<p class="mt-1 text-xs text-slate-500">Taxes and shipping are calculated at checkout.</p>' +
        '<button type="button" data-cart-checkout class="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">Proceed to Checkout</button>' +
        '<button type="button" data-cart-clear class="mt-2 w-full rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">Clear cart</button>' +
        '</div></div>';

      document.body.appendChild(backdrop);
      document.body.appendChild(panel);

      panel.querySelector('[data-cart-close]').addEventListener('click', close);
      backdrop.addEventListener('click', close);
      panel.querySelector('[data-cart-backdrop]').addEventListener('click', close);
      panel.querySelector('[data-cart-checkout]').addEventListener('click', function () {
        toast('Checkout integration can be connected here.', 'info');
      });
      panel.querySelector('[data-cart-clear]').addEventListener('click', function () {
        if (!cart.count()) return;
        cart.clear();
        toast('Cart cleared.', 'info');
      });

      panel.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          event.preventDefault();
          close();
          return;
        }
        if (event.key !== 'Tab') return;
        var focusables = panel.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      });
    }

    function emptyMarkup() {
      return (
        '<div class="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">' +
        '<span class="grid h-16 w-16 place-items-center rounded-2xl bg-sage-100 text-brand-700">' + icon('cart', 'h-7 w-7') + '</span>' +
        '<p class="text-base font-bold text-ink">Your cart is empty</p>' +
        '<p class="max-w-xs text-sm text-slate-500">Add a refurbished device to see it here. Every order supports reusing existing technology.</p>' +
        '<a href="products.html" class="mt-2 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">Browse products</a>' +
        '</div>'
      );
    }

    function render() {
      if (!panel) return;
      var items = cart.items();
      var body = panel.querySelector('[data-cart-body]');
      panel.querySelector('[data-cart-heading-count]').textContent = cart.count();
      panel.querySelector('[data-cart-subtotal]').textContent = fmt(cart.subtotal());

      if (!items.length) {
        body.innerHTML = emptyMarkup();
        return;
      }

      body.innerHTML =
        '<ul class="space-y-3">' +
        items
          .map(function (item) {
            return (
              '<li class="flex gap-3 rounded-2xl border border-sage-200 bg-white p-3">' +
              '<img src="' + item.image + '" alt="' + item.brand + ' ' + item.name + '" width="80" height="60" loading="lazy" class="h-16 w-20 shrink-0 rounded-xl border border-sage-200 bg-sage-50 object-cover">' +
              '<div class="min-w-0 flex-1">' +
              '<p class="truncate text-sm font-bold text-ink">' + item.brand + ' ' + item.name + '</p>' +
              '<p class="mt-0.5 text-xs text-slate-500">' + fmt(item.price) + ' each</p>' +
              '<div class="mt-2 flex items-center justify-between gap-2">' +
              '<div class="inline-flex items-center rounded-xl border border-sage-200">' +
              '<button type="button" data-cart-qty="' + item.id + '" data-step="-1" aria-label="Decrease quantity of ' + item.name + '" class="grid h-9 w-9 place-items-center rounded-l-xl text-ink transition-colors hover:bg-sage-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-700">' + icon('minus', 'h-4 w-4') + '</button>' +
              '<span class="min-w-8 text-center text-sm font-bold text-ink" aria-live="polite">' + item.qty + '</span>' +
              '<button type="button" data-cart-qty="' + item.id + '" data-step="1" aria-label="Increase quantity of ' + item.name + '" class="grid h-9 w-9 place-items-center rounded-r-xl text-ink transition-colors hover:bg-sage-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-700">' + icon('plus', 'h-4 w-4') + '</button>' +
              '</div>' +
              '<button type="button" data-cart-remove="' + item.id + '" class="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">' + icon('trash', 'h-4 w-4') + 'Remove</button>' +
              '</div></div>' +
              '<p class="shrink-0 text-sm font-extrabold text-brand-700">' + fmt(item.price * item.qty) + '</p>' +
              '</li>'
            );
          })
          .join('') +
        '</ul>';
    }

    function open() {
      build();
      lastFocused = document.activeElement;
      render();
      backdrop.hidden = false;
      panel.hidden = false;
      document.body.style.overflow = 'hidden';
      global.requestAnimationFrame(function () {
        backdrop.classList.add('opacity-100');
        var box = panel.querySelector('[data-cart-panel]');
        box.classList.add('translate-y-0');
        box.classList.remove('translate-y-6', 'sm:translate-x-6');
        box.style.opacity = '1';
      });
      var closeBtn = panel.querySelector('[data-cart-close]');
      if (closeBtn) closeBtn.focus();
      document.addEventListener('keydown', onKeydown);
    }

    function close() {
      if (!panel || panel.hidden) return;
      document.removeEventListener('keydown', onKeydown);
      backdrop.classList.remove('opacity-100');
      var box = panel.querySelector('[data-cart-panel]');
      box.style.opacity = '0';
      box.classList.add('translate-y-6', 'sm:translate-x-6');
      global.setTimeout(function () {
        panel.hidden = true;
        backdrop.hidden = true;
        document.body.style.overflow = '';
      }, reduceMotion ? 0 : 300);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function onKeydown(event) {
      if (event.key === 'Escape' && panel && !panel.hidden) close();
    }

    function isOpen() {
      return panel && !panel.hidden;
    }

    return { open: open, close: close, render: render, isOpen: isOpen };
  })();

  /* ---------------------------------------------------------
     Document-level behaviours
     --------------------------------------------------------- */
  function initAccordions() {
    var triggers = document.querySelectorAll('[data-accordion-trigger]');
    Array.prototype.forEach.call(triggers, function (trigger) {
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));
      if (!panel) return;
      if (trigger.getAttribute('aria-expanded') !== 'true') {
        panel.hidden = true;
        panel.style.maxHeight = '0px';
      } else {
        panel.style.maxHeight = 'none';
      }
      trigger.addEventListener('click', function () {
        var open = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!open));
        var chevron = trigger.querySelector('[data-accordion-chevron]');
        if (chevron) chevron.classList.toggle('rotate-180', !open);
        if (open) {
          panel.style.maxHeight = panel.scrollHeight + 'px';
          global.requestAnimationFrame(function () {
            panel.style.maxHeight = '0px';
          });
          global.setTimeout(function () {
            if (trigger.getAttribute('aria-expanded') === 'false') panel.hidden = true;
          }, reduceMotion ? 0 : 320);
        } else {
          panel.hidden = false;
          panel.style.maxHeight = '0px';
          global.requestAnimationFrame(function () {
            panel.style.maxHeight = panel.scrollHeight + 'px';
          });
          global.setTimeout(function () {
            if (trigger.getAttribute('aria-expanded') === 'true') panel.style.maxHeight = 'none';
          }, reduceMotion ? 0 : 320);
        }
      });
    });
  }

  function initReveals() {
    var nodes = document.querySelectorAll('[data-reveal]');
    if (!nodes.length) return;
    if (reduceMotion || !('IntersectionObserver' in global)) {
      Array.prototype.forEach.call(nodes, function (node) {
        node.classList.add('is-visible');
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );
    Array.prototype.forEach.call(nodes, function (node) {
      observer.observe(node);
    });
  }

  function initCounters() {
    var nodes = document.querySelectorAll('[data-count]');
    if (!nodes.length) return;
    function animate(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var decimals = String(target).indexOf('.') > -1 ? 1 : 0;
      if (reduceMotion) {
        el.textContent = target.toFixed(decimals);
        return;
      }
      var start = global.performance.now();
      var duration = 1200;
      function step(now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (progress < 1) global.requestAnimationFrame(step);
      }
      global.requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in global)) {
      Array.prototype.forEach.call(nodes, animate);
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    Array.prototype.forEach.call(nodes, function (node) {
      observer.observe(node);
    });
  }

  function initSmoothAnchors() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;
      var hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      var target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', hash);
      var focusable = target.querySelector('[tabindex]') || target;
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      focusable.focus({ preventScroll: true });
    });
  }

  function initAddToCart() {
    document.addEventListener('click', function (event) {
      var addBtn = event.target.closest('[data-add-to-cart]');
      if (addBtn) {
        var product = cart.add(addBtn.getAttribute('data-add-to-cart'), 1);
        if (product) toast(product.brand + ' ' + product.name + ' added to cart.');
        return;
      }
      var qtyBtn = event.target.closest('[data-cart-qty]');
      if (qtyBtn) {
        var id = qtyBtn.getAttribute('data-cart-qty');
        var step = parseInt(qtyBtn.getAttribute('data-step'), 10);
        var item = cart
          .items()
          .filter(function (i) {
            return String(i.id) === String(id);
          })[0];
        if (item) cart.setQty(id, item.qty + step);
        return;
      }
      var removeBtn = event.target.closest('[data-cart-remove]');
      if (removeBtn) {
        cart.remove(removeBtn.getAttribute('data-cart-remove'));
        toast('Item removed from cart.', 'info');
      }
    });

    document.addEventListener('retech:cart-open', function () {
      drawer.open();
    });

    document.addEventListener('retech:cart-add', function (event) {
      var detail = event.detail || {};
      var product = cart.add(detail.id, detail.qty || 1);
      if (product) {
        toast(product.brand + ' ' + product.name + ' added to cart.');
        drawer.open();
      }
    });
  }

  function initYear() {
    var nodes = document.querySelectorAll('[data-year]');
    Array.prototype.forEach.call(nodes, function (node) {
      node.textContent = new Date().getFullYear();
    });
  }

  function initProductGrids() {
    /* Any container with data-product-grid + data-featured-only renders cards. */
    var grids = document.querySelectorAll('[data-product-grid]');
    Array.prototype.forEach.call(grids, function (grid) {
      if (grid.dataset.rendered === 'true') return;
      var limit = parseInt(grid.getAttribute('data-limit') || '0', 10);
      var featuredOnly = grid.getAttribute('data-featured-only') === 'true';
      var category = grid.getAttribute('data-category') || '';
      var list = (RT.products || []).filter(function (p) {
        if (featuredOnly && !p.featured) return false;
        if (category && p.category.toLowerCase() !== category.toLowerCase()) return false;
        return true;
      });
      if (limit > 0) list = list.slice(0, limit);
      grid.innerHTML = list.length
        ? list.map(productCard).join('')
        : '<p class="col-span-full rounded-2xl bg-sage-50 px-6 py-10 text-center text-sm text-slate-600">No products available in this view.</p>';
      grid.dataset.rendered = 'true';
    });
  }

  /* ---------------------------------------------------------
     Lightweight form validation helpers (used by page scripts)
     --------------------------------------------------------- */
  function setFieldError(input, message) {
    var field = input.closest('[data-field]') || input.parentElement;
    var error = field ? field.querySelector('[data-error]') : null;
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      if (error) {
        error.textContent = message;
        error.hidden = false;
      }
      input.classList.add('border-red-500', 'ring-1', 'ring-red-500/30');
      input.classList.remove('border-sage-200');
    } else {
      input.removeAttribute('aria-invalid');
      if (error) {
        error.textContent = '';
        error.hidden = true;
      }
      input.classList.remove('border-red-500', 'ring-1', 'ring-red-500/30');
      input.classList.add('border-sage-200');
    }
  }

  function validateInput(input) {
    var value = (input.value || '').trim();
    var label = input.getAttribute('data-label') || 'This field';
    var message = '';
    if (input.hasAttribute('required') && !value) {
      message = label + ' is required.';
    } else if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      message = 'Enter a valid email address.';
    } else if (input.type === 'tel' && value && !/^[+\d][\d\s-]{7,17}$/.test(value)) {
      message = 'Enter a valid phone number.';
    } else if (input.getAttribute('minlength') && value && value.length < parseInt(input.getAttribute('minlength'), 10)) {
      message = label + ' must be at least ' + input.getAttribute('minlength') + ' characters.';
    }
    setFieldError(input, message);
    return !message;
  }

  function attachValidation(form) {
    var fields = form.querySelectorAll('input, select, textarea');
    Array.prototype.forEach.call(fields, function (input) {
      input.addEventListener('blur', function () {
        if ((input.value || '').trim() || input.hasAttribute('required')) validateInput(input);
      });
      input.addEventListener('input', function () {
        if (input.getAttribute('aria-invalid') === 'true') validateInput(input);
      });
    });
  }

  function validateForm(form) {
    var fields = form.querySelectorAll('input, select, textarea');
    var firstInvalid = null;
    Array.prototype.forEach.call(fields, function (input) {
      if (input.type === 'hidden') return;
      var ok = validateInput(input);
      if (!ok && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  /* ---------------------------------------------------------
     Boot
     --------------------------------------------------------- */
  function boot() {
    cart.read();
    initAccordions();
    initReveals();
    initCounters();
    initSmoothAnchors();
    initAddToCart();
    initYear();
    initProductGrids();

    document.addEventListener('retech:cart-updated', function () {
      drawer.render();
    });
    cart.broadcast();

    /* Demo checkout / payment messaging, used by page scripts */
    document.addEventListener('retech:demo-notice', function (event) {
      toast(event.detail.message || 'Checkout integration can be connected here.', 'info');
    });
  }

  global.ReTech = RT;
  RT.productCard = productCard;
  RT.starIcon = function (cls) {
    return icon('star', cls);
  };
  RT.icon = icon;
  RT.toast = toast;
  RT.cart = cart;
  RT.drawer = drawer;
  RT.setFieldError = setFieldError;
  RT.validateInput = validateInput;
  RT.validateForm = validateForm;
  RT.attachValidation = attachValidation;
  RT.reduceMotion = reduceMotion;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);