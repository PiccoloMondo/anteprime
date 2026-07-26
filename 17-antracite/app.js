/* Piccolo Mondo — 17 antracite
   All menu DOM is built with createElement + textContent. */

(function () {
  "use strict";

  var lang = getLang();

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null && text !== "") node.textContent = text;
    return node;
  }

  /* ---------- static chrome ---------- */

  function renderChrome() {
    var strings = UI[lang] || UI[DEFAULT_LANG];
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (Object.prototype.hasOwnProperty.call(strings, key)) {
        nodes[i].textContent = strings[key];
      }
    }

    document.documentElement.lang = lang;

    var tagline = document.getElementById("tagline");
    if (tagline) tagline.textContent = t(RESTAURANT.tagline, lang);

    var buttons = document.querySelectorAll(".lang-btn");
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].setAttribute("aria-pressed", buttons[b].getAttribute("data-lang") === lang ? "true" : "false");
    }
  }

  /* ---------- menu ---------- */

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function buildCover(label, index) {
    var cover = el("div", "cover");
    cover.appendChild(el("span", "cover-index", pad2(index)));

    var name = el("h3", "cover-name", label);
    cover.appendChild(name);

    var mark = el("span", "cover-mark");
    mark.setAttribute("aria-hidden", "true");
    cover.appendChild(mark);

    return cover;
  }

  function buildSizes(item, strings) {
    var wrap = el("div", "sizes");
    var rows = [
      [strings.size_small, item.piccola],
      [strings.size_medium, item.media],
      [strings.size_large, item.grande]
    ];
    for (var i = 0; i < rows.length; i++) {
      if (!rows[i][1]) continue;
      var row = el("span", "size");
      row.appendChild(el("span", "size-label", rows[i][0]));
      row.appendChild(el("span", "size-price", rows[i][1]));
      wrap.appendChild(row);
    }
    return wrap;
  }

  function buildDish(item, sized, strings) {
    var dish = el("li", "dish");

    var head = el("div", "dish-head");
    head.appendChild(el("span", "dish-name", item.name));

    if (!sized) {
      var dots = el("span", "dots");
      dots.setAttribute("aria-hidden", "true");
      head.appendChild(dots);
      head.appendChild(el("span", "dish-price", item.prezzo || ""));
    }
    dish.appendChild(head);

    var desc = t(item.description, lang);
    if (desc) dish.appendChild(el("p", "dish-desc", desc));

    if (sized) dish.appendChild(buildSizes(item, strings));

    return dish;
  }

  function renderMenu() {
    var strings = UI[lang] || UI[DEFAULT_LANG];
    var body = document.getElementById("menu-body");
    body.textContent = "";

    for (var c = 0; c < CATEGORY_ORDER.length; c++) {
      var key = CATEGORY_ORDER[c];
      var category = MENU[key];
      if (!category) continue;

      var section = el("section", "chapter");
      var headingId = "cat-" + key;
      section.setAttribute("aria-labelledby", headingId);

      var cover = buildCover(t(category.label, lang), c + 1);
      cover.querySelector(".cover-name").id = headingId;
      section.appendChild(cover);

      var list = el("ul", "chapter-list");
      for (var i = 0; i < category.items.length; i++) {
        list.appendChild(buildDish(category.items[i], category.sized === true, strings));
      }
      section.appendChild(list);

      body.appendChild(section);
    }
  }

  /* ---------- contatti ---------- */

  function addRow(dl, term, valueNode) {
    dl.appendChild(el("dt", null, term));
    var dd = el("dd");
    dd.appendChild(valueNode);
    dl.appendChild(dd);
  }

  function renderContact() {
    var strings = UI[lang] || UI[DEFAULT_LANG];
    var dl = document.getElementById("contact-list");
    dl.textContent = "";

    var address = el("a", null, RESTAURANT.address);
    address.href = RESTAURANT.mapsUrl;
    address.target = "_blank";
    address.rel = "noopener";
    addRow(dl, strings.label_address, address);

    var phone = el("a", null, RESTAURANT.phone);
    phone.href = RESTAURANT.phoneHref;
    addRow(dl, strings.label_phone, phone);

    var hours = el("span", null, t(RESTAURANT.hours, lang));
    var hoursWrap = document.createDocumentFragment();
    hoursWrap.appendChild(hours);
    hoursWrap.appendChild(el("span", "closed", t(RESTAURANT.closed, lang)));
    var holder = el("span");
    holder.appendChild(hoursWrap);
    addRow(dl, strings.label_hours, holder);

    var fb = document.getElementById("fb");
    fb.href = RESTAURANT.facebook;
    fb.target = "_blank";
    var ig = document.getElementById("ig");
    ig.href = RESTAURANT.instagram;
    ig.target = "_blank";
  }

  /* ---------- nav highlighting ---------- */

  function markNav() {
    var links = document.querySelectorAll(".nav a");
    function update() {
      var best = null;
      for (var i = 0; i < links.length; i++) {
        var target = document.getElementById(links[i].getAttribute("href").slice(1));
        links[i].removeAttribute("aria-current");
        if (target && target.getBoundingClientRect().top <= 120) best = links[i];
      }
      if (best) best.setAttribute("aria-current", "true");
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- boot ---------- */

  function renderAll() {
    renderChrome();
    renderMenu();
    renderContact();
  }

  document.querySelector("#lang-group").addEventListener("click", function (event) {
    var button = event.target.closest(".lang-btn");
    if (!button) return;
    var next = button.getAttribute("data-lang");
    if (next === lang) return;
    lang = next;
    setLang(lang);
    renderAll();
  });

  var yearNode = document.getElementById("foot-year");
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());

  renderAll();
  markNav();
})();
