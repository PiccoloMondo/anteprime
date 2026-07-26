/* Piccolo Mondo — 10-brace
   Numbered chapters with pinning category headings.
   All data-derived DOM is built with createElement + textContent. */

(function () {
  "use strict";

  var lang = getLang();

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  /* ---------- menu ---------- */

  function renderSizedRow(item, l) {
    var list = el("div", "sizes");
    var sizes = [
      [UI[l].size_small, item.piccola],
      [UI[l].size_medium, item.media],
      [UI[l].size_large, item.grande]
    ];
    sizes.forEach(function (pair) {
      if (!pair[1]) return;
      var row = document.createElement("div");
      row.appendChild(el("span", "size-label", pair[0]));
      row.appendChild(el("span", "size-price", pair[1]));
      list.appendChild(row);
    });
    return list;
  }

  function renderItem(item, sized, l) {
    var li = el("li", "dish");

    var line = el("div", "dish-line");
    line.appendChild(el("span", "dish-name", item.name));

    if (!sized) {
      line.appendChild(el("span", "leader"));
      line.appendChild(el("span", "dish-price", item.prezzo || ""));
    }
    li.appendChild(line);

    var desc = t(item.description, l);
    if (desc) li.appendChild(el("p", "dish-desc", desc));

    if (sized) li.appendChild(renderSizedRow(item, l));

    return li;
  }

  function renderMenu(l) {
    var root = document.getElementById("menu-root");
    root.textContent = "";

    CATEGORY_ORDER.forEach(function (key, index) {
      var cat = MENU[key];
      if (!cat) return;

      var section = el("section", "chapter");
      section.id = "cat-" + key;

      var head = el("div", "chapter-head");
      var num = el("span", "chapter-num", pad2(index + 1));
      num.setAttribute("aria-hidden", "true");
      head.appendChild(num);

      var h3 = el("h3", "chapter-title", t(cat.label, l));
      h3.id = "cat-" + key + "-title";
      head.appendChild(h3);
      section.appendChild(head);

      section.setAttribute("aria-labelledby", h3.id);

      var ul = el("ul", "dishes");
      cat.items.forEach(function (item) {
        ul.appendChild(renderItem(item, cat.sized === true, l));
      });
      section.appendChild(ul);

      root.appendChild(section);
    });
  }

  /* ---------- chrome ---------- */

  function renderChrome(l) {
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (UI[l] && UI[l][key]) nodes[i].textContent = UI[l][key];
    }

    document.getElementById("tagline").textContent = t(RESTAURANT.tagline, l);
    document.getElementById("hours").textContent = t(RESTAURANT.hours, l);
    document.getElementById("closed").textContent = t(RESTAURANT.closed, l);

    var addr = document.getElementById("address-link");
    addr.textContent = RESTAURANT.address;
    addr.href = RESTAURANT.mapsUrl;
    addr.rel = "noopener";
    addr.target = "_blank";

    var tel = document.getElementById("phone-link");
    tel.textContent = RESTAURANT.phone;
    tel.href = RESTAURANT.phoneHref;

    var fb = document.getElementById("fb-link");
    fb.href = RESTAURANT.facebook;
    fb.rel = "noopener";
    fb.target = "_blank";

    var ig = document.getElementById("ig-link");
    ig.href = RESTAURANT.instagram;
    ig.rel = "noopener";
    ig.target = "_blank";

    var group = document.getElementById("langgroup");
    group.setAttribute("aria-label", UI[l].lang_toggle_label);

    var buttons = group.querySelectorAll("button[data-lang]");
    for (var j = 0; j < buttons.length; j++) {
      var active = buttons[j].getAttribute("data-lang") === l;
      buttons[j].setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  function render(l) {
    document.documentElement.lang = l;
    renderChrome(l);
    renderMenu(l);
  }

  /* ---------- nav aria-current ---------- */

  function initNav() {
    var links = document.querySelectorAll(".nav a");
    if (!("IntersectionObserver" in window)) return;

    var sections = [];
    for (var i = 0; i < links.length; i++) {
      var target = document.querySelector(links[i].getAttribute("href"));
      if (target) sections.push({ link: links[i], section: target });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        sections.forEach(function (pair) {
          if (pair.section === entry.target) {
            if (entry.isIntersecting) {
              sections.forEach(function (p) { p.link.removeAttribute("aria-current"); });
              pair.link.setAttribute("aria-current", "true");
            }
          }
        });
      });
    }, { rootMargin: "-20% 0px -70% 0px" });

    sections.forEach(function (pair) { observer.observe(pair.section); });
  }

  /* ---------- boot ---------- */

  document.getElementById("langgroup").addEventListener("click", function (event) {
    var button = event.target.closest("button[data-lang]");
    if (!button) return;
    var next = button.getAttribute("data-lang");
    if (next === lang) return;
    lang = next;
    setLang(lang);
    render(lang);
  });

  document.getElementById("year").textContent = String(new Date().getFullYear());

  render(lang);
  initNav();
})();
