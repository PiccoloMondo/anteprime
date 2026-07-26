/* Piccolo Mondo — 12-prugna
   Renders the menu from data.js. No innerHTML for data-derived DOM. */

(function () {
  "use strict";

  var lang = getLang();

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- static chrome ---------------------------------------- */

  function renderChrome() {
    var strings = UI[lang];

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (strings[key] != null) nodes[i].textContent = strings[key];
    }

    document.documentElement.lang = lang;
    document.getElementById("lang-group").setAttribute("aria-label", strings.lang_toggle_label);
    document.getElementById("lang-it").setAttribute("aria-pressed", String(lang === "it"));
    document.getElementById("lang-en").setAttribute("aria-pressed", String(lang === "en"));
  }

  /* ---------- hero + contact --------------------------------------- */

  function renderInfo() {
    document.getElementById("tagline").textContent = t(RESTAURANT.tagline, lang);

    var address = document.getElementById("c-address");
    address.textContent = RESTAURANT.address;
    address.href = RESTAURANT.mapsUrl;
    address.rel = "noopener";
    address.target = "_blank";

    var phone = document.getElementById("c-phone");
    phone.textContent = RESTAURANT.phone;
    phone.href = RESTAURANT.phoneHref;

    document.getElementById("c-hours").textContent = t(RESTAURANT.hours, lang);
    document.getElementById("c-closed").textContent = t(RESTAURANT.closed, lang);

    document.getElementById("c-fb").href = RESTAURANT.facebook;
    document.getElementById("c-ig").href = RESTAURANT.instagram;

    document.getElementById("year").textContent = String(new Date().getFullYear());
  }

  /* ---------- menu -------------------------------------------------- */

  function sizeCell(label, value) {
    var wrap = el("span", "size");
    wrap.appendChild(el("b", null, label));
    wrap.appendChild(el("span", null, value));
    return wrap;
  }

  function dishNode(item, sized) {
    var row = el("div", sized ? "dish sized" : "dish");

    row.appendChild(el("p", "dish-name", item.name));

    var desc = t(item.description, lang);

    if (sized) {
      if (desc) row.appendChild(el("p", "dish-desc", desc));
      var sizes = el("div", "sizes");
      if (item.piccola) sizes.appendChild(sizeCell(UI[lang].size_small, item.piccola));
      if (item.media) sizes.appendChild(sizeCell(UI[lang].size_medium, item.media));
      if (item.grande) sizes.appendChild(sizeCell(UI[lang].size_large, item.grande));
      row.appendChild(sizes);
    } else {
      if (item.prezzo) row.appendChild(el("p", "dish-price", item.prezzo));
      if (desc) row.appendChild(el("p", "dish-desc", desc));
    }

    return row;
  }

  function renderMenu() {
    var list = document.getElementById("menu-list");
    list.textContent = "";

    for (var i = 0; i < CATEGORY_ORDER.length; i++) {
      var key = CATEGORY_ORDER[i];
      var cat = MENU[key];
      if (!cat) continue;

      var section = el("section", "cat");
      section.id = "cat-" + key;
      section.setAttribute("aria-labelledby", "cat-title-" + key);

      var head = el("div", "cat-title");
      var h3 = el("h3", null, t(cat.label, lang));
      h3.id = "cat-title-" + key;
      head.appendChild(h3);
      section.appendChild(head);

      var dishes = el("div", "dishes");
      for (var j = 0; j < cat.items.length; j++) {
        dishes.appendChild(dishNode(cat.items[j], cat.sized === true));
      }
      section.appendChild(dishes);

      list.appendChild(section);
    }
  }

  /* ---------- language toggle --------------------------------------- */

  function render() {
    renderChrome();
    renderInfo();
    renderMenu();
  }

  function bindLang() {
    var buttons = document.querySelectorAll(".lang button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (event) {
        var next = event.currentTarget.getAttribute("data-lang");
        if (next === lang) return;
        lang = next;
        setLang(lang);
        render();
      });
    }
  }

  /* ---------- nav highlighting -------------------------------------- */

  function bindNav() {
    var links = document.querySelectorAll(".nav a[data-nav]");
    var sections = [];
    for (var i = 0; i < links.length; i++) {
      var target = document.getElementById(links[i].getAttribute("data-nav"));
      if (target) sections.push({ link: links[i], node: target });
    }
    if (!sections.length || typeof IntersectionObserver !== "function") return;

    var visible = {};

    function update() {
      var active = null;
      for (var i = 0; i < sections.length; i++) {
        if (visible[sections[i].node.id]) active = sections[i];
      }
      for (var j = 0; j < sections.length; j++) {
        if (sections[j] === active) {
          sections[j].link.setAttribute("aria-current", "true");
        } else {
          sections[j].link.removeAttribute("aria-current");
        }
      }
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        visible[entries[i].target.id] = entries[i].isIntersecting;
      }
      update();
    }, { rootMargin: "-30% 0px -60% 0px" });

    for (var k = 0; k < sections.length; k++) observer.observe(sections[k].node);
  }

  render();
  bindLang();
  bindNav();
})();
