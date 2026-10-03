/* =============================================================
   ReTech — footer.js
   Injects the shared site footer. Every page only needs:
   <div id="footer"></div>
   ============================================================= */
(function (global) {
  'use strict';

  var RT = global.ReTech || {};
  var MOUNT_ID = 'footer';

  var columns = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: 'products.html' },
        { label: 'Laptops', href: 'products.html?category=laptops' },
        { label: 'Phones', href: 'products.html?category=phones' },
        { label: 'Tablets', href: 'products.html?category=tablets' },
        { label: 'Accessories', href: 'products.html?category=accessories' }
      ]
    },
    {
      title: 'Customer Support',
      links: [
        { label: 'Warranty & Quality', href: 'warranty-quality.html' },
        { label: 'Sell Your Device', href: 'sell-device.html' },
        { label: 'Contact', href: 'contact.html' },
        { label: 'FAQs', href: 'index.html#faq' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: 'about.html' },
        { label: 'Sustainability', href: 'index.html#sustainability' },
        { label: 'Our Process', href: 'warranty-quality.html#process' },
        { label: 'Privacy Policy', href: 'about.html#privacy' },
        { label: 'Terms', href: 'about.html#terms' }
      ]
    }
  ];

  var badges = ['Certified Refurbished', 'Quality Checked', 'Transparent Condition'];

  function icon(path, cls) {
    return (
      '<svg class="' + (cls || 'h-5 w-5') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false">' + path + '</svg>'
    );
  }

  var mailIcon = '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>';
  var phoneIcon = '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>';
  var pinIcon = '<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>';
  var clockIcon = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>';

  function columnMarkup(column) {
    return (
      '<div class="min-w-0 lg:col-span-1">' +
      '<h2 class="text-sm font-bold uppercase tracking-[0.16em] text-sage-200">' +
      column.title +
      '</h2>' +
      '<ul class="mt-4 space-y-3">' +
      column.links
        .map(function (link) {
          return (
            '<li><a href="' +
            link.href +
            '" class="group inline-flex items-center gap-2 text-sm text-white/85 transition-colors hover:text-white focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-200">' +
            '<span class="h-px w-0 bg-sage-200 transition-all duration-300 group-hover:w-4"></span>' +
            link.label +
            '</a></li>'
          );
        })
        .join('') +
      '</ul></div>'
    );
  }

  function template() {
    var store = RT.store || {};
    return (
      '<footer class="bg-brand-800 text-white">' +
      '<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">' +
      '<div class="grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">' +

      /* Brand column */
      '<div class="lg:col-span-2">' +
      '<a href="index.html" aria-label="ReTech — home" class="group flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-200">' +
      '<span class="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand-800 shadow-sm transition-transform duration-300 group-hover:-rotate-6">' +
      '<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false">' +
      '<path stroke-linecap="round" stroke-linejoin="round" d="M7 19H5.5A2.5 2.5 0 013 16.5v-9A2.5 2.5 0 015.5 5H11a2 2 0 012 2v12a2 2 0 01-2 2m-4 0a2 2 0 002 2h4m-6-2h6m6 0h1.5A2.5 2.5 0 0021 16.5v-6A2.5 2.5 0 0018.5 8H15m-2-3h4.5A2.5 2.5 0 0120 7.5v.5a2 2 0 01-2 2h-5V5z"/>' +
      '</svg></span>' +
      '<span class="flex flex-col leading-none">' +
      '<span class="text-xl font-extrabold tracking-tight text-white">ReTech</span>' +
      '<span class="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-sage-200">Certified Refurbished</span>' +
      '</span></a>' +
      '<p class="mt-4 max-w-sm text-sm leading-relaxed text-white/80">' +
      (store.tagline || 'Better Tech. Less Waste.') +
      ' — certified refurbished laptops, phones, tablets and accessories that are inspected, graded and sold with a clearly stated condition.</p>' +

      '<ul class="mt-6 flex flex-wrap gap-2">' +
      badges
        .map(function (badge) {
          return (
            '<li class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sage-100">' +
            badge +
            '</li>'
          );
        })
        .join('') +
      '</ul>' +

      '<address class="mt-6 space-y-2 text-sm not-italic text-white/80">' +
      '<a href="mailto:' + store.email + '" class="flex items-center gap-2.5 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-200">' + icon(mailIcon, 'h-4 w-4 shrink-0 text-sage-200') + store.email + '</a>' +
      '<a href="tel:' + (store.phone || '').replace(/[^+\d]/g, '') + '" class="flex items-center gap-2.5 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-200">' + icon(phoneIcon, 'h-4 w-4 shrink-0 text-sage-200') + store.phone + '</a>' +
      '<p class="flex items-start gap-2.5">' + icon(clockIcon, 'mt-0.5 h-4 w-4 shrink-0 text-sage-200') + store.hours + '</p>' +
      '<p class="flex items-start gap-2.5">' + icon(pinIcon, 'mt-0.5 h-4 w-4 shrink-0 text-sage-200') + store.location + '</p>' +
      '</address>' +
      '<div class="mt-8 flex items-center gap-4">' +
      '<a href="#" aria-label="Facebook" class="text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-200">' +
      '<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>' +
      '</a>' +
      '<a href="#" aria-label="Instagram" class="text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-200">' +
      '<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>' +
      '</a>' +
      '<a href="#" aria-label="Twitter" class="text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-200">' +
      '<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>' +
      '</a>' +
      '</div>' +
      '</div>' +

      /* Link columns */
      columns.map(columnMarkup).join('') +
      '</div>' +

      /* Divider + legal */
      '<div class="mt-12 border-t border-white/15 pt-6">' +
      '<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">' +
      '<p class="text-sm text-white/75">&copy; 2026 ReTech. All rights reserved.</p>' +
      '<p class="text-xs text-white/60">Demonstration website. Products, prices, testimonials and impact figures shown are illustrative sample data.</p>' +
      '</div></div>' +
      '</div></footer>'
    );
  }

  function init() {
    var mount = document.getElementById(MOUNT_ID);
    if (!mount) return;
    mount.innerHTML = template();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);