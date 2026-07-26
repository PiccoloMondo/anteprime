(function () {
  "use strict";

  // Category key after which to place the typographic divider (food -> drinks)
  var DIVIDER_AFTER = "dolci";
  var SIZE_KEYS = ["piccola", "media", "grande"];
  var SIZE_UI_KEYS = { piccola: "size_small", media: "size_medium", grande: "size_large" };

  function buildDishNonSized(item, lang) {
    var wrap = document.createElement("div");
    wrap.className = "dish";

    var row = document.createElement("div");
    row.className = "dish-row";

    var name = document.createElement("span");
    name.className = "dish-name";
    name.textContent = item.name;

    var leader = document.createElement("span");
    leader.className = "dish-leader";
    leader.setAttribute("aria-hidden", "true");

    var price = document.createElement("span");
    price.className = "dish-price";
    price.textContent = item.prezzo;

    row.appendChild(name);
    row.appendChild(leader);
    row.appendChild(price);
    wrap.appendChild(row);

    var descText = t(item.description, lang);
    if (descText) {
      var desc = document.createElement("p");
      desc.className = "dish-description";
      desc.textContent = descText;
      wrap.appendChild(desc);
    }

    return wrap;
  }

  function buildDishSized(item, lang) {
    var wrap = document.createElement("div");
    wrap.className = "dish";

    var row = document.createElement("div");
    row.className = "dish-row";

    var name = document.createElement("span");
    name.className = "dish-name";
    name.textContent = item.name;

    row.appendChild(name);
    wrap.appendChild(row);

    var descText = t(item.description, lang);
    if (descText) {
      var desc = document.createElement("p");
      desc.className = "dish-description";
      desc.textContent = descText;
      wrap.appendChild(desc);
    }

    var sizes = document.createElement("div");
    sizes.className = "dish-sizes";

    SIZE_KEYS.forEach(function (key) {
      if (!item[key]) return;
      var sizeItem = document.createElement("span");
      sizeItem.className = "size-item";

      var label = document.createElement("span");
      label.className = "size-label";
      label.textContent = UI[lang][SIZE_UI_KEYS[key]] + ":";

      var value = document.createElement("span");
      value.className = "size-value";
      value.textContent = item[key];

      sizeItem.appendChild(label);
      sizeItem.appendChild(value);
      sizes.appendChild(sizeItem);
    });

    wrap.appendChild(sizes);
    return wrap;
  }

  function buildCategory(catKey, lang) {
    var cat = MENU[catKey];
    var section = document.createElement("div");
    section.className = "category";
    section.id = "cat-" + catKey;

    var heading = document.createElement("div");
    heading.className = "category-heading";

    var hr1 = document.createElement("hr");
    var label = document.createElement("span");
    label.textContent = t(cat.label, lang);
    var hr2 = document.createElement("hr");

    heading.appendChild(hr1);
    heading.appendChild(label);
    heading.appendChild(hr2);
    section.appendChild(heading);

    var grid = document.createElement("div");
    grid.className = "dish-grid";

    cat.items.forEach(function (item) {
      var dishEl = cat.sized ? buildDishSized(item, lang) : buildDishNonSized(item, lang);
      grid.appendChild(dishEl);
    });

    section.appendChild(grid);
    return section;
  }

  function renderMenu(lang) {
    var container = document.getElementById("menu-categories");
    container.textContent = "";

    CATEGORY_ORDER.forEach(function (catKey) {
      container.appendChild(buildCategory(catKey, lang));

      if (catKey === DIVIDER_AFTER) {
        var divider = document.createElement("p");
        divider.className = "group-divider";
        divider.setAttribute("aria-hidden", "true");
        divider.textContent = "◆";
        container.appendChild(divider);
      }
    });
  }

  function renderContact(lang) {
    var list = document.getElementById("contact-list");
    list.textContent = "";

    function row(labelKey, valueEl) {
      var dt = document.createElement("dt");
      dt.textContent = UI[lang][labelKey];
      var dd = document.createElement("dd");
      dd.appendChild(valueEl);
      var div = document.createElement("div");
      div.appendChild(dt);
      div.appendChild(dd);
      list.appendChild(div);
    }

    var addressLink = document.createElement("a");
    addressLink.href = RESTAURANT.mapsUrl;
    addressLink.target = "_blank";
    addressLink.rel = "noopener noreferrer";
    addressLink.textContent = RESTAURANT.address;
    row("label_address", addressLink);

    var phoneLink = document.createElement("a");
    phoneLink.href = RESTAURANT.phoneHref;
    phoneLink.textContent = RESTAURANT.phone;
    row("label_phone", phoneLink);

    var hoursWrap = document.createElement("span");
    var hoursLine = document.createElement("span");
    hoursLine.textContent = t(RESTAURANT.hours, lang);
    var closedLine = document.createElement("span");
    closedLine.textContent = t(RESTAURANT.closed, lang);
    closedLine.style.display = "block";
    closedLine.style.opacity = "0.8";
    hoursWrap.appendChild(hoursLine);
    hoursWrap.appendChild(closedLine);
    row("label_hours", hoursWrap);

    var socialWrap = document.getElementById("social-links");
    socialWrap.textContent = "";

    var fbLink = document.createElement("a");
    fbLink.href = RESTAURANT.facebook;
    fbLink.target = "_blank";
    fbLink.rel = "noopener noreferrer";
    fbLink.textContent = "Facebook";

    var igLink = document.createElement("a");
    igLink.href = RESTAURANT.instagram;
    igLink.target = "_blank";
    igLink.rel = "noopener noreferrer";
    igLink.textContent = "Instagram";

    socialWrap.appendChild(fbLink);
    socialWrap.appendChild(igLink);
  }

  function renderStaticText(lang) {
    document.getElementById("hero-tagline").textContent = t(RESTAURANT.tagline, lang);
    document.getElementById("allergeni-text").textContent = UI[lang].allergeni_text;
    document.getElementById("footer-text").textContent =
      "© " + new Date().getFullYear() + " " + RESTAURANT.name;
  }

  function renderI18nChrome(lang) {
    var nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      if (UI[lang][key] != null) {
        node.textContent = UI[lang][key];
      }
    });
  }

  function updateLangButtons(lang) {
    var itBtn = document.getElementById("lang-it");
    var enBtn = document.getElementById("lang-en");
    itBtn.setAttribute("aria-pressed", String(lang === "it"));
    enBtn.setAttribute("aria-pressed", String(lang === "en"));
  }

  function render(lang) {
    document.documentElement.lang = lang;
    renderI18nChrome(lang);
    renderStaticText(lang);
    renderMenu(lang);
    renderContact(lang);
    updateLangButtons(lang);
  }

  function init() {
    var lang = getLang();
    render(lang);

    document.getElementById("lang-it").addEventListener("click", function () {
      setLang("it");
      render("it");
    });
    document.getElementById("lang-en").addEventListener("click", function () {
      setLang("en");
      render("en");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
