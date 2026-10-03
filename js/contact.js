/* =============================================================
   ReTech — contact.js
   Client-side validation and a success state for the enquiry
   form. No backend is connected: submissions are handled in the
   browser only and clearly marked as demo behaviour.
   ============================================================= */
(function (global) {
  'use strict';

  var RT = global.ReTech || {};

  function init() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;

    var success = document.querySelector('[data-contact-success]');
    if (success) {
      success.hidden = true;
      success.setAttribute('tabindex', '-1');
    }

    RT.attachValidation(form);

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!RT.validateForm(form)) {
        RT.toast('Please correct the highlighted fields.', 'error');
        return;
      }

      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim().split(' ')[0] || 'there';
      var type = (data.get('enquiryType') || 'General enquiry').toString();
      var device = (data.get('device') || '').toString().trim();
      var reference = 'ENQ-' + String(Math.floor(1000 + Math.random() * 9000));

      if (success) {
        var nameEl = success.querySelector('[data-success-name]');
        var typeEl = success.querySelector('[data-success-type]');
        var deviceEl = success.querySelector('[data-success-device]');
        var refEl = success.querySelector('[data-success-reference]');
        if (nameEl) nameEl.textContent = name;
        if (typeEl) typeEl.textContent = type;
        if (deviceEl) {
          deviceEl.textContent = device || 'Not specified';
          deviceEl.parentElement.hidden = !device;
        }
        if (refEl) refEl.textContent = reference;
        success.hidden = false;
      }

      form.hidden = true;
      RT.toast('Enquiry captured — reference ' + reference + '.');
      if (success) {
        success.focus({ preventScroll: true });
        if (!RT.reduceMotion) success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    document.addEventListener('click', function (event) {
      if (event.target.closest('[data-contact-reset]')) {
        form.reset();
        Array.prototype.forEach.call(form.querySelectorAll('[data-error]'), function (error) {
          error.textContent = '';
          error.hidden = true;
        });
        Array.prototype.forEach.call(form.querySelectorAll('[aria-invalid]'), function (input) {
          input.removeAttribute('aria-invalid');
          input.classList.remove('border-red-500');
          input.classList.add('border-sage-200');
        });
        form.hidden = false;
        if (success) success.hidden = true;
        var first = form.querySelector('input, select, textarea');
        if (first) first.focus();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);