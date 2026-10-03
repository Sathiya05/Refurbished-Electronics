/* =============================================================
   ReTech — product-details.js
   Renders the selected product, its gallery, tabs, quantity
   control and related devices. Reads ?id= from the URL.
   ============================================================= */
(function (global) {
  'use strict';

  var RT = global.ReTech || {};
  var fmt = RT.formatPrice || function (n) { return '₹' + n; };

  function param(key, fallback) {
    var value = new URLSearchParams(global.location.search).get(key);
    return value === null ? fallback : value;
  }

  function stars(rating) {
    return Array.prototype.map
      .call(RT.starsFromRating(rating), function (s) {
        return '<span class="text-sm leading-none">' + s + '</span>';
      })
      .join('');
  }

  /* ---------------------------------------------------------
     Gallery
     --------------------------------------------------------- */
  function buildGallery(product) {
    var shots = [{ src: product.image, label: 'Front view', alt: product.brand + ' ' + product.name + ' refurbished — front view' }];
    if (product.backImage) {
      shots.push({
        src: product.backImage,
        label: 'Rear view',
        alt: product.brand + ' ' + product.name + ' refurbished — rear view'
      });
    }
    return shots;
  }

  function renderGallery(product) {
    var main = document.querySelector('[data-pd-image]');
    var thumbs = document.querySelector('[data-pd-thumbs]');
    var caption = document.querySelector('[data-pd-image-caption]');
    if (!main) return;
    var shots = buildGallery(product);

    main.src = shots[0].src;
    main.alt = shots[0].alt;
    if (caption) caption.textContent = shots[0].label;

    if (thumbs) {
      thumbs.innerHTML = shots
        .map(function (shot, index) {
          return (
            '<li role="presentation">' +
            '<button type="button" data-gallery-thumb="' + index + '" aria-label="Show ' + shot.label.toLowerCase() + '" aria-pressed="' +
            (index === 0 ? 'true' : 'false') +
            '" class="group relative aspect-square w-full overflow-hidden rounded-xl border-2 bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 ' +
            (index === 0 ? 'border-brand-700' : 'border-sage-200 hover:border-brand-700/50') +
            '">' +
            '<img src="' + shot.src + '" alt="" width="800" height="600" loading="lazy" class="h-full w-full object-cover">' +
            '</button></li>'
          );
        })
        .join('');
    }

    if (thumbs) {
      thumbs.addEventListener('click', function (event) {
        var button = event.target.closest('[data-gallery-thumb]');
        if (!button) return;
        var index = parseInt(button.getAttribute('data-gallery-thumb'), 10);
        var shot = shots[index];
        main.src = shot.src;
        main.alt = shot.alt;
        if (caption) caption.textContent = shot.label;
        Array.prototype.forEach.call(thumbs.querySelectorAll('[data-gallery-thumb]'), function (other) {
          var active = other === button;
          other.setAttribute('aria-pressed', String(active));
          other.classList.toggle('border-brand-700', active);
          other.classList.toggle('border-sage-200', !active);
        });
      });
    }
  }

  /* ---------------------------------------------------------
     Right-hand summary
     --------------------------------------------------------- */
  function renderSummary(product) {
    var set = function (selector, html) {
      var el = document.querySelector(selector);
      if (el) el.innerHTML = html;
    };

    set('[data-pd-brand]', '<span class="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">' + product.brand + '</span>');
    set('[data-pd-name]', product.name);
    set(
      '[data-pd-rating]',
      '<span class="inline-flex items-center gap-1 text-accent-500" aria-hidden="true">' + stars(product.rating) + '</span>' +
        '<span class="text-sm font-bold text-ink">' + RT.formatRating(product.rating) + '</span>' +
        '<span class="text-sm text-slate-500">· ' + product.reviews + ' demo reviews</span>'
    );
    set(
      '[data-pd-condition]',
      '<span class="inline-flex items-center gap-1.5 rounded-lg border border-sage-200 bg-sage-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-800">' +
        product.condition +
        '</span>' +
        '<span class="inline-flex items-center gap-1.5 rounded-lg bg-sage-100 px-3 py-1.5 text-xs font-semibold text-brand-800">' +
        RT.icon('shield', 'h-3.5 w-3.5 text-brand-700') +
        product.warranty +
        ' warranty</span>' +
        '<span class="inline-flex items-center gap-1.5 rounded-lg bg-accent-100 px-3 py-1.5 text-xs font-bold text-accent-700">' +
        product.discount +
        '% below original price</span>'
    );
    set(
      '[data-pd-price]',
      '<span class="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">' + fmt(product.price) + '</span>' +
        '<span class="text-base text-slate-400 line-through">' + fmt(product.originalPrice) + '</span>' +
        '<span class="rounded-lg bg-accent-500 px-2 py-1 text-xs font-bold text-white">' + product.discount + '% OFF</span>'
    );
    set(
      '[data-pd-stock]',
      product.stock > 0
        ? '<span class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700"><span class="h-2 w-2 rounded-full bg-brand-600"></span>In stock — ' + product.stock + ' demo units</span>'
        : '<span class="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700"><span class="h-2 w-2 rounded-full bg-amber-500"></span>Low stock</span>'
    );
    set('[data-pd-sku]', 'RT-' + product.category.slice(0, 2).toUpperCase() + '-' + String(product.id).padStart(4, '0'));

    var total = document.querySelector('[data-pd-qty-total]');
    if (total) total.textContent = fmt(product.price);

    var highlights = document.querySelector('[data-pd-highlights]');
    if (highlights) {
      var keys = ['Processor', 'RAM', 'Storage', 'Display', 'Battery', 'Connectivity'];
      highlights.innerHTML = keys
        .map(function (key) {
          return (
            '<div class="flex items-start gap-3 border-b border-sage-200 py-3 last:border-b-0">' +
            '<dt class="w-28 shrink-0 text-sm font-semibold text-slate-500">' + key + '</dt>' +
            '<dd class="flex-1 text-sm font-medium text-ink">' + (product.specifications[key] || 'Not specified in demo data') + '</dd>' +
            '</div>'
          );
        })
        .join('');
    }
  }

  /* ---------------------------------------------------------
     Tab panels
     --------------------------------------------------------- */
  var REVIEW_SAMPLES = [
    { name: 'Customer A', text: 'Got a refurbished laptop for much less than a new one and it works perfectly for my daily work.' },
    { name: 'Customer B', text: 'Simple ordering process and the device condition was clearly explained.' },
    { name: 'Customer C', text: 'Battery health matched the listing and the packaging was properly protected.' }
  ];

  function renderTabs(product) {
    var grades = RT.conditionGrades || [];
    var grade = grades.filter(function (g) {
      return g.name === product.condition;
    })[0];

    var overview =
      '<p class="text-sm leading-relaxed text-slate-700">' + product.description + '</p>' +
      '<h3 class="mt-6 text-base font-bold text-ink">What is included</h3>' +
      '<ul class="mt-2 space-y-1.5 text-sm text-slate-700">' +
      [
        product.specifications.Inclusions || 'Charger and documentation',
        'Factory reset and data wipe completed',
        'Condition grade: ' + product.condition,
        product.warranty + ' functional warranty as listed'
      ]
        .map(function (line) {
          return '<li class="flex items-start gap-2">' + RT.icon('check', 'mt-0.5 h-4 w-4 shrink-0 text-brand-700') + '<span>' + line + '</span></li>';
        })
        .join('') +
      '</ul>' +
      '<p class="mt-6 rounded-xl bg-sage-50 p-4 text-xs leading-relaxed text-slate-600">Demonstration listing. Product names, specifications and prices are sample data for this template and do not represent live stock.</p>';

    var specs =
      '<dl class="divide-y divide-sage-200">' +
      Object.keys(product.specifications)
        .map(function (key) {
          return (
            '<div class="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">' +
            '<dt class="text-sm font-semibold text-ink sm:w-40">' + key + '</dt>' +
            '<dd class="text-sm text-slate-700">' + product.specifications[key] + '</dd>' +
            '</div>'
          );
        })
        .join('') +
      '</dl>';

    var condition =
      '<div class="rounded-2xl border border-sage-200 bg-sage-50 p-5">' +
      '<div class="flex flex-wrap items-center gap-3">' +
      '<span class="rounded-lg bg-brand-700 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">' + product.condition + ' grade</span>' +
      (grade ? '<span class="text-sm text-slate-600">' + grade.summary + '</span>' : '') +
      '</div>' +
      (grade
        ? '<ul class="mt-4 grid gap-2 sm:grid-cols-2">' +
          grade.points
            .map(function (point) {
              return '<li class="flex items-start gap-2 text-sm text-slate-700">' + RT.icon('check', 'mt-0.5 h-4 w-4 shrink-0 text-brand-700') + '<span>' + point + '</span></li>';
            })
            .join('') +
          '</ul>'
        : '') +
      '<p class="mt-4 text-sm leading-relaxed text-slate-700">Minor cosmetic signs may be present depending on the selected condition grade. Photos on this page are representative illustrations; the grade description above is what defines the expected cosmetic condition.</p>' +
      '</div>';

    var warranty =
      '<div class="space-y-4 text-sm leading-relaxed text-slate-700">' +
      '<p>This device includes <strong class="text-ink">' + product.warranty + '</strong> functional warranty coverage, listed per product because duration varies by device and grade.</p>' +
      '<ul class="space-y-2">' +
      [
        'Covers functional faults identified after delivery on the tested components.',
        'Does not cover physical damage, liquid damage, accidental breakage or normal battery wear.',
        'Keep the purchase invoice — warranty claims are registered against the device serial number.',
        'Warranty length and terms are confirmed by the business before launch.'
      ]
        .map(function (line) {
          return '<li class="flex items-start gap-2">' + RT.icon('check', 'mt-0.5 h-4 w-4 shrink-0 text-brand-700') + '<span>' + line + '</span></li>';
        })
        .join('') +
      '</ul>' +
      '<a href="warranty-quality.html" class="inline-flex min-h-11 items-center rounded-xl border border-brand-700 px-4 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-sage-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">Read the full quality &amp; warranty policy</a>' +
      '</div>';

    var reviews =
      '<div class="space-y-4">' +
      '<div class="flex flex-wrap items-center gap-4 rounded-2xl bg-sage-50 p-5">' +
      '<div class="text-center">' +
      '<p class="text-3xl font-extrabold text-ink">' + RT.formatRating(product.rating) + '</p>' +
      '<p class="text-xs font-semibold uppercase tracking-wide text-brand-700">out of 5</p>' +
      '</div>' +
      '<div class="flex-1">' +
      '<span class="inline-flex items-center gap-0.5 text-accent-500" aria-hidden="true">' + stars(product.rating) + '</span>' +
      '<p class="mt-1 text-sm text-slate-600">Based on ' + product.reviews + ' demonstration reviews.</p>' +
      '</div></div>' +
      '<ul class="space-y-3">' +
      REVIEW_SAMPLES.map(function (review) {
        return (
          '<li class="rounded-2xl border border-sage-200 bg-white p-4">' +
          '<p class="text-sm text-slate-700">“' + review.text + '”</p>' +
          '<p class="mt-2 text-xs font-bold text-ink">— ' + review.name + '</p>' +
          '</li>'
        );
      }).join('') +
      '</ul>' +
      '<p class="text-xs text-slate-500">Testimonials shown are illustrative examples for this demonstration website.</p>' +
      '</div>';

    var panels = {
      'tab-overview': overview,
      'tab-specifications': specs,
      'tab-condition': condition,
      'tab-warranty': warranty,
      'tab-reviews': reviews
    };
    Object.keys(panels).forEach(function (id) {
      var panel = document.getElementById(id);
      if (panel) panel.innerHTML = panels[id];
    });
  }

  function initTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    function select(tab) {
      tabs.forEach(function (other) {
        var active = other === tab;
        other.setAttribute('aria-selected', String(active));
        other.tabIndex = active ? 0 : -1;
        other.classList.toggle('border-brand-700', active);
        other.classList.toggle('text-brand-800', active);
        other.classList.toggle('border-transparent', !active);
        other.classList.toggle('text-slate-500', !active);
        var panel = document.getElementById(other.getAttribute('aria-controls'));
        if (panel) panel.hidden = !active;
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        select(tab);
      });
      tab.addEventListener('keydown', function (event) {
        var next = null;
        if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
        if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
        if (event.key === 'Home') next = tabs[0];
        if (event.key === 'End') next = tabs[tabs.length - 1];
        if (!next) return;
        event.preventDefault();
        select(next);
        next.focus();
      });
    });
  }

  /* ---------------------------------------------------------
     Quantity, cart and related products
     --------------------------------------------------------- */
  function initQuantity(product) {
    var input = document.querySelector('[data-pd-qty]');
    if (!input) return;
    var totalEl = document.querySelector('[data-pd-qty-total]');
    function sync() {
      var qty = Math.max(1, Math.min(10, parseInt(input.value, 10) || 1));
      input.value = qty;
      if (totalEl) totalEl.textContent = fmt(product.price * qty);
    }
    input.addEventListener('input', sync);
    input.addEventListener('change', sync);

    document.addEventListener('click', function (event) {
      var stepBtn = event.target.closest('[data-qty-step]');
      if (!stepBtn) return;
      input.value = (parseInt(input.value, 10) || 1) + parseInt(stepBtn.getAttribute('data-qty-step'), 10);
      sync();
    });

    var addBtn = document.querySelector('[data-pd-add]');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        document.dispatchEvent(
          new CustomEvent('retech:cart-add', { detail: { id: product.id, qty: parseInt(input.value, 10) || 1 } })
        );
      });
    }

    var buyBtn = document.querySelector('[data-pd-buy]');
    if (buyBtn) {
      buyBtn.addEventListener('click', function () {
        RT.cart.add(product.id, parseInt(input.value, 10) || 1);
        RT.toast('Checkout integration can be connected here.', 'info');
        RT.drawer.open();
      });
    }
  }

  function renderRelated(product) {
    var host = document.querySelector('[data-pd-related]');
    if (!host) return;
    var related = (RT.products || [])
      .filter(function (p) {
        return p.id !== product.id && p.category === product.category;
      })
      .concat(
        (RT.products || []).filter(function (p) {
          return p.id !== product.id && p.category !== product.category && p.featured;
        })
      )
      .slice(0, 4);
    host.innerHTML = related.map(RT.productCard).join('');
  }

  function init() {
    var product = RT.getProductById(param('id', 1)) || RT.products[0];
    if (!product) return;

    if (document.title) document.title = product.brand + ' ' + product.name + ' (Refurbished) | ReTech';

    renderGallery(product);
    renderSummary(product);
    renderTabs(product);
    initTabs();
    initQuantity(product);
    renderRelated(product);

    /* Breadcrumb */
    var crumb = document.querySelector('[data-pd-crumb-category]');
    if (crumb) {
      crumb.href = 'products.html?category=' + product.category.toLowerCase();
      crumb.textContent = product.category;
    }
    var crumbBrand = document.querySelector('[data-pd-crumb-brand]');
    if (crumbBrand) {
      crumbBrand.href = 'products.html?brand=' + encodeURIComponent(product.brand);
      crumbBrand.textContent = product.brand;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);