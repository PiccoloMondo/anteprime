/* Piccolo Mondo — 09-bosco
   Renders the menu as alternating full-bleed bands. All data-derived DOM is
   built with createElement + textContent (menu strings contain & and '). */

(function () {
  "use strict";

  var lang = getLang();

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- static chrome ---------- */

  function renderChrome() {
    var dict = UI[lang] || UI[DEFAULT_LANG];
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (dict[key]) nodes[i].textContent = dict[key];
    }

    document.getElementById("hero-tagline").textContent = t(RESTAURANT.tagline, lang);

    var addr = document.getElementById("c-address");
    addr.textContent = RESTAURANT.address;
    addr.href = RESTAURANT.mapsUrl;

    var phone = document.getElementById("c-phone");
    phone.textContent = RESTAURANT.phone;
    phone.href = RESTAURANT.phoneHref;

    document.getElementById("c-hours").textContent = t(RESTAURANT.hours, lang);
    document.getElementById("c-closed").textContent = t(RESTAURANT.closed, lang);
    document.getElementById("c-fb").href = RESTAURANT.facebook;
    document.getElementById("c-ig").href = RESTAURANT.instagram;

    document.getElementById("footer-year").textContent = String(new Date().getFullYear());

    var btns = document.querySelectorAll(".lang-btn");
    for (var b = 0; b < btns.length; b++) {
      btns[b].setAttribute("aria-pressed", btns[b].getAttribute("data-lang") === lang ? "true" : "false");
    }
    var group = document.getElementById("lang-group");
    if (group) group.setAttribute("aria-label", (UI[lang] || UI[DEFAULT_LANG]).lang_toggle_label);

    document.documentElement.lang = lang;
  }

  /* ---------- menu ---------- */

  function sizedRow(item) {
    var dict = UI[lang] || UI[DEFAULT_LANG];
    var list = el("dl", "sizes");
    var pairs = [
      [dict.size_small, item.piccola],
      [dict.size_medium, item.media],
      [dict.size_large, item.grande]
    ];
    for (var i = 0; i < pairs.length; i++) {
      if (!pairs[i][1]) continue;
      var wrap = el("div", "size");
      wrap.appendChild(el("dt", null, pairs[i][0]));
      wrap.appendChild(el("dd", null, pairs[i][1]));
      list.appendChild(wrap);
    }
    return list;
  }

  function dishNode(item, sized) {
    var li = el("li", "dish");
    var head = el("div", "dish-head");
    head.appendChild(el("span", "dish-name", item.name));

    if (!sized) {
      var lead = el("span", "leader");
      lead.setAttribute("aria-hidden", "true");
      head.appendChild(lead);
      head.appendChild(el("span", "dish-price", item.prezzo || ""));
    }
    li.appendChild(head);

    var desc = t(item.description, lang);
    if (desc) li.appendChild(el("p", "dish-desc", desc));

    if (sized) li.appendChild(sizedRow(item));
    return li;
  }

  function categoryBand(key, index) {
    var cat = MENU[key];
    var section = el("section", "band " + (index % 2 === 0 ? "band--soft" : "band--bg"));
    section.id = "cat-" + key;
    var titleId = "cat-title-" + key;
    section.setAttribute("aria-labelledby", titleId);

    var shell = el("div", "shell");

    var heading = el("h3", "band-title", t(cat.label, lang));
    heading.id = titleId;
    shell.appendChild(heading);

    var rule = el("p", "band-rule");
    rule.setAttribute("aria-hidden", "true");
    shell.appendChild(rule);

    var ul = el("ul", "dish-list" + (cat.items.length >= 8 ? " dish-list--split" : ""));
    for (var i = 0; i < cat.items.length; i++) {
      ul.appendChild(dishNode(cat.items[i], cat.sized === true));
    }
    shell.appendChild(ul);

    section.appendChild(shell);
    return section;
  }

  function renderMenu() {
    var host = document.getElementById("menu");
    var stale = host.querySelectorAll(".band");
    for (var s = 0; s < stale.length; s++) stale[s].remove();
    for (var i = 0; i < CATEGORY_ORDER.length; i++) {
      host.appendChild(categoryBand(CATEGORY_ORDER[i], i));
    }
  }

  function render() {
    renderChrome();
    renderMenu();
  }

  /* ---------- language toggle ---------- */

  document.getElementById("lang-group").addEventListener("click", function (event) {
    var btn = event.target.closest(".lang-btn");
    if (!btn) return;
    var next = btn.getAttribute("data-lang");
    if (next === lang) return;
    lang = next;
    setLang(lang);
    render();
  });

  /* ---------- nav aria-current ---------- */

  function markNav() {
    var links = document.querySelectorAll(".site-nav a");
    var best = null;
    var bestTop = -Infinity;
    for (var i = 0; i < links.length; i++) {
      links[i].removeAttribute("aria-current");
      var target = document.querySelector(links[i].getAttribute("href"));
      if (!target) continue;
      var top = target.getBoundingClientRect().top - 90;
      if (top <= 0 && top > bestTop) { bestTop = top; best = links[i]; }
    }
    if (best) best.setAttribute("aria-current", "true");
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { markNav(); ticking = false; });
  }, { passive: true });

  render();
  markNav();
})();
