(function () {
  var MESSAGES = [
    "If you're reading this, you could be bourgeois. Maybe you already own a Patagonia vest.",
    "If you're reading this, you could be bourgeois. Maybe you already own a Patagonia vest.",
    "Wanna own the means of production? You're at the right place.",
    "Wanna own the means of production? You're at the right place.",
    "Want to be landed gentry? We can help you acquire land.",
    "If you want to be bourgeois, maybe you already are. (Check your parents' house.)",
    "It's okay to want a trust fund. You can get there.",
    "Don't let your dreams be dreams! Let them be assets.",
    "Don't let your dreams be dreams! Let them be assets.",
    "Don't let your dreams be dreams! Let them be assets.",
    "You could totally be bourgeois if you wanted.",
    "You could totally be bourgeois if you wanted.",
    "You can be the kind of landlord you wish you never had.",
    "Cracking nest eggs since 2026!",
    "This could be the start of the rest of your portfolio.",
    "Hello again! Your trust fund missed you.",
    "Fear of the guillotine doesn't have to stop you from living as your best self."
  ];

  var STATUSES = [
    "Consulting the invisible hand...",
    "Inheriting grandfather's shipping fortune...",
    "Learning to pronounce \"charcuterie\"...",
    "Opening an account in the Cayman Islands...",
    "Buying a third vacation home...",
    "Disowning the poor cousins...",
    "Lobbying...",
    "Calling a $2.4M house \"cozy\"...",
    "Developing strong opinions on capital gains tax...",
    "Telling a barista to \"hustle\"...",
    "Acquiring the means of production...",
    "Finalizing the paperwork in Delaware..."
  ];

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // Homepage: random epithet
  var epithet = $('#epithet');
  if (epithet) {
    epithet.textContent = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  }

  // Confirm page: state machine
  var states = $$('[data-state]');
  if (!states.length) return;

  var timer = null;

  function setState(name) {
    states.forEach(function (s) { s.classList.toggle('active', s.getAttribute('data-state') === name); });
    window.scrollTo(0, 0);
    if (timer) { clearTimeout(timer); timer = null; }
    if (name === 'progress') startProgress();
  }

  $$('[data-goto]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      setState(el.getAttribute('data-goto'));
    });
  });

  function burst(host) {
    var field = document.createElement('span');
    field.className = 'particle-field';
    var offset = Math.random();
    for (var i = 0; i < 8; i++) {
      var arm = document.createElement('span');
      arm.className = 'particle-arm';
      arm.style.transform = 'rotate(' + (i + offset + 0.5 * Math.random()) * 45 + 'deg) scale(' + (0.5 + Math.random()) + ')';
      var p = document.createElement('span');
      p.className = 'particle';
      arm.appendChild(p);
      field.appendChild(arm);
    }
    host.appendChild(field);
    setTimeout(function () { field.remove(); }, 700);
  }

  function startProgress() {
    var N = 10, BASE = 1500;
    var bar = $('#coin-bar');
    var status = $('#status-line');
    var statuses = STATUSES.slice();
    bar.innerHTML = '';
    status.textContent = statuses.shift();
    var coins = [];
    for (var i = 0; i < N; i++) {
      var c = document.createElement('span');
      c.className = 'coin';
      var empty = document.createElement('span');
      empty.className = 'empty';
      empty.textContent = '◯';
      empty.style.animationDelay = (1 + i * 0.1) + 's, ' + (i * -0.3) + 's';
      c.appendChild(empty);
      bar.appendChild(c);
      coins.push(c);
    }

    var filled = 0;
    function tick() {
      if (filled === N) {
        timer = setTimeout(function () { setState('complete'); }, 600);
        return;
      }
      var c = coins[filled];
      c.innerHTML = '';
      var full = document.createElement('span');
      full.className = 'full';
      full.textContent = '🪙';
      full.style.transform = 'rotate(' + Math.floor(Math.random() * 20 - 10) + 'deg)';
      c.appendChild(full);
      burst(c);
      filled++;
      bar.setAttribute('aria-valuenow', String(filled));
      if (statuses.length) status.textContent = statuses.shift();
      var left = N - filled;
      // Slow down near the end, like every progress bar and every wealth transfer
      var wait = BASE * (left === 1 ? 4 : (left > 0 && left < 5 ? 2 : 1));
      timer = setTimeout(tick, wait);
    }
    timer = setTimeout(tick, 3000);
  }
})();
