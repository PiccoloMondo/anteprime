/* Piccolo Mondo — "Mezzanotte"
   Index rail + generously separated menu sections. No innerHTML for data. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var desktop = window.matchMedia("(min-width: 900px)");

  var railList = document.getElementById("railList");
  var categoriesEl = document.getElementById("categories");
  var langGroup = document.getElementById("langGroup");

  var lang = getLang();
  var activeKey = CATEGORY_ORDER[0];
  var observer = null;
  var visible = Object.create(null);

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
      if (strings[key]) nodes[i].textContent = strings[key];
    }

    document.getElementById("heroTagline").textContent = t(RESTAURANT.tagline, lang);

    var address = document.getElementById("addressLink");
    address.textContent = RESTAURANT.address;
    address.href = RESTAURANT.mapsUrl;

    var phone = document.getElementById("phoneLink");
    phone.textContent = RESTAURANT.phone;
    phone.href = RESTAURANT.phoneHref;

    document.getElementById("hours").textContent = t(RESTAURANT.hours, lang);
    document.getElementById("closed").textContent = t(RESTAURANT.closed, lang);

    document.getElementById("fbLink").href = RESTAURANT.facebook;
    document.getElementById("igLink").href = RESTAURANT.instagram;

    var buttons = langGroup.querySelectorAll(".lang-btn");
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].setAttribute(
        "aria-pressed",
        buttons[b].getAttribute("data-lang") === lang ? "true" : "false"
      );
    }

    document.documentElement.lang = lang;
    document.getElementById("footYear").textContent = String(new Date().getFullYear());
  }

  /* ---------- menu ---------- */

  function buildItem(item, sized) {
    var li = el("li", "item");

    var line = el("div", "item-line");
    line.appendChild(el("span", "item-name", item.name));
    line.appendChild(el("span", "leader"));
    if (!sized) {
      line.appendChild(el("span", "item-price", item.prezzo));
    }
    li.appendChild(line);

    var desc = t(item.description, lang);
    if (desc) li.appendChild(el("p", "item-desc", desc));

    if (sized) {
      var sizes = el("div", "sizes");
      var pairs = [
        [UI[lang].size_small, item.piccola],
        [UI[lang].size_medium, item.media],
        [UI[lang].size_large, item.grande]
      ];
      for (var i = 0; i < pairs.length; i++) {
        if (!pairs[i][1]) continue;
        var wrap = el("div", "size");
        wrap.appendChild(el("span", "size-label", pairs[i][0]));
        wrap.appendChild(el("span", "size-price", pairs[i][1]));
        sizes.appendChild(wrap);
      }
      li.appendChild(sizes);
    }

    return li;
  }

  function renderMenu() {
    railList.textContent = "";
    categoriesEl.textContent = "";

    for (var c = 0; c < CATEGORY_ORDER.length; c++) {
      var key = CATEGORY_ORDER[c];
      var cat = MENU[key];
      var label = t(cat.label, lang);

      /* rail entry */
      var li = el("li", "rail-item");
      var btn = el("button", "rail-btn", label);
      btn.type = "button";
      btn.setAttribute("data-key", key);
      btn.setAttribute("aria-current", key === activeKey ? "true" : "false");
      li.appendChild(btn);
      railList.appendChild(li);

      /* section */
      var section = el("section", "cat");
      section.id = "cat-" + key;
      section.setAttribute("data-key", key);
      section.setAttribute("aria-labelledby", "h-" + key);

      var head = el("div", "cat-head");
      var h3 = el("h3", "cat-title", label);
      h3.id = "h-" + key;
      head.appendChild(h3);
      var mark = el("p", "cat-mark", "◆");
      mark.setAttribute("aria-hidden", "true");
      head.appendChild(mark);
      section.appendChild(head);

      var list = el("ul", "items");
      for (var i = 0; i < cat.items.length; i++) {
        list.appendChild(buildItem(cat.items[i], cat.sized === true));
      }
      section.appendChild(list);
      categoriesEl.appendChild(section);
    }
  }

  /* ---------- scroll spy ---------- */

  function setActive(key) {
    if (key === activeKey) return;
    activeKey = key;
    var buttons = railList.querySelectorAll(".rail-btn");
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute("data-key") === key;
      buttons[i].setAttribute("aria-current", on ? "true" : "false");
      if (on && !desktop.matches && buttons[i].scrollIntoView) {
        buttons[i].scrollIntoView({
          inline: "center",
          block: "nearest",
          behavior: reduceMotion.matches ? "auto" : "smooth"
        });
      }
    }
  }

  function startSpy() {
    if (observer) observer.disconnect();
    visible = Object.create(null);
    if (!("IntersectionObserver" in window)) return;

    observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var key = entries[i].target.getAttribute("data-key");
        if (entries[i].isIntersecting) visible[key] = true;
        else delete visible[key];
      }
      for (var c = 0; c < CATEGORY_ORDER.length; c++) {
        if (visible[CATEGORY_ORDER[c]]) {
          setActive(CATEGORY_ORDER[c]);
          return;
        }
      }
    }, { rootMargin: "-90px 0px -55% 0px", threshold: 0 });

    var sections = categoriesEl.querySelectorAll(".cat");
    for (var s = 0; s < sections.length; s++) observer.observe(sections[s]);
  }

  /* ---------- events ---------- */

  railList.addEventListener("click", function (event) {
    var btn = event.target.closest ? event.target.closest(".rail-btn") : null;
    if (!btn) return;
    var key = btn.getAttribute("data-key");
    var target = document.getElementById("cat-" + key);
    if (!target) return;
    setActive(key);
    target.scrollIntoView({
      block: "start",
      behavior: reduceMotion.matches ? "auto" : "smooth"
    });
  });

  langGroup.addEventListener("click", function (event) {
    var btn = event.target.closest ? event.target.closest(".lang-btn") : null;
    if (!btn) return;
    var next = btn.getAttribute("data-lang");
    if (next === lang) return;
    lang = next;
    setLang(lang);
    render();
  });

  function render() {
    renderChrome();
    renderMenu();
    startSpy();
  }

  render();
})();
