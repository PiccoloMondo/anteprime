(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var observer = null;

  function clearChildren(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  function renderI18nChrome(lang) {
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (UI[lang] && UI[lang][key] !== undefined) {
        nodes[i].textContent = UI[lang][key];
      }
    }
  }

  function buildItemRow(item, lang) {
    var row = document.createElement("div");
    row.className = "item__row";

    var name = document.createElement("span");
    name.className = "item__name";
    name.textContent = item.name;
    row.appendChild(name);

    var leader = document.createElement("span");
    leader.className = "item__leader";
    leader.setAttribute("aria-hidden", "true");
    row.appendChild(leader);

    var price = document.createElement("span");
    price.className = "item__price";
    price.textContent = item.prezzo;
    row.appendChild(price);

    return row;
  }

  function buildSizedItem(item, lang) {
    var wrap = document.createElement("div");
    wrap.className = "item item--sized";

    var name = document.createElement("div");
    name.className = "item__name";
    name.textContent = item.name;
    wrap.appendChild(name);

    var sizes = document.createElement("div");
    sizes.className = "item__sizes";

    var sizeDefs = [
      { key: "piccola", label: "size_small" },
      { key: "media", label: "size_medium" },
      { key: "grande", label: "size_large" }
    ];

    sizeDefs.forEach(function (def) {
      if (item[def.key] === undefined) return;
      var s = document.createElement("span");
      s.className = "item__size";

      var label = document.createElement("span");
      label.textContent = UI[lang][def.label] + ":";
      s.appendChild(label);

      var price = document.createElement("span");
      price.className = "item__price";
      price.textContent = item[def.key];
      s.appendChild(price);

      sizes.appendChild(s);
    });

    wrap.appendChild(sizes);

    if (item.description) {
      var desc = document.createElement("p");
      desc.className = "item__description";
      desc.textContent = t(item.description, lang);
      wrap.appendChild(desc);
    }

    return wrap;
  }

  function buildRegularItem(item, lang) {
    var wrap = document.createElement("div");
    wrap.className = "item";
    wrap.appendChild(buildItemRow(item, lang));

    if (item.description) {
      var desc = document.createElement("p");
      desc.className = "item__description";
      desc.textContent = t(item.description, lang);
      wrap.appendChild(desc);
    }

    return wrap;
  }

  function renderMenu(lang) {
    var container = document.getElementById("menu-categories");
    clearChildren(container);

    var railTrack = document.getElementById("rail-track");
    var chipTrack = document.getElementById("chip-track");
    clearChildren(railTrack);
    clearChildren(chipTrack);

    CATEGORY_ORDER.forEach(function (key) {
      var cat = MENU[key];
      if (!cat) return;
      var sectionId = "cat-" + key;

      var section = document.createElement("section");
      section.className = "category";
      section.id = sectionId;

      var heading = document.createElement("h3");
      heading.className = "category__title";
      heading.textContent = t(cat.label, lang);
      section.appendChild(heading);

      cat.items.forEach(function (item) {
        var el = cat.sized ? buildSizedItem(item, lang) : buildRegularItem(item, lang);
        section.appendChild(el);
      });

      container.appendChild(section);

      // Rail link (desktop)
      var railLink = document.createElement("a");
      railLink.className = "rail__link";
      railLink.href = "#" + sectionId;
      railLink.textContent = t(cat.label, lang);
      railLink.dataset.target = sectionId;
      railTrack.appendChild(railLink);

      // Chip (mobile)
      var chip = document.createElement("a");
      chip.className = "chip";
      chip.href = "#" + sectionId;
      chip.textContent = t(cat.label, lang);
      chip.dataset.target = sectionId;
      chipTrack.appendChild(chip);
    });

    setupScrollSpy();
  }

  function setupScrollSpy() {
    if (observer) observer.disconnect();

    var sections = document.querySelectorAll(".category");
    if (!sections.length || !("IntersectionObserver" in window)) return;

    var railLinks = document.querySelectorAll(".rail__link");
    var chips = document.querySelectorAll(".chip");

    function setActive(id) {
      railLinks.forEach(function (l) {
        l.classList.toggle("is-active", l.dataset.target === id);
      });
      chips.forEach(function (c) {
        var active = c.dataset.target === id;
        c.classList.toggle("is-active", active);
        if (active) {
          c.scrollIntoView({
            inline: "center",
            block: "nearest",
            behavior: prefersReducedMotion ? "auto" : "smooth"
          });
        }
      });
    }

    var visible = new Map();

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        });
        if (visible.size === 0) return;
        var topMost = null;
        var topMostVal = Infinity;
        visible.forEach(function (val, id) {
          if (val < topMostVal) {
            topMostVal = val;
            topMost = id;
          }
        });
        if (topMost) setActive(topMost);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  function renderContatti(lang) {
    var grid = document.getElementById("contatti-grid");
    clearChildren(grid);

    var dl = document.createElement("dl");
    dl.className = "contatti__block";

    function addRow(labelKey, content) {
      var dt = document.createElement("dt");
      dt.textContent = UI[lang][labelKey];
      dl.appendChild(dt);
      var dd = document.createElement("dd");
      dd.appendChild(content);
      dl.appendChild(dd);
    }

    var addressLink = document.createElement("a");
    addressLink.href = RESTAURANT.mapsUrl;
    addressLink.target = "_blank";
    addressLink.rel = "noopener noreferrer";
    addressLink.textContent = RESTAURANT.address;
    addRow("label_address", addressLink);

    var phoneLink = document.createElement("a");
    phoneLink.href = RESTAURANT.phoneHref;
    phoneLink.textContent = RESTAURANT.phone;
    addRow("label_phone", phoneLink);

    var hoursWrap = document.createElement("span");
    var hoursLine = document.createElement("span");
    hoursLine.textContent = t(RESTAURANT.hours, lang);
    hoursWrap.appendChild(hoursLine);
    hoursWrap.appendChild(document.createElement("br"));
    var closedLine = document.createElement("span");
    closedLine.textContent = t(RESTAURANT.closed, lang);
    hoursWrap.appendChild(closedLine);
    addRow("label_hours", hoursWrap);

    var followWrap = document.createElement("div");
    followWrap.className = "social-links";
    var fb = document.createElement("a");
    fb.href = RESTAURANT.facebook;
    fb.target = "_blank";
    fb.rel = "noopener noreferrer";
    fb.textContent = "Facebook";
    var ig = document.createElement("a");
    ig.href = RESTAURANT.instagram;
    ig.target = "_blank";
    ig.rel = "noopener noreferrer";
    ig.textContent = "Instagram";
    followWrap.appendChild(fb);
    followWrap.appendChild(ig);
    addRow("label_follow", followWrap);

    grid.appendChild(dl);
  }

  function renderStatic(lang) {
    document.getElementById("hero-tagline").textContent = t(RESTAURANT.tagline, lang);
    document.getElementById("allergeni-text").textContent = UI[lang].allergeni_text;
    document.getElementById("footer-text").textContent =
      RESTAURANT.name + " — " + new Date().getFullYear();
  }

  function setActiveLangButtons(lang) {
    var buttons = document.querySelectorAll(".lang-btn");
    buttons.forEach(function (btn) {
      var isActive = btn.dataset.lang === lang;
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  function render(lang) {
    document.documentElement.lang = lang;
    setActiveLangButtons(lang);
    renderI18nChrome(lang);
    renderMenu(lang);
    renderContatti(lang);
    renderStatic(lang);
  }

  function init() {
    var lang = getLang();
    render(lang);

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var newLang = btn.dataset.lang;
        setLang(newLang);
        render(newLang);
      });
    });

    var cta = document.getElementById("hero-cta");
    cta.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.getElementById("menu");
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
