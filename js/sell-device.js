/* =============================================================
   ReTech — sell-device.js
   Six-step trade-in enquiry form with a progress indicator,
   per-step validation and an indicative (demo) value estimate.
   The estimate is never presented as a guaranteed offer.
   ============================================================= */
(function (global) {
  'use strict';

  var RT = global.ReTech || {};
  var fmt = RT.formatPrice || function (n) { return '₹' + n; };
  var TOTAL_STEPS = 6;
  var currentStep = 1;

  var els = {};
  var lastFocused = null;

  /* ---------------------------------------------------------
     Step visibility + progress
     --------------------------------------------------------- */
  function showStep(step) {
    currentStep = step;
    Array.prototype.forEach.call(els.steps, function (panel) {
      var value = parseInt(panel.getAttribute('data-step'), 10);
      var active = value === step;
      panel.hidden = !active;
      if (active) panel.removeAttribute('aria-hidden');
      else panel.setAttribute('aria-hidden', 'true');
    });

    Array.prototype.forEach.call(els.progressSteps, function (item) {
      var value = parseInt(item.getAttribute('data-progress-step'), 10);
      item.classList.toggle('bg-brand-700', value <= step);
      item.classList.toggle('text-white', value <= step);
      item.classList.toggle('border-brand-700', value <= step);
      item.classList.toggle('bg-white', value > step);
      item.classList.toggle('text-slate-500', value > step);
      item.classList.toggle('border-sage-200', value > step);
      var dot = item.querySelector('[data-progress-dot]');
      if (dot) {
        dot.classList.toggle('bg-white', value <= step);
        dot.classList.toggle('text-brand-700', value <= step);
        dot.classList.toggle('bg-sage-100', value > step);
        dot.classList.toggle('text-slate-500', value > step);
      }
      if (value === step) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });

    if (els.progressBar) els.progressBar.style.width = Math.round((step / TOTAL_STEPS) * 100) + '%';
    if (els.progressText) els.progressText.textContent = 'Step ' + step + ' of ' + TOTAL_STEPS;

    if (els.prevBtn) {
      els.prevBtn.hidden = step === 1;
      els.prevBtn.classList.toggle('hidden', step === 1);
    }
    if (els.nextBtn) els.nextBtn.classList.toggle('hidden', step === TOTAL_STEPS);
    if (els.submitBtn) els.submitBtn.classList.toggle('hidden', step !== TOTAL_STEPS);

    var heading = els.steps[step - 1].querySelector('h2, h3, legend');
    if (heading) {
      if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
    if (!RT.reduceMotion) {
      var panel = els.steps[step - 1];
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /* ---------------------------------------------------------
     Per-step validation
     --------------------------------------------------------- */
  function radioValue(name) {
    var checked = els.form.querySelector('input[name="' + name + '"]:checked');
    return checked ? checked.value : '';
  }

  function validateStep(step) {
    var panel = els.steps[step - 1];
    var firstInvalid = null;

    var requiredRadios = { 1: 'deviceType', 2: 'brand', 4: 'condition', 5: 'charger' };
    if (requiredRadios[step]) {
      var name = requiredRadios[step];
      var group = panel.querySelector('fieldset[data-radio-group="' + name + '"]');
      var value = radioValue(name);
      var error = group ? group.querySelector('[data-error]') : null;
      if (!value) {
        if (error) {
          error.textContent = 'Please choose an option to continue.';
          error.hidden = false;
        }
        if (!firstInvalid) firstInvalid = group ? group.querySelector('input') : null;
      } else if (error) {
        error.textContent = '';
        error.hidden = true;
      }
    }

    var fields = panel.querySelectorAll('input, select, textarea');
    Array.prototype.forEach.call(fields, function (input) {
      if (input.type === 'radio' || input.type === 'checkbox') return;
      var ok = RT.validateInput(input);
      if (!ok && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  /* ---------------------------------------------------------
     Estimate
     --------------------------------------------------------- */
  function collect() {
    var accessories = Array.prototype.map
      .call(els.form.querySelectorAll('input[name="accessories"]:checked'), function (input) {
        return input.value;
      })
      .filter(function (value) {
        return value !== 'None';
      });

    return {
      deviceType: radioValue('deviceType'),
      brand: radioValue('brand'),
      model: (els.form.querySelector('[name="model"]') || {}).value || '',
      condition: radioValue('condition'),
      storage: (els.form.querySelector('[name="storage"]') || {}).value || '',
      ram: (els.form.querySelector('[name="ram"]') || {}).value || '',
      age: (els.form.querySelector('[name="age"]') || {}).value || '',
      charger: radioValue('charger'),
      accessories: accessories,
      name: (els.form.querySelector('[name="name"]') || {}).value || '',
      email: (els.form.querySelector('[name="email"]') || {}).value || '',
      phone: (els.form.querySelector('[name="phone"]') || {}).value || '',
      city: (els.form.querySelector('[name="city"]') || {}).value || ''
    };
  }

  function showEstimate(details) {
    var result = RT.estimateTradeIn(details);
    Array.prototype.forEach.call(els.steps, function (panel) {
      panel.hidden = true;
    });
    if (els.controls) els.controls.hidden = true;
    if (els.progressBar) els.progressBar.style.width = '100%';
    if (els.progressText) els.progressText.textContent = 'Estimate ready';
    els.result.hidden = false;
    els.result.innerHTML =
      '<div class="rounded-2xl border border-sage-200 bg-white p-6 shadow-card sm:p-8" data-reveal>' +
      '<span class="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-800">' +
      RT.icon('check', 'h-4 w-4') +
      'Enquiry received</span>' +
      '<h2 class="mt-4 text-2xl font-extrabold text-ink sm:text-3xl">Indicative value: ' + fmt(result.mid) + '</h2>' +
      '<p class="mt-2 text-sm text-slate-600">Estimated range ' + fmt(result.low) + ' – ' + fmt(result.high) + '</p>' +
      '<dl class="mt-6 grid gap-4 sm:grid-cols-2">' +
      [
        ['Device', details.deviceType + ' · ' + details.brand + (details.model ? ' ' + details.model : '')],
        ['Condition', details.condition],
        ['Storage / RAM', (details.storage || 'Not sure') + ' / ' + (details.ram || 'Not sure')],
        ['Device age', details.age || 'Not sure'],
        ['Charger included', details.charger === 'yes' ? 'Yes' : 'No'],
        ['Accessories', details.accessories.length ? details.accessories.join(', ') : 'None listed'],
        ['Contact', details.name],
        ['Email / Phone', details.email + ' · ' + details.phone]
      ]
        .map(function (row) {
          return (
            '<div class="rounded-xl bg-sage-50 p-4">' +
            '<dt class="text-xs font-bold uppercase tracking-wide text-brand-800">' + row[0] + '</dt>' +
            '<dd class="mt-1 text-sm font-medium text-ink">' + row[1] + '</dd>' +
            '</div>'
          );
        })
        .join('') +
      '</dl>' +
      '<div class="mt-6 rounded-xl border border-amber-300 bg-accent-100 p-4 text-sm text-accent-700">' +
      '<strong class="block font-bold">This is an estimate, not a guaranteed offer.</strong>' +
      'The amount above is calculated from demonstration data. A final figure is confirmed only after we inspect the physical device and verify its condition.</div>' +
      '<div class="mt-6 flex flex-wrap gap-3">' +
      '<a href="contact.html" class="inline-flex min-h-11 items-center rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">Send this as an enquiry</a>' +
      '<button type="button" data-sell-restart class="inline-flex min-h-11 items-center rounded-xl border border-sage-200 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-700 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">Start another device</button>' +
      '</div></div>';

    els.result.focus({ preventScroll: true });
    if (!RT.reduceMotion) els.result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    RT.toast('Enquiry submitted — check the estimate summary.');
  }

  /* ---------------------------------------------------------
     Brand options depend on device type
     --------------------------------------------------------- */
  function renderBrands(type) {
    var container = els.form.querySelector('[data-brand-options]');
    if (!container) return;
    var brands = (RT.tradeInBrands && RT.tradeInBrands[type]) || ['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'Other'];
    var previous = radioValue('brand');
    container.innerHTML = brands
      .map(function (brand, index) {
        var id = 'brand-' + type.toLowerCase() + '-' + index;
        return (
          '<label for="' + id + '" class="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand-700 has-[:checked]:border-brand-700 has-[:checked]:bg-sage-50 has-[:checked]:text-brand-800">' +
          '<input id="' + id + '" type="radio" name="brand" value="' + brand + '" class="h-4 w-4" ' +
          (previous === brand ? 'checked' : '') +
          '>' +
          brand +
          '</label>'
        );
      })
      .join('');
    var error = container.closest('fieldset[data-radio-group="brand"]');
    if (error) {
      var errorEl = error.querySelector('[data-error]');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.hidden = true;
      }
    }
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  function init() {
    els.form = document.querySelector('[data-sell-form]');
    if (!els.form) return;

    els.steps = Array.prototype.slice.call(els.form.querySelectorAll('[data-step]'));
    els.progressSteps = Array.prototype.slice.call(document.querySelectorAll('[data-progress-step]'));
    els.progressBar = document.querySelector('[data-progress-bar]');
    els.progressText = document.querySelector('[data-progress-text]');
    els.prevBtn = document.querySelector('[data-sell-prev]');
    els.nextBtn = document.querySelector('[data-sell-next]');
    els.submitBtn = document.querySelector('[data-sell-submit]');
    els.result = document.querySelector('[data-sell-result]');
    els.controls = els.form.querySelector('[data-sell-controls]');
    if (els.result) {
      els.result.hidden = true;
      els.result.setAttribute('tabindex', '-1');
    }

    RT.attachValidation(els.form);
    renderBrands(radioValue('deviceType') || 'Phone');

    els.form.addEventListener('change', function (event) {
      if (event.target.name === 'deviceType') renderBrands(event.target.value);
    });

    els.form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!validateStep(TOTAL_STEPS)) return;
      showEstimate(collect());
    });

    if (els.nextBtn) {
      els.nextBtn.addEventListener('click', function () {
        if (currentStep >= TOTAL_STEPS) return;
        if (!validateStep(currentStep)) return;
        showStep(currentStep + 1);
      });
    }

    if (els.prevBtn) {
      els.prevBtn.addEventListener('click', function () {
        showStep(Math.max(1, currentStep - 1));
      });
    }

    document.addEventListener('click', function (event) {
      if (event.target.closest('[data-sell-restart]')) {
        els.form.reset();
        renderBrands('Phone');
        els.result.hidden = true;
        els.result.innerHTML = '';
        if (els.controls) els.controls.hidden = false;
        showStep(1);
        var firstField = els.steps[0].querySelector('input');
        if (firstField) firstField.focus();
      }
    });

    showStep(1);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);