/**
 * Makes the enquiry and camp buttons actually do something.
 *
 * The markup is rendered at runtime by support.js and the fields carry no
 * name/id attributes, so this binds by visible button text and input
 * placeholder rather than editing the templated HTML. Submissions compose a
 * pre-filled email — no backend, nothing to maintain.
 *
 * Replace with a real endpoint (Formspree, Netlify Forms, an API route)
 * when the site goes live.
 */
(function () {
  var EMAIL = 'danielcuttingenquiries@gmail.com';

  var text = function (el) {
    return (el.textContent || '').replace(/\s+/g, ' ').trim().toUpperCase();
  };

  /** Nearest ancestor that contains all of this button's sibling inputs. */
  function scopeOf(btn) {
    var node = btn;
    for (var i = 0; i < 8 && node && node.parentElement; i++) {
      node = node.parentElement;
      if (node.querySelectorAll('input, textarea').length) return node;
    }
    return document;
  }

  function fieldsIn(scope) {
    var out = [];
    scope.querySelectorAll('input, textarea').forEach(function (el) {
      var label = el.getAttribute('placeholder') || el.type || 'Field';
      out.push([label, (el.value || '').trim()]);
    });
    return out;
  }

  /** Chip-style choices (Daniel / Daniel & Joshua, Events / Brands / …). */
  function chosenIn(scope) {
    var picked = [];
    scope.querySelectorAll('button').forEach(function (b) {
      var t = text(b);
      if (!t || t.length > 26) return;
      if (/SEND|NOTIFY|BOOK|ENQUIR/.test(t)) return;
      var s = window.getComputedStyle(b);
      var active =
        s.backgroundColor.replace(/\s/g, '') !== 'rgba(0,0,0,0)' &&
        s.backgroundColor !== 'transparent';
      if (active) picked.push(b.textContent.trim());
    });
    return picked;
  }

  function mailto(subject, lines) {
    var body = lines
      .filter(function (l) {
        return l !== null;
      })
      .join('\n');
    window.location.href =
      'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  function flash(btn, msg) {
    var was = btn.innerHTML;
    btn.innerHTML = msg;
    setTimeout(function () {
      btn.innerHTML = was;
    }, 2600);
  }

  function wire() {
    document.querySelectorAll('button, a').forEach(function (btn) {
      if (btn.dataset.dcWired) return;
      var t = text(btn);

      if (/SEND ENQUIRY/.test(t)) {
        btn.dataset.dcWired = '1';
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var scope = scopeOf(btn);
          var fields = fieldsIn(scope);
          var name = (fields[0] || [])[1];
          var email = fields.filter(function (f) {
            return /email/i.test(f[0]);
          })[0];

          if (!email || !email[1]) {
            flash(btn, 'Add your email first');
            return;
          }

          var picks = chosenIn(scope);
          mailto('Enquiry — ' + (name || 'website') + (picks.length ? ' (' + picks.join(' / ') + ')' : ''), [
            picks.length ? 'Enquiry about: ' + picks.join(' / ') : null,
            picks.length ? '' : null,
          ].concat(
            fields.map(function (f) {
              return f[0] + ': ' + (f[1] || '—');
            }),
          ));
        });
      }

      if (/NOTIFY ME/.test(t)) {
        btn.dataset.dcWired = '1';
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var scope = scopeOf(btn);
          var email = (scope.querySelector('input[type="email"], input') || {}).value || '';
          if (!email.trim()) {
            flash(btn, 'Enter your email first');
            return;
          }
          mailto('Football camp — notify me', [
            'Please add me to the list for the next Daniel & Joshua football camp.',
            '',
            'Email: ' + email.trim(),
          ]);
        });
      }
    });
  }

  // support.js renders after load, so bind once things settle and then watch
  // for anything that appears later.
  function start() {
    wire();
    setTimeout(wire, 400);
    setTimeout(wire, 1500);
    if (window.MutationObserver) {
      new MutationObserver(wire).observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
