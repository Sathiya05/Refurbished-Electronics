/* =============================================================
   ReTech — products.js
   Catalogue rendering, filtering, sorting and search for
   products.html. Filters live in a desktop sidebar and in a
   mobile drawer; both share one filter state.
   ============================================================= */
(function (global) {
  'use strict';

  var RT = global.ReTech || {};
  var PRODUCTS = RT.products || [];
  var OPTIONS = RT.filterOptions || {};
  var fmt = RT.formatPrice || function (n) { return '₹' + n; };

  var state = {
    category: 'all',
    brands: [],
    conditions: [],
    storage: [],
    ram: [],
    warranty: [],
    price: '',
    q: '',
    sort: 'featured'
  };

  var els = {};

  /* ---------------------------------------------------------
     URL helpers
     --------------------------------------------------------- */
  function readUrl() {
    var params = new URLSearchParams(global.location.search);
    var category = (params.get('category') || '').toLowerCase();
    if (category && category !== 'all') {
      var match = (RT.categories || []).filter(function (c) {
        return c.slug === category || c.name.toLowerCase() === category;
      })[0];
      state.category = match ? match.slug : 'all';
    }
    state.q = params.get('q') || '';
    var sort = params.get('sort');
    if (sort) state.sort = sort;
  }

  function syncUrl() {
    if (!global.history.replaceState) return;
    var params = new URLSearchParams();
    if (state.category && state.category !== 'all') params.set('category', state.category);
    if (state.q) params.set('q', state.q);
    if (state.sort !== 'featured') params.set('sort', state.sort);
    var query = params.toString();
    global.history.replaceState(null, '', query ? '?' + query : global.location.pathname);
  }

  /* ---------------------------------------------------------
     Filter UI
     --------------------------------------------------------- */
  var FILTER_LABELS = {
    category: 'Category',
    brands: 'Brand',
    price: 'Price Range',
    conditions: 'Condition',
    storage: 'Storage',
    ram: 'RAM',
    warranty: 'Warranty'
  };

  function group(options, key, type, prefix) {
    var inputs = options
      .map(function (option, index) {
        var id = prefix + '-' + key + '-' + index;
        var text = typeof option === 'string' ? option : option.label;
        var value = typeof option === 'string' ? option : option.min != null ? option.min : option.label;
        var count = typeof option === 'object' && option.count != null ? option.count : null;
        var checked = isSelected(key, value);
        if (type === 'radio') {
          return (
            '<label for="' + id + '" class="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors hover:bg-sage-50 has-[:checked]:bg-sage-100 has-[:checked]:font-semibold has-[:checked]:text-brand-800">' +
            '<input id="' + id + '" type="radio" name="' + key + '" value="' + text + '" data-filter-value="' + value + '" data-filter-key="' + key + '" class="h-4 w-4" ' + (checked ? 'checked' : '') + '>' +
            '<span class="flex-1">' + text + '</span>' +
            (count != null ? '<span class="text-xs font-normal text-slate-500">' + count + '</span>' : '') +
            '</label>'
          );
        }
        return (
          '<label for="' + id + '" class="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors hover:bg-sage-50 has-[:checked]:bg-sage-100 has-[:checked]:font-semibold has-[:checked]:text-brand-800">' +
          '<input id="' + id + '" type="checkbox" data-filter-value="' + value + '" data-filter-key="' + key + '" value="' + text + '" class="h-4 w-4 rounded border-sage-200' + (checked ? ' checked' : '') + '>' +
          '<span class="flex-1">' + text + '</span>' +
          (count != null ? '<span class="text-xs font-normal text-slate-500">' + count + '</span>' : '') +
          '</label>'
        );
      })
      .join('');
    return (
      '<fieldset class="border-t border-sage-200 py-5 first:border-t-0 first:pt-0">' +
      '<legend class="mb-2 text-sm font-bold uppercase tracking-wider text-ink">' + (FILTER_LABELS[key] || key) + '</legend>' +
      '<div class="space-y-0.5">' + inputs + '</div>' +
      '</fieldset>'
    );
  }

  function isSelected(key, value) {
    if (key === 'category') return state.category === value;
    if (key === 'price') return state.price === value;
    return state[key] && state[key].indexOf(value) > -1;
  }

  function countFor(key, value) {
    return PRODUCTS.filter(function (p) {
      if (key === 'category') return value === 'all' || p.category.toLowerCase() === value;
      if (key === 'brands') return p.brand === value;
      if (key === 'conditions') return p.condition === value;
      if (key === 'storage') return p.storage === value;
      if (key === 'ram') return p.ram === value;
      if (key === 'warranty') return p.warranty === value;
      if (key === 'price') {
        var range = (OPTIONS.priceRanges || []).filter(function (r) {
          return r.label === value;
        })[0];
        return range ? p.price >= range.min && p.price <= range.max : true;
      }
      return true;
    }).length;
  }

  function buildFilterPanel(prefix) {
    var categoryOptions = [{ label: 'All', min: 'all' }].concat(
      (RT.categories || []).map(function (c) {
        return { label: c.name, min: c.slug };
      })
    );
    categoryOptions = categoryOptions.map(function (option) {
      return { label: option.label, min: option.min, count: countFor('category', option.min) };
    });

    return (
      '<div class="space-y-5">' +
      group(categoryOptions, 'category', 'radio', prefix) +
      group((OPTIONS.brands || []).map(function (b) { return { label: b, min: b, count: countFor('brands', b) }; }), 'brands', 'checkbox', prefix) +
      group((OPTIONS.priceRanges || []).map(function (r) { return { label: r.label, min: r.label, count: countFor('price', r.label) }; }), 'price', 'radio', prefix) +
      group((OPTIONS.conditions || []).map(function (c) { return { label: c, min: c, count: countFor('conditions', c) }; }), 'conditions', 'checkbox', prefix) +
      group((OPTIONS.storage || []).map(function (s) { return { label: s, min: s, count: countFor('storage', s) }; }), 'storage', 'checkbox', prefix) +
      group((OPTIONS.ram || []).map(function (r) { return { label: r, min: r, count: countFor('ram', r) }; }), 'ram', 'checkbox', prefix) +
      group((OPTIONS.warranty || []).map(function (w) { return { label: w, min: w, count: countFor('warranty', w) }; }), 'warranty', 'checkbox', prefix) +
      '<button type="button" data-clear-filters class="mt-1 w-full rounded-xl border border-sage-200 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-700 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">Clear all filters</button>' +
      '</div>'
    );
  }

  function syncInputs() {
    var inputs = document.querySelectorAll('[data-filter-key]');
    Array.prototype.forEach.call(inputs, function (input) {
      var key = input.getAttribute('data-filter-key');
      var value = input.getAttribute('data-filter-value');
      if (key === 'category') input.checked = state.category === value;
      else if (key === 'price') input.checked = state.price === value;
      else input.checked = (state[key] || []).indexOf(value) > -1;
    });
  }

  /* ---------------------------------------------------------
     Query + render
     --------------------------------------------------------- */
  function matches(product) {
    if (state.category !== 'all' && product.category.toLowerCase() !== state.category) return false;
    if (state.brands.length && state.brands.indexOf(product.brand) === -1) return false;
    if (state.conditions.length && state.conditions.indexOf(product.condition) === -1) return false;
    if (state.storage.length && state.storage.indexOf(product.storage) === -1) return false;
    if (state.ram.length && state.ram.indexOf(product.ram) === -1) return false;
    if (state.warranty.length && state.warranty.indexOf(product.warranty) === -1) return false;
    if (state.price) {
      var range = (OPTIONS.priceRanges || []).filter(function (r) {
        return r.label === state.price;
      })[0];
      if (range && (product.price < range.min || product.price > range.max)) return false;
    }
    if (state.q) {
      var q = state.q.toLowerCase();
      var haystack = (product.name + ' ' + product.brand + ' ' + product.category + ' ' + product.condition).toLowerCase();
      if (haystack.indexOf(q) === -1) return false;
    }
    return true;
  }

  var sorters = {
    featured: function (a, b) {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.rating - a.rating;
    },
    'price-asc': function (a, b) {
      return a.price - b.price;
    },
    'price-desc': function (a, b) {
      return b.price - a.price;
    },
    newest: function (a, b) {
      return new Date(b.addedOn) - new Date(a.addedOn);
    },
    discount: function (a, b) {
      return b.discount - a.discount;
    }
  };

  function chipMarkup(label, onRemove) {
    return (
      '<span class="inline-flex items-center gap-1.5 rounded-full border border-sage-200 bg-white px-3 py-1 text-xs font-semibold text-ink">' +
      label +
      '<button type="button" ' + onRemove + ' aria-label="Remove ' + label + ' filter" class="grid h-4 w-4 place-items-center rounded-full text-slate-500 transition-colors hover:bg-brand-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">' +
      '<svg viewBox="0 0 24 24" class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>' +
      '</button></span>'
    );
  }

  function renderChips() {
    if (!els.chips) return;
    var chips = [];
    if (state.category !== 'all') {
      var category = (RT.categories || []).filter(function (c) {
        return c.slug === state.category;
      })[0];
      chips.push(chipMarkup(category ? category.name : state.category, 'data-remove-chip="category"'));
    }
    if (state.price) chips.push(chipMarkup(state.price, 'data-remove-chip="price"'));
    ['brands', 'conditions', 'storage', 'ram', 'warranty'].forEach(function (key) {
      (state[key] || []).forEach(function (value) {
        chips.push(chipMarkup(value, 'data-remove-chip="' + key + '" data-chip-value="' + value + '"'));
      });
    });
    if (state.q) chips.push(chipMarkup('“' + state.q + '”', 'data-remove-chip="q"'));

    els.chips.innerHTML = chips.length
      ? chips.join('') + '<button type="button" data-clear-filters class="rounded-full px-3 py-1 text-xs font-semibold text-brand-700 underline-offset-2 hover:underline">Clear all</button>'
      : '';
    els.chips.hidden = chips.length === 0;

    if (els.drawerCount) els.drawerCount.textContent = chips.length ? chips.length + ' active' : '';
  }

  function render() {
    var list = PRODUCTS.filter(matches);
    var sorter = sorters[state.sort] || sorters.featured;
    list = list.slice().sort(sorter);

    if (els.count) els.count.textContent = list.length;
    if (els.resultText) {
      var categoryName =
        state.category === 'all'
          ? 'all categories'
          : ((RT.categories || []).filter(function (c) { return c.slug === state.category; })[0] || {}).name;
      els.resultText.innerHTML =
        'Showing <strong class="font-semibold text-ink">' + list.length + '</strong> ' +
        (list.length === 1 ? 'product' : 'products') +
        ' in <strong class="font-semibold text-ink">' + categoryName + '</strong>' +
        (state.q ? ' for “' + state.q + '”' : '') + '.';
    }

    if (!els.grid) return;
    if (!list.length) {
      els.grid.innerHTML =
        '<div class="col-span-full rounded-2xl border border-dashed border-sage-200 bg-sage-50 px-6 py-16 text-center">' +
        '<p class="text-lg font-bold text-ink">No products found.</p>' +
        '<p class="mx-auto mt-2 max-w-md text-sm text-slate-600">Try removing a filter or searching for a different brand, model or category such as “iPhone”, “Dell” or “Tablets”.</p>' +
        '<button type="button" data-clear-filters class="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">Reset filters</button>' +
        '</div>';
      return;
    }
    els.grid.innerHTML = list.map(RT.productCard).join('');
  }

  function update() {
    render();
    renderChips();
    syncInputs();
    syncUrl();
  }

  /* ---------------------------------------------------------
     Mobile filter drawer
     --------------------------------------------------------- */
  var drawerFocus = null;

  function openDrawer() {
    if (!els.drawer) return;
    drawerFocus = document.activeElement;
    els.drawerBackdrop.hidden = false;
    els.drawer.hidden = false;
    document.body.style.overflow = 'hidden';
    global.requestAnimationFrame(function () {
      els.drawer.classList.remove('translate-x-full');
      els.drawerBackdrop.classList.add('opacity-100');
    });
    var closeBtn = els.drawer.querySelector('[data-drawer-close]');
    if (closeBtn) closeBtn.focus();
    document.addEventListener('keydown', drawerKeydown);
  }

  function closeDrawer() {
    if (!els.drawer || els.drawer.hidden) return;
    document.removeEventListener('keydown', drawerKeydown);
    els.drawer.classList.add('translate-x-full');
    els.drawerBackdrop.classList.remove('opacity-100');
    document.body.style.overflow = '';
    global.setTimeout(function () {
      els.drawer.hidden = true;
      els.drawerBackdrop.hidden = true;
    }, RT.reduceMotion ? 0 : 300);
    if (drawerFocus && drawerFocus.focus) drawerFocus.focus();
  }

  function drawerKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer();
      return;
    }
    if (event.key !== 'Tab') return;
    var focusables = els.drawer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select, textarea');
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
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  function init() {
    els.grid = document.querySelector('[data-products-grid]');
    if (!els.grid) return;

    els.count = document.querySelector('[data-results-count]');
    els.chips = document.querySelector('[data-active-filters]');
    els.resultText = document.querySelector('[data-result-summary]');
    els.sidebarMount = document.querySelector('[data-filter-mount="desktop"]');
    els.drawerMount = document.querySelector('[data-filter-mount="mobile"]');
    els.drawer = document.querySelector('[data-filter-drawer]');
    els.drawerBackdrop = document.querySelector('[data-filter-backdrop]');
    els.drawerCount = document.querySelector('[data-drawer-count]');

    readUrl();

    if (els.sidebarMount) els.sidebarMount.innerHTML = buildFilterPanel('desktop');
    if (els.drawerMount) els.drawerMount.innerHTML = buildFilterPanel('mobile');

    var sortSelect = document.querySelector('[data-sort]');
    if (sortSelect) {
      sortSelect.value = state.sort;
      sortSelect.addEventListener('change', function () {
        state.sort = sortSelect.value;
        update();
      });
    }

    var searchInputs = document.querySelectorAll('[data-search-input]');
    Array.prototype.forEach.call(searchInputs, function (input) {
      input.value = state.q;
      var timer = null;
      input.addEventListener('input', function () {
        global.clearTimeout(timer);
        timer = global.setTimeout(function () {
          state.q = input.value.trim();
          Array.prototype.forEach.call(searchInputs, function (other) {
            if (other !== input) other.value = state.q;
          });
          update();
        }, 220);
      });
      input.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          input.value = '';
          state.q = '';
          update();
        }
      });
    });

    /* Category pills */
    var pills = document.querySelectorAll('[data-category-pill]');
    Array.prototype.forEach.call(pills, function (pill) {
      pill.addEventListener('click', function () {
        state.category = pill.getAttribute('data-category-pill');
        Array.prototype.forEach.call(pills, function (other) {
          var isActive = other === pill;
          other.setAttribute('aria-pressed', String(isActive));
          other.classList.toggle('bg-brand-700', isActive);
          other.classList.toggle('text-white', isActive);
          other.classList.toggle('border-sage-200', !isActive);
          other.classList.toggle('text-ink', !isActive);
          other.classList.toggle('hover:border-brand-700', !isActive);
          other.classList.toggle('hover:text-brand-700', !isActive);
        });
        update();
      });
      var active = pill.getAttribute('data-category-pill') === state.category;
      pill.setAttribute('aria-pressed', String(active));
      pill.classList.toggle('bg-brand-700', active);
      pill.classList.toggle('text-white', active);
      pill.classList.toggle('border-sage-200', !active);
      pill.classList.toggle('text-ink', !active);
      pill.classList.toggle('hover:border-brand-700', !active);
      pill.classList.toggle('hover:text-brand-700', !active);
    });

    /* Delegated filter interactions (both sidebar and drawer) */
    document.addEventListener('change', function (event) {
      var input = event.target.closest('[data-filter-key]');
      if (!input) return;
      var key = input.getAttribute('data-filter-key');
      var value = input.getAttribute('data-filter-value');
      if (key === 'category') state.category = value;
      else if (key === 'price') state.price = state.price === value ? '' : value;
      else {
        state[key] = state[key] || [];
        var index = state[key].indexOf(value);
        if (input.checked && index === -1) state[key].push(value);
        if (!input.checked && index > -1) state[key].splice(index, 1);
      }
      var pill = document.querySelector('[data-category-pill="' + state.category + '"]');
      Array.prototype.forEach.call(pills, function (other) {
        var isActive = other === pill;
        other.setAttribute('aria-pressed', String(isActive));
        other.classList.toggle('bg-brand-700', isActive);
        other.classList.toggle('text-white', isActive);
        other.classList.toggle('border-sage-200', !isActive);
        other.classList.toggle('text-ink', !isActive);
      });
      update();
    });

    document.addEventListener('click', function (event) {
      if (event.target.closest('[data-clear-filters]')) {
        state.brands = [];
        state.conditions = [];
        state.storage = [];
        state.ram = [];
        state.warranty = [];
        state.price = '';
        state.q = '';
        state.category = 'all';
        Array.prototype.forEach.call(searchInputs, function (input) {
          input.value = '';
        });
        Array.prototype.forEach.call(pills, function (other) {
          var isAll = other.getAttribute('data-category-pill') === 'all';
          other.setAttribute('aria-pressed', String(isAll));
          other.classList.toggle('bg-brand-700', isAll);
          other.classList.toggle('text-white', isAll);
          other.classList.toggle('border-sage-200', !isAll);
          other.classList.toggle('text-ink', !isAll);
        });
        update();
        return;
      }
      if (event.target.closest('[data-remove-chip]')) {
        var chip = event.target.closest('[data-remove-chip]');
        var kind = chip.getAttribute('data-remove-chip');
        var chipValue = chip.getAttribute('data-chip-value');
        if (kind === 'category') state.category = 'all';
        else if (kind === 'price') state.price = '';
        else if (kind === 'q') {
          state.q = '';
          Array.prototype.forEach.call(searchInputs, function (input) {
            input.value = '';
          });
        } else {
          var index = (state[kind] || []).indexOf(chipValue);
          if (index > -1) state[kind].splice(index, 1);
        }
        var allPill = document.querySelector('[data-category-pill="all"]');
        Array.prototype.forEach.call(pills, function (other) {
          var isActive = other === allPill;
          other.setAttribute('aria-pressed', String(isActive));
          other.classList.toggle('bg-brand-700', isActive);
          other.classList.toggle('text-white', isActive);
          other.classList.toggle('border-sage-200', !isActive);
          other.classList.toggle('text-ink', !isActive);
        });
        update();
        return;
      }
      if (event.target.closest('[data-open-filters]')) {
        openDrawer();
        return;
      }
      if (event.target.closest('[data-drawer-close]') || event.target.closest('[data-drawer-apply]')) {
        closeDrawer();
      }
    });

    if (els.drawerBackdrop) els.drawerBackdrop.addEventListener('click', closeDrawer);

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);