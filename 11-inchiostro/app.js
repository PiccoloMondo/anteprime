/* Piccolo Mondo — "Inchiostro"
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

  /* ------------------------------------------------------------- chrome */

  function renderChrome() {
    var strings = UI[lang];
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (Object.prototype.hasOwnProperty.call(strings, key)) {
        nodes[i].textContent = strings[key];
      }
    }

    document.documentElement.lang = lang;

    var buttons = document.querySelectorAll(".lang-btn");
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].setAttribute("aria-pressed", buttons[j].dataset.lang === lang ? "true" : "false");
    }

    document.getElementById("langGroup").setAttribute("aria-label", strings.lang_toggle_label);
    document.getElementById("heroTagline").textContent = t(RESTAURANT.tagline, lang);

    var addr = document.getElementById("addrLink");
    addr.textContent = RESTAURANT.address;
    addr.href = RESTAURANT.mapsUrl;

    var phone = document.getElementById("phoneLink");
    phone.textContent = RESTAURANT.phone;
    phone.href = RESTAURANT.phoneHref;

    document.getElementById("hours").textContent = t(RESTAURANT.hours, lang);
    document.getElementById("closed").textContent = t(RESTAURANT.closed, lang);
    document.getElementById("fbLink").href = RESTAURANT.facebook;
    document.getElementById("igLink").href = RESTAURANT.instagram;
  }

  /* --------------------------------------------------------------- menu */

  function renderItem(item, sized) {
    var wrapper = el("li", "item");

    var row = el("div", "item-row");
    row.appendChild(el("p", "item-name", item.name));

    if (!sized) {
      row.appendChild(el("p", "item-price", item.prezzo || ""));
    }
    wrapper.appendChild(row);

    var desc = t(item.description, lang);
    if (desc) wrapper.appendChild(el("p", "item-desc", desc));

    if (sized) {
      var sizes = el("dl", "sizes");
      var pairs = [
        [UI[lang].size_small, item.piccola],
        [UI[lang].size_medium, item.media],
        [UI[lang].size_large, item.grande]
      ];
      for (var i = 0; i < pairs.length; i++) {
        if (!pairs[i][1]) continue;
        var group = document.createElement("div");
        group.appendChild(el("dt", null, pairs[i][0]));
        group.appendChild(el("dd", "size-price", pairs[i][1]));
        sizes.appendChild(group);
      }
      wrapper.appendChild(sizes);
    }

    return wrapper;
  }

  function renderMenu() {
    var root = document.getElementById("menuRoot");
    root.textContent = "";

    for (var c = 0; c < CATEGORY_ORDER.length; c++) {
      var key = CATEGORY_ORDER[c];
      var category = MENU[key];
      if (!category) continue;

      var section = el("section", "category");
      section.id = "cat-" + key;
      var headingId = "cat-" + key + "-h";
      section.setAttribute("aria-labelledby", headingId);

      var head = el("div", "category-head");
      var heading = el("h3", "category-name", t(category.label, lang));
      heading.id = headingId;
      head.appendChild(heading);
      section.appendChild(head);

      var list = el("ul", "items");
      for (var i = 0; i < category.items.length; i++) {
        list.appendChild(renderItem(category.items[i], category.sized === true));
      }
      section.appendChild(list);

      root.appendChild(section);
    }
  }

  function render() {
    renderChrome();
    renderMenu();
  }

  /* ------------------------------------------------------------ events */

  document.querySelector(".lang").addEventListener("click", function (event) {
    var button = event.target.closest(".lang-btn");
    if (!button) return;
    var next = button.dataset.lang;
    if (next === lang) return;
    lang = next;
    setLang(lang);
    render();
  });

  /* Active nav item while scrolling. */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a"));

  function markCurrent() {
    var current = null;
    for (var i = 0; i < navLinks.length; i++) {
      var target = document.querySelector(navLinks[i].getAttribute("href"));
      if (target && target.getBoundingClientRect().top <= 120) current = navLinks[i];
    }
    for (var j = 0; j < navLinks.length; j++) {
      if (navLinks[j] === current) {
        navLinks[j].setAttribute("aria-current", "true");
      } else {
        navLinks[j].removeAttribute("aria-current");
      }
    }
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      markCurrent();
      ticking = false;
    });
  }, { passive: true });

  document.getElementById("year").textContent = String(new Date().getFullYear());

  render();
  markCurrent();
})();
