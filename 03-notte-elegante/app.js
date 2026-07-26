(function(){
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('allergeni-text').textContent = ALLERGENI_TEXT;
  document.getElementById('c-address').textContent = RESTAURANT.address;
  document.getElementById('c-phone').textContent = RESTAURANT.phone;
  document.getElementById('c-phone').href = RESTAURANT.phoneHref;
  document.getElementById('c-hours').textContent = RESTAURANT.hours;
  document.getElementById('c-closed').textContent = RESTAURANT.closed;
  document.getElementById('c-fb').href = RESTAURANT.facebook;
  document.getElementById('c-ig').href = RESTAURANT.instagram;

  const tabs = document.getElementById('tabs');
  const panels = document.getElementById('panels');

  CATEGORY_ORDER.forEach((key, idx) => {
    const cat = MENU[key];

    const tab = document.createElement('button');
    tab.className = 'tab-btn' + (idx === 0 ? ' active' : '');
    tab.textContent = cat.label;
    tab.dataset.target = key;
    tab.addEventListener('click', () => {
      tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      panels.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-' + key).classList.add('active');
    });
    tabs.appendChild(tab);

    const panel = document.createElement('div');
    panel.className = 'panel' + (idx === 0 ? ' active' : '');
    panel.id = 'panel-' + key;

    cat.items.forEach(item => {
      const d = document.createElement('div');
      d.className = 'dish';
      if (cat.sized) {
        d.innerHTML = `
          <div class="dish-row"><span class="dish-name">${item.name}</span></div>
          ${item.description ? `<div class="dish-desc">${item.description}</div>` : ''}
          <div class="dish-sizes"><span>Piccola ${item.piccola}</span><span>Media ${item.media}</span><span>Grande ${item.grande}</span></div>`;
      } else {
        d.innerHTML = `
          <div class="dish-row"><span class="dish-name">${item.name}</span><span class="dish-dots"></span><span class="dish-price">${item.prezzo}</span></div>
          ${item.description ? `<div class="dish-desc">${item.description}</div>` : ''}`;
      }
      panel.appendChild(d);
    });

    panels.appendChild(panel);
  });
})();
