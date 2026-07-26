/* Piccolo Mondo — 16-fumo
   Mobile: horizontally snapping carousel of category panels.
   Desktop (>=900px): the same panels become ARIA tabs. */

(function () {
  "use strict";

  var DESKTOP = window.matchMedia("(min-width: 900px)");
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)");

  var chipsEl = document.getElementById("chips");
  var trackEl = document.getElementById("track");
  var factsEl = document.getElementById("facts");
  var socialEl = document.getElementById("social");
  var hintEl = document.getElementById("menuHint");
  var taglineEl = document.getElementById("heroTagline");
  var langBtns = Array.prototype.slice.call(document.querySelectorAll(".lang-btn"));

  var lang = getLang();
  var active = 0;
  var chips = [];
  var panels = [];
  var syncing = false;

  function behavior() {
    return REDUCED.matches ? "auto" : "smooth";
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- static chrome ---------- */

  function renderChrome() {
    document.documentElement.lang = lang;
    var strings = UI[lang];
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (strings[key]) nodes[i].textContent = strings[key];
    }
    taglineEl.textContent = t(RESTAURANT.tagline, lang);
    renderHint();
    langBtns.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
  }

  function renderHint() {
    if (DESKTOP.matches) {
      hintEl.textContent = lang === "en" ? "Twelve categories — choose one" : "Dodici categorie — scegli";
    } else {
      hintEl.textContent = lang === "en" ? "Swipe between categories" : "Scorri tra le categorie";
    }
  }

  /* ---------- menu ---------- */

  function buildItem(item, sized) {
    var li = el("li", "item");

    var top = el("div", "item-top");
    top.appendChild(el("span", "item-name", item.name));
    if (!sized) {
      top.appendChild(el("span", "item-dots"));
      top.appendChild(el("span", "item-price", item.prezzo));
    }
    li.appendChild(top);

    var desc = t(item.description, lang);
    if (desc) li.appendChild(el("p", "item-desc", desc));

    if (sized) {
      var box = el("div", "sizes");
      var pairs = [
        [UI[lang].size_small, item.piccola],
        [UI[lang].size_medium, item.media],
        [UI[lang].size_large, item.grande]
      ];
      pairs.forEach(function (p) {
        if (!p[1]) return;
        var s = el("span", "size");
        s.appendChild(el("span", "size-key", p[0]));
        s.appendChild(el("span", "size-val", p[1]));
        box.appendChild(s);
      });
      li.appendChild(box);
    }
    return li;
  }

  function buildMenu() {
    chipsEl.textContent = "";
    trackEl.textContent = "";
    chips = [];
    panels = [];

    CATEGORY_ORDER.forEach(function (key, i) {
      var cat = MENU[key];
      var label = t(cat.label, lang);

      var chip = el("button", "chip", label);
      chip.type = "button";
      chip.id = "chip-" + key;
      chip.setAttribute("data-index", String(i));
      chip.addEventListener("click", function () { go(i, true); });
      chip.addEventListener("keydown", onChipKey);
      chipsEl.appendChild(chip);
      chips.push(chip);

      var panel = el("section", "panel");
      panel.id = "panel-" + key;

      var inner = el("div", "panel-inner");
      var head = el("div", "cat-head");
      head.appendChild(el("h3", "cat-name", label));
      var meta = el("div", "cat-meta");
      var bar = el("span", "bar");
      bar.setAttribute("aria-hidden", "true");
      meta.appendChild(bar);
      meta.appendChild(el("span", "cat-count",
        cat.items.length + (lang === "en" ? " items" : " voci")));
      head.appendChild(meta);
      inner.appendChild(head);

      var ul = el("ul", "items");
      cat.items.forEach(function (item) {
        ul.appendChild(buildItem(item, cat.sized === true));
      });
      inner.appendChild(ul);
      panel.appendChild(inner);
      trackEl.appendChild(panel);
      panels.push(panel);
    });

    applyMode();
    setActive(active, false);
  }

  /* mode: swap ARIA + focus model between carousel and tabs */
  function applyMode() {
    var desktop = DESKTOP.matches;

    if (desktop) {
      chipsEl.setAttribute("role", "tablist");
      chipsEl.removeAttribute("aria-label");
    } else {
      chipsEl.setAttribute("role", "group");
      chipsEl.setAttribute("aria-label", UI[lang].menu_title);
    }

    chips.forEach(function (chip, i) {
      if (desktop) {
        chip.setAttribute("role", "tab");
        chip.setAttribute("aria-controls", panels[i].id);
        chip.setAttribute("aria-selected", String(i === active));
        chip.tabIndex = i === active ? 0 : -1;
        chip.removeAttribute("aria-current");
      } else {
        chip.removeAttribute("role");
        chip.removeAttribute("aria-selected");
        chip.setAttribute("aria-controls", panels[i].id);
        chip.tabIndex = 0;
        if (i === active) chip.setAttribute("aria-current", "true");
        else chip.removeAttribute("aria-current");
      }
    });

    panels.forEach(function (panel, i) {
      panel.setAttribute("aria-labelledby", chips[i].id);
      if (desktop) {
        panel.setAttribute("role", "tabpanel");
        panel.tabIndex = 0;
        panel.classList.toggle("is-active", i === active);
        panel.hidden = false;
      } else {
        panel.setAttribute("role", "group");
        panel.tabIndex = 0;
        panel.classList.remove("is-active");
        panel.hidden = false;
      }
    });

    renderHint();

    if (!desktop) {
      // put the carousel back on the active panel after a layout pass
      requestAnimationFrame(function () { scrollTrackTo(active, false); });
    } else {
      trackEl.scrollLeft = 0;
    }
  }

  function scrollTrackTo(i, animate) {
    syncing = true;
    trackEl.scrollTo({ left: i * trackEl.clientWidth, behavior: animate ? behavior() : "auto" });
    window.setTimeout(function () { syncing = false; }, 420);
  }

  function centreChip(i, animate) {
    if (DESKTOP.matches) return;
    var chip = chips[i];
    if (!chip) return;
    var left = chip.offsetLeft - (chipsEl.clientWidth - chip.offsetWidth) / 2;
    chipsEl.scrollTo({ left: Math.max(0, left), behavior: animate ? behavior() : "auto" });
  }

  function setActive(i, animate) {
    active = i;
    var desktop = DESKTOP.matches;
    chips.forEach(function (chip, n) {
      chip.classList.toggle("is-active", n === i);
      if (desktop) {
        chip.setAttribute("aria-selected", String(n === i));
        chip.tabIndex = n === i ? 0 : -1;
      } else if (n === i) {
        chip.setAttribute("aria-current", "true");
      } else {
        chip.removeAttribute("aria-current");
      }
    });
    if (desktop) {
      panels.forEach(function (p, n) { p.classList.toggle("is-active", n === i); });
    }
    centreChip(i, animate);
  }

  /* jump to a category (from a chip, either mode) */
  function go(i, animate) {
    setActive(i, animate);
    if (!DESKTOP.matches) scrollTrackTo(i, animate);
  }

  function onChipKey(e) {
    if (!DESKTOP.matches) return;
    var i = chips.indexOf(e.currentTarget);
    var next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % chips.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + chips.length) % chips.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = chips.length - 1;
    if (next === null) return;
    e.preventDefault();
    go(next, true);
    chips[next].focus();
  }

  /* carousel -> chip sync */
  var raf = 0;
  trackEl.addEventListener("scroll", function () {
    if (DESKTOP.matches || syncing) return;
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      var w = trackEl.clientWidth;
      if (!w) return;
      var i = Math.round(trackEl.scrollLeft / w);
      i = Math.max(0, Math.min(chips.length - 1, i));
      if (i !== active) setActive(i, true);
    });
  }, { passive: true });

  /* ---------- contatti ---------- */

  function renderContact() {
    factsEl.textContent = "";
    socialEl.textContent = "";
    var s = UI[lang];

    function fact(key, build, sub) {
      var group = el("div", "fact");
      group.appendChild(el("dt", "fact-key", key));
      var dd = el("dd", "fact-val");
      build(dd);
      group.appendChild(dd);
      if (sub) group.appendChild(el("dd", "fact-sub", sub));
      factsEl.appendChild(group);
    }

    fact(s.label_address, function (dd) {
      var a = el("a", null, RESTAURANT.address);
      a.href = RESTAURANT.mapsUrl;
      a.rel = "noopener";
      a.target = "_blank";
      dd.appendChild(a);
    });

    fact(s.label_phone, function (dd) {
      var a = el("a", null, RESTAURANT.phone);
      a.href = RESTAURANT.phoneHref;
      dd.appendChild(a);
    });

    fact(s.label_hours, function (dd) {
      dd.textContent = t(RESTAURANT.hours, lang);
    }, t(RESTAURANT.closed, lang));

    [["Facebook", RESTAURANT.facebook], ["Instagram", RESTAURANT.instagram]].forEach(function (p) {
      var a = el("a", null, p[0]);
      a.href = p[1];
      a.rel = "noopener";
      a.target = "_blank";
      socialEl.appendChild(a);
    });
  }

  /* ---------- language ---------- */

  function render() {
    renderChrome();
    buildMenu();
    renderContact();
  }

  langBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = btn.getAttribute("data-lang");
      if (next === lang) return;
      lang = next;
      setLang(lang);
      document.documentElement.lang = lang;
      render();
    });
  });

  /* ---------- nav current ---------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          if (a.getAttribute("href") === "#" + entry.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    ["menu", "contatti", "allergeni"].forEach(function (id) {
      var n = document.getElementById(id);
      if (n) io.observe(n);
    });
  }

  /* ---------- mode changes ---------- */

  function onModeChange() {
    applyMode();
    setActive(active, false);
  }
  if (DESKTOP.addEventListener) DESKTOP.addEventListener("change", onModeChange);
  else DESKTOP.addListener(onModeChange);

  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    if (DESKTOP.matches) return;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () { scrollTrackTo(active, false); }, 150);
  });

  document.getElementById("footYear").textContent = String(new Date().getFullYear());

  render();
})();
