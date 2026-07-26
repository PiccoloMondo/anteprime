/* Piccolo Mondo — 08-oliva — render + i18n */
(function () {
  "use strict";

  var lang = getLang();

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- static chrome ---------- */

  function renderChrome() {
    var strings = UI[lang] || UI[DEFAULT_LANG];
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (strings[key]) nodes[i].textContent = strings[key];
    }
    document.getElementById("hero-tagline").textContent = t(RESTAURANT.tagline, lang);

    var group = document.getElementById("lang-group");
    group.setAttribute("aria-label", strings.lang_toggle_label);

    var buttons = document.querySelectorAll(".lang-btn");
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].setAttribute("aria-pressed", buttons[b].getAttribute("data-lang") === lang ? "true" : "false");
    }
  }

  /* ---------- menu ---------- */

  function dishLine(name, price) {
    var line = el("div", "dish-line");
    line.appendChild(el("span", "dish-name", name));
    var dots = el("span", "dish-dots");
    dots.setAttribute("aria-hidden", "true");
    line.appendChild(dots);
    line.appendChild(el("span", "dish-price", price));
    return line;
  }

  function renderItem(item, sized, strings) {
    var wrap = el("article", sized ? "dish dish--sized" : "dish");

    if (sized) {
      var head = el("div", "dish-line dish-line--sized");
      head.appendChild(el("span", "dish-name", item.name));
      wrap.appendChild(head);
    } else {
      wrap.appendChild(dishLine(item.name, item.prezzo));
    }

    var desc = t(item.description, lang);
    if (desc) wrap.appendChild(el("p", "dish-desc", desc));

    if (sized) {
      var list = el("ul", "sizes");
      var pairs = [
        [strings.size_small, item.piccola],
        [strings.size_medium, item.media],
        [strings.size_large, item.grande]
      ];
      for (var i = 0; i < pairs.length; i++) {
        if (!pairs[i][1]) continue;
        var li = el("li");
        li.appendChild(el("span", "size-label", pairs[i][0]));
        li.appendChild(el("span", "size-price", pairs[i][1]));
        list.appendChild(li);
      }
      wrap.appendChild(list);
    }

    return wrap;
  }

  function renderMenu() {
    var strings = UI[lang] || UI[DEFAULT_LANG];
    var host = document.getElementById("menu-body");
    host.textContent = "";

    for (var c = 0; c < CATEGORY_ORDER.length; c++) {
      var key = CATEGORY_ORDER[c];
      var cat = MENU[key];
      if (!cat) continue;

      var section = el("section", "chapter");
      section.id = "cap-" + key;
      var titleId = "cap-" + key + "-title";
      section.setAttribute("aria-labelledby", titleId);

      var head = el("header", "chapter-head");
      var h3 = el("h3", "chapter-title", t(cat.label, lang));
      h3.id = titleId;
      head.appendChild(h3);
      var rule = el("div", "chapter-rule");
      rule.setAttribute("aria-hidden", "true");
      head.appendChild(rule);
      section.appendChild(head);

      var grid = el("div", "dishes");
      for (var i = 0; i < cat.items.length; i++) {
        grid.appendChild(renderItem(cat.items[i], cat.sized === true, strings));
      }
      section.appendChild(grid);

      host.appendChild(section);
    }
  }

  /* ---------- contatti ---------- */

  function fact(term, buildValue) {
    var frag = document.createDocumentFragment();
    frag.appendChild(el("dt", null, term));
    var dd = el("dd");
    buildValue(dd);
    frag.appendChild(dd);
    return frag;
  }

  function renderContatti() {
    var strings = UI[lang] || UI[DEFAULT_LANG];
    var host = document.getElementById("contatti-body");
    host.textContent = "";

    host.appendChild(fact(strings.label_address, function (dd) {
      var a = el("a", null, RESTAURANT.address);
      a.href = RESTAURANT.mapsUrl;
      a.rel = "noopener noreferrer";
      a.target = "_blank";
      dd.appendChild(a);
    }));

    host.appendChild(fact(strings.label_phone, function (dd) {
      var a = el("a", null, RESTAURANT.phone);
      a.href = RESTAURANT.phoneHref;
      dd.appendChild(a);
    }));

    host.appendChild(fact(strings.label_hours, function (dd) {
      dd.appendChild(document.createTextNode(t(RESTAURANT.hours, lang)));
      dd.appendChild(el("span", "muted", t(RESTAURANT.closed, lang)));
    }));

    host.appendChild(fact(strings.label_follow, function (dd) {
      var box = el("div", "socials");
      var fb = el("a", null, "Facebook");
      fb.href = RESTAURANT.facebook;
      fb.rel = "noopener noreferrer";
      fb.target = "_blank";
      var ig = el("a", null, "Instagram");
      ig.href = RESTAURANT.instagram;
      ig.rel = "noopener noreferrer";
      ig.target = "_blank";
      box.appendChild(fb);
      box.appendChild(ig);
      dd.appendChild(box);
    }));
  }

  /* ---------- nav highlight ---------- */

  function initNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".head-nav a"));
    var targets = links
      .map(function (a) {
        var id = a.getAttribute("href").slice(1);
        var node = document.getElementById(id);
        return node ? { link: a, node: node } : null;
      })
      .filter(Boolean);

    if (!targets.length || typeof IntersectionObserver !== "function") return;

    var visible = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });
      var active = null;
      targets.forEach(function (item) {
        if (visible[item.node.id]) active = active || item;
      });
      targets.forEach(function (item) {
        if (active && item === active) item.link.setAttribute("aria-current", "true");
        else item.link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-30% 0px -55% 0px" });

    targets.forEach(function (item) { observer.observe(item.node); });
  }

  /* ---------- boot ---------- */

  function renderAll() {
    document.documentElement.lang = lang;
    renderChrome();
    renderMenu();
    renderContatti();
  }

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = btn.getAttribute("data-lang");
      if (next === lang) return;
      lang = next;
      setLang(lang);
      renderAll();
    });
  });

  document.getElementById("foot-year").textContent = String(new Date().getFullYear());
  renderAll();
  initNav();
})();
