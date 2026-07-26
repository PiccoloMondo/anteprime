/* Piccolo Mondo — 13-ardesia
   All data-derived DOM is built with createElement + textContent. */

(function () {
  "use strict";

  var lang = getLang();
  var spy = null;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  /* ---------- static chrome ---------- */

  function renderChrome() {
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (UI[lang] && UI[lang][key]) nodes[i].textContent = UI[lang][key];
    }

    document.documentElement.lang = lang;
    document.title = RESTAURANT.name + " — " + t(RESTAURANT.tagline, lang);

    var brandSince = document.querySelector(".brand-since");
    if (brandSince) brandSince.textContent = "Arbia · " + RESTAURANT.since;

    var brandName = document.querySelector(".brand-name");
    if (brandName) brandName.textContent = RESTAURANT.name;

    var tagline = document.getElementById("hero-tagline");
    if (tagline) tagline.textContent = t(RESTAURANT.tagline, lang);

    var place = document.getElementById("hero-place");
    if (place) place.textContent = RESTAURANT.address;

    var btns = document.querySelectorAll(".lang-btn");
    for (var b = 0; b < btns.length; b++) {
      btns[b].setAttribute("aria-pressed", btns[b].getAttribute("data-lang") === lang ? "true" : "false");
    }
  }

  /* ---------- contact ---------- */

  function renderContact() {
    var address = document.getElementById("c-address");
    address.textContent = RESTAURANT.address;
    address.href = RESTAURANT.mapsUrl;

    var phone = document.getElementById("c-phone");
    phone.textContent = RESTAURANT.phone;
    phone.href = RESTAURANT.phoneHref;

    document.getElementById("c-hours").textContent = t(RESTAURANT.hours, lang);
    document.getElementById("c-closed").textContent = t(RESTAURANT.closed, lang);

    document.getElementById("c-fb").href = RESTAURANT.facebook;
    document.getElementById("c-ig").href = RESTAURANT.instagram;

    document.getElementById("year").textContent = String(new Date().getFullYear());
  }

  /* ---------- menu ---------- */

  function sizedRow(label, value) {
    var li = document.createElement("li");
    li.appendChild(el("span", "size-label", label));
    li.appendChild(el("span", "size-price", value));
    return li;
  }

  function buildItem(item, sized) {
    var li = el("li", "item");
    var line = el("div", "item-line");

    line.appendChild(el("span", "item-name", item.name));
    if (!sized && item.prezzo) line.appendChild(el("span", "item-price", item.prezzo));
    li.appendChild(line);

    var desc = t(item.description, lang);
    if (desc) li.appendChild(el("p", "item-desc", desc));

    if (sized) {
      var ul = el("ul", "sizes");
      if (item.piccola) ul.appendChild(sizedRow(UI[lang].size_small, item.piccola));
      if (item.media) ul.appendChild(sizedRow(UI[lang].size_medium, item.media));
      if (item.grande) ul.appendChild(sizedRow(UI[lang].size_large, item.grande));
      li.appendChild(ul);
    }

    return li;
  }

  function buildCategory(key, index) {
    var cat = MENU[key];
    var section = el("section", "cat");
    section.id = "cat-" + key;
    var headingId = "h-" + key;
    section.setAttribute("aria-labelledby", headingId);

    var head = el("div", "cat-head");
    head.appendChild(el("p", "cat-count", pad2(index + 1) + " — " + pad2(CATEGORY_ORDER.length)));

    var h = el("h3", "cat-title", t(cat.label, lang));
    h.id = headingId;
    head.appendChild(h);

    var rule = el("div", "cat-rule");
    rule.setAttribute("aria-hidden", "true");
    head.appendChild(rule);
    section.appendChild(head);

    var list = el("ul", "items");
    for (var i = 0; i < cat.items.length; i++) {
      list.appendChild(buildItem(cat.items[i], cat.sized === true));
    }
    section.appendChild(list);

    return section;
  }

  function renderMenu() {
    var body = document.getElementById("menu-body");
    var index = document.getElementById("cat-index-list");
    body.textContent = "";
    index.textContent = "";

    for (var i = 0; i < CATEGORY_ORDER.length; i++) {
      var key = CATEGORY_ORDER[i];
      body.appendChild(buildCategory(key, i));

      var li = document.createElement("li");
      var a = el("a", null, t(MENU[key].label, lang));
      a.href = "#cat-" + key;
      a.setAttribute("data-cat", key);
      li.appendChild(a);
      index.appendChild(li);
    }

    wireSpy();
  }

  /* ---------- active-category spy ---------- */

  /* Marks the category currently crossing a probe line just under the sticky
     header. Plain scroll maths — no observers, no animation. */
  function wireSpy() {
    if (spy) {
      window.removeEventListener("scroll", spy);
      window.removeEventListener("resize", spy);
    }

    var links = document.querySelectorAll(".cat-index a");
    var cats = document.querySelectorAll(".cat");
    if (!links.length || !cats.length) return;

    var ticking = false;

    function update() {
      ticking = false;
      var probe = Math.max(80, window.innerHeight * 0.25);
      var active = 0;
      for (var i = 0; i < cats.length; i++) {
        if (cats[i].getBoundingClientRect().top <= probe) active = i;
      }
      for (var j = 0; j < links.length; j++) {
        if (j === active) links[j].setAttribute("aria-current", "true");
        else links[j].removeAttribute("aria-current");
      }
    }

    spy = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("resize", spy, { passive: true });
    update();
  }

  /* ---------- language toggle ---------- */

  function wireLang() {
    var btns = document.querySelectorAll(".lang-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (ev) {
        var next = ev.currentTarget.getAttribute("data-lang");
        if (next === lang) return;
        lang = next;
        setLang(lang);
        renderAll();
      });
    }
  }

  function renderAll() {
    renderChrome();
    renderContact();
    renderMenu();
  }

  renderAll();
  wireLang();
})();
