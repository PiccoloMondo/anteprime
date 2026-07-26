/* Piccolo Mondo — 14-cacao
   Comfortable single-open accordion menu. All menu DOM is built with
   createElement + textContent — menu data is never interpolated into innerHTML. */

(function () {
  "use strict";

  var lang = getLang();
  var openKey = CATEGORY_ORDER[0]; // 'antipasti' open by default

  var accordion = document.getElementById("accordion");
  var infoList = document.getElementById("info");

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- static chrome ---------- */

  function renderChrome() {
    var strings = UI[lang];
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (Object.prototype.hasOwnProperty.call(strings, key)) {
        nodes[i].textContent = strings[key];
      }
    }
    document.getElementById("tagline").textContent = t(RESTAURANT.tagline, lang);

    var buttons = document.querySelectorAll(".lang-btn");
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].setAttribute(
        "aria-pressed",
        buttons[j].getAttribute("data-lang") === lang ? "true" : "false"
      );
    }
  }

  /* ---------- menu ---------- */

  function buildDish(item, sized) {
    var row = el("li", "dish");

    var top = el("div", "dish-top");
    top.appendChild(el("span", "dish-name", item.name));

    if (!sized) {
      top.appendChild(el("span", "dish-dots"));
      top.appendChild(el("span", "dish-price", item.prezzo || ""));
    }
    row.appendChild(top);

    var desc = t(item.description, lang);
    if (desc) row.appendChild(el("p", "dish-desc", desc));

    if (sized) {
      var sizes = el("div", "dish-sizes");
      var defs = [
        ["size_small", item.piccola],
        ["size_medium", item.media],
        ["size_large", item.grande]
      ];
      for (var i = 0; i < defs.length; i++) {
        if (!defs[i][1]) continue;
        var box = el("span", "dish-size");
        box.appendChild(el("span", "sz-label", UI[lang][defs[i][0]]));
        box.appendChild(el("span", "sz-price", defs[i][1]));
        sizes.appendChild(box);
      }
      row.appendChild(sizes);
    }

    return row;
  }

  function closeAll(except) {
    var heads = accordion.querySelectorAll(".acc-head");
    for (var i = 0; i < heads.length; i++) {
      if (heads[i] === except) continue;
      heads[i].setAttribute("aria-expanded", "false");
      document
        .getElementById(heads[i].getAttribute("aria-controls"))
        .setAttribute("data-open", "false");
    }
  }

  function renderMenu() {
    accordion.textContent = "";

    CATEGORY_ORDER.forEach(function (key) {
      var cat = MENU[key];
      if (!cat) return;

      var isOpen = key === openKey;
      var headId = "acc-head-" + key;
      var panelId = "acc-panel-" + key;

      var item = el("div", "acc-item");
      var heading = el("h3", "acc-heading");

      var head = el("button", "acc-head");
      head.type = "button";
      head.id = headId;
      head.setAttribute("aria-expanded", isOpen ? "true" : "false");
      head.setAttribute("aria-controls", panelId);

      head.appendChild(el("span", "acc-title", t(cat.label, lang)));

      var meta = el("span", "acc-meta");
      meta.appendChild(el("span", "acc-count", String(cat.items.length)));
      var icon = el("span", "acc-icon");
      icon.setAttribute("aria-hidden", "true");
      meta.appendChild(icon);
      head.appendChild(meta);

      var panel = el("div", "acc-panel");
      panel.id = panelId;
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-labelledby", headId);
      panel.setAttribute("data-open", isOpen ? "true" : "false");

      var inner = el("div", "acc-panel-inner");
      var body = el("ul", "acc-body");
      cat.items.forEach(function (dish) {
        body.appendChild(buildDish(dish, cat.sized === true));
      });
      inner.appendChild(body);
      panel.appendChild(inner);

      head.addEventListener("click", function () {
        var nowOpen = head.getAttribute("aria-expanded") !== "true";
        closeAll(head);
        head.setAttribute("aria-expanded", nowOpen ? "true" : "false");
        panel.setAttribute("data-open", nowOpen ? "true" : "false");
        openKey = nowOpen ? key : null;
      });

      heading.appendChild(head);
      item.appendChild(heading);
      item.appendChild(panel);
      accordion.appendChild(item);
    });
  }

  /* ---------- contatti ---------- */

  function infoRow(label, valueNode, note) {
    var row = el("div", "info-row");
    var dt = el("dt", "info-label", label);
    var dd = el("dd", "info-value");
    dd.appendChild(valueNode);
    if (note) dd.appendChild(el("span", "info-note", note));
    row.appendChild(dt);
    row.appendChild(dd);
    return row;
  }

  function renderContatti() {
    var strings = UI[lang];
    infoList.textContent = "";

    var addr = document.createElement("a");
    addr.href = RESTAURANT.mapsUrl;
    addr.rel = "noopener noreferrer";
    addr.target = "_blank";
    addr.textContent = RESTAURANT.address;
    infoList.appendChild(infoRow(strings.label_address, addr));

    var tel = document.createElement("a");
    tel.href = RESTAURANT.phoneHref;
    tel.textContent = RESTAURANT.phone;
    infoList.appendChild(infoRow(strings.label_phone, tel));

    var hours = el("span", null, t(RESTAURANT.hours, lang));
    infoList.appendChild(infoRow(strings.label_hours, hours, t(RESTAURANT.closed, lang)));

    document.getElementById("fbLink").href = RESTAURANT.facebook;
    document.getElementById("igLink").href = RESTAURANT.instagram;
    document.getElementById("footAddr").textContent = RESTAURANT.address;
  }

  /* ---------- nav aria-current ---------- */

  var navLinks = document.querySelectorAll(".head-nav a");

  function markCurrent() {
    var best = null;
    var bestTop = -Infinity;
    for (var i = 0; i < navLinks.length; i++) {
      var target = document.getElementById(navLinks[i].getAttribute("href").slice(1));
      if (!target) continue;
      var top = target.getBoundingClientRect().top - 100;
      if (top <= 0 && top > bestTop) {
        bestTop = top;
        best = navLinks[i];
      }
    }
    for (var j = 0; j < navLinks.length; j++) {
      if (navLinks[j] === best) navLinks[j].setAttribute("aria-current", "true");
      else navLinks[j].removeAttribute("aria-current");
    }
  }

  /* ---------- boot ---------- */

  function renderAll() {
    document.documentElement.lang = lang;
    renderChrome();
    renderMenu();
    renderContatti();
  }

  var langButtons = document.querySelectorAll(".lang-btn");
  for (var k = 0; k < langButtons.length; k++) {
    langButtons[k].addEventListener("click", function () {
      var next = this.getAttribute("data-lang");
      if (next === lang) return;
      lang = next;
      setLang(lang);
      renderAll();
    });
  }

  document.getElementById("year").textContent = String(new Date().getFullYear());
  renderAll();
  markCurrent();
  window.addEventListener("scroll", markCurrent, { passive: true });
  window.addEventListener("resize", markCurrent);
})();
