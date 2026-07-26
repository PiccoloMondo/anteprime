(function () {
  "use strict";

  let currentLang = getLang();
  let openCategory = CATEGORY_ORDER[0];

  function clearChildren(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  function renderChrome(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (UI[lang][key] != null) el.textContent = UI[lang][key];
    });

    document.getElementById("lang-it").setAttribute("aria-pressed", String(lang === "it"));
    document.getElementById("lang-en").setAttribute("aria-pressed", String(lang === "en"));
  }

  function renderHero(lang) {
    document.getElementById("hero-tagline").textContent = t(RESTAURANT.tagline, lang);
  }

  function buildItemRow(item, sized) {
    const li = document.createElement("li");
    li.className = "item-row";

    const head = document.createElement("div");
    head.className = "item-head";

    const name = document.createElement("span");
    name.className = "item-name";
    name.textContent = item.name;
    head.appendChild(name);

    if (!sized) {
      const dots = document.createElement("span");
      dots.className = "item-dots";
      head.appendChild(dots);

      const price = document.createElement("span");
      price.className = "item-price";
      price.textContent = item.prezzo;
      head.appendChild(price);
    }

    li.appendChild(head);

    const desc = t(item.description, currentLang);
    if (desc) {
      const p = document.createElement("p");
      p.className = "item-description";
      p.textContent = desc;
      li.appendChild(p);
    }

    if (sized) {
      const sizes = document.createElement("div");
      sizes.className = "item-sizes";

      const entries = [
        ["size_small", item.piccola],
        ["size_medium", item.media],
        ["size_large", item.grande]
      ];

      entries.forEach(([labelKey, value]) => {
        if (value == null) return;
        const wrap = document.createElement("span");
        wrap.className = "item-size";

        const label = document.createElement("span");
        label.className = "size-label";
        label.textContent = UI[currentLang][labelKey];
        wrap.appendChild(label);

        const val = document.createElement("span");
        val.className = "size-value";
        val.textContent = value;
        wrap.appendChild(val);

        sizes.appendChild(wrap);
      });

      li.appendChild(sizes);
    }

    return li;
  }

  function buildAccordionItem(catKey, category, isOpen) {
    const item = document.createElement("div");
    item.className = "accordion-item";

    const headerWrap = document.createElement("div");
    headerWrap.className = "accordion-header-wrap";

    const panelId = `panel-${catKey}`;
    const headerId = `header-${catKey}`;

    const header = document.createElement("button");
    header.type = "button";
    header.className = "accordion-header";
    header.id = headerId;
    header.setAttribute("aria-expanded", String(isOpen));
    header.setAttribute("aria-controls", panelId);

    const label = document.createElement("span");
    label.className = "accordion-label";
    label.textContent = t(category.label, currentLang);
    header.appendChild(label);

    const icon = document.createElement("span");
    icon.className = "accordion-icon";
    icon.setAttribute("aria-hidden", "true");
    header.appendChild(icon);

    headerWrap.appendChild(header);

    const panelOuter = document.createElement("div");
    panelOuter.className = "accordion-panel-outer" + (isOpen ? " is-open" : "");

    const panelInner = document.createElement("div");
    panelInner.className = "accordion-panel-inner";

    const panel = document.createElement("div");
    panel.id = panelId;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", headerId);

    const list = document.createElement("ul");
    list.className = "item-list";

    category.items.forEach((menuItem) => {
      list.appendChild(buildItemRow(menuItem, Boolean(category.sized)));
    });

    panel.appendChild(list);
    panelInner.appendChild(panel);
    panelOuter.appendChild(panelInner);

    header.addEventListener("click", () => {
      openCategory = openCategory === catKey ? null : catKey;
      renderMenu();
    });

    item.appendChild(headerWrap);
    item.appendChild(panelOuter);

    return item;
  }

  function renderMenu() {
    const accordion = document.getElementById("accordion");
    clearChildren(accordion);

    CATEGORY_ORDER.forEach((catKey) => {
      const category = MENU[catKey];
      if (!category) return;
      const isOpen = openCategory === catKey;
      accordion.appendChild(buildAccordionItem(catKey, category, isOpen));
    });
  }

  function renderContact(lang) {
    const addressEl = document.getElementById("contact-address");
    addressEl.textContent = RESTAURANT.address;
    addressEl.href = RESTAURANT.mapsUrl;

    const phoneEl = document.getElementById("contact-phone");
    phoneEl.textContent = RESTAURANT.phone;
    phoneEl.href = RESTAURANT.phoneHref;

    document.getElementById("contact-hours").textContent = t(RESTAURANT.hours, lang);
    document.getElementById("contact-closed").textContent = t(RESTAURANT.closed, lang);

    document.getElementById("social-facebook").href = RESTAURANT.facebook;
    document.getElementById("social-instagram").href = RESTAURANT.instagram;
  }

  function renderFooter() {
    document.getElementById("footer-year").textContent = String(new Date().getFullYear());
  }

  function renderAll() {
    document.documentElement.lang = currentLang;
    renderChrome(currentLang);
    renderHero(currentLang);
    renderMenu();
    renderContact(currentLang);
    renderFooter();
  }

  function setupLangToggle() {
    document.getElementById("lang-it").addEventListener("click", () => {
      currentLang = "it";
      setLang("it");
      renderAll();
    });
    document.getElementById("lang-en").addEventListener("click", () => {
      currentLang = "en";
      setLang("en");
      renderAll();
    });
  }

  setupLangToggle();
  renderAll();
})();
