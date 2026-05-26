// Assembles clickable contact links on load from encoded data attributes.
// The full email/phone never appears verbatim in the static HTML, so
// scrapers harvesting the source find nothing usable.
(function () {
  function decode(encoded) {
    // base64 of the reversed string -> original
    try {
      return atob(encoded).split('').reverse().join('');
    } catch (e) {
      return '';
    }
  }

  function activate() {
    document.querySelectorAll('a[data-contact]').forEach(function (el) {
      var kind = el.getAttribute('data-contact');
      var value = decode(el.getAttribute('data-enc') || '');
      if (!value) return;
      el.setAttribute('href', (kind === 'tel' ? 'tel:' : 'mailto:') + value);
      el.setAttribute('rel', 'nofollow noreferrer');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', activate);
  } else {
    activate();
  }
})();
