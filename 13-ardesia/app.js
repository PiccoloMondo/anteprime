/* Piccolo Mondo — 13-ardesia
   All data-derived DOM is built with createElement + textContent. */

(function () {
  "use strict";

  var lang = getLang();
  var observer = null;

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

  function wireSpy() {
    if (observer) observer.disconnect();
    if (!("IntersectionObserver" in window)) return;

    var links = {};
    var anchors = document.querySelectorAll(".cat-index a");
    for (var i = 0; i < anchors.length; i++) {
      links[anchors[i].getAttribute("data-cat")] = anchors[i];
    }

    observer = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        var e = entries[j];
        var key = e.target.id.replace(/^cat-/, "");
        var link = links[key];
        if (!link) continue;
        if (e.isIntersecting) {
          for (var k in links) {
            if (Object.prototype.hasOwnProperty.call(links, k)) links[k].removeAttribute("aria-current");
          }
          link.setAttribute("aria-current", "true");
        }
      }
    }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });

    var cats = document.querySelectorAll(".cat");
    for (var m = 0; m < cats.length; m++) observer.observe(cats[m]);
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
