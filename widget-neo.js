(function () {
  const containerNeoMik = document.getElementById("mik-rating-block");
  if (!containerNeoMik) return;

const currentScript = document.currentScript || document.querySelector('script[src*="widget-neo.js"]');
const baseUrlNeoMik = currentScript.dataset.urlNeo;

console.log(baseUrlNeoMik);

  // Подключаем стили
  const linkNeoMik = document.createElement("link");
  linkNeoMik.rel = "stylesheet";
  linkNeoMik.href = `${baseUrlNeoMik}/style.css`;
  document.head.appendChild(linkNeoMik);

  // Создаем обёртку для всего блока (заголовок + казино)
  const fullWrapper = document.createElement("div");
  fullWrapper.className = "mik-full-wrapper";

  // Добавляем заголовок, если есть
  const titleNeoMik = containerNeoMik.dataset.title;
  if (titleNeoMik) {
    const titleElement = document.createElement("h2");
    titleElement.className = "mik-rating-title";
    titleElement.textContent = titleNeoMik;
    fullWrapper.appendChild(titleElement);
  }

  // Создаем контейнер только для казино
  const casinoListWrapper = document.createElement("div");
  casinoListWrapper.className = "mik-cards-list";

  // Загружаем JSON
  fetch(`${baseUrlNeoMik}/data.json`)
    .then((res) => res.json())
    .then((casinosNeoMik) => {
      casinosNeoMik.forEach((casino, index) => {
        const depositIcons = casino.deposit.map(method => `
          <img src="${baseUrlNeoMik}/images/icons/${method}.png" alt="${method}">
        `).join('');

        const html_neo_mik = `
          <div class="mik-card">
            <div class="mik-left">
         <div class="mik-number">${index + 1}</div>
              <img src="${baseUrlNeoMik}/images/${casino.logo}" alt="${casino.name}" class="mik-logo">
              <div class="mik-name">${casino.name}</div>
              <div class="mik-stars">${"★".repeat(casino.rating)}${"☆".repeat(5 - casino.rating)}</div>
            </div>
            <div class="mik-middle">
              <div class="mik-bonus">
                Bonus up to: <span>${casino.bonus}</span><br>
                <a href="${casino.link}" target="_blank">Welcome Package</a>
                <p>${casino.note}</p>
              </div>
            </div>
            <div class="mik-right">
              <div class="mik-pay-label">Deposit Methods:</div>
              <div class="mik-pay">${depositIcons}</div>
              <a class="mik-btn" href="${casino.link}" target="_blank">${casino.button}</a>
            </div>
          </div>
        `;
        casinoListWrapper.insertAdjacentHTML("beforeend", html_neo_mik);
      });

      // Добавляем список казино внутрь полной обёртки
      fullWrapper.appendChild(casinoListWrapper);
      // Вставляем всё в основной контейнер
      containerNeoMik.appendChild(fullWrapper);
    })
    .catch((e) => console.error("Widget error:", e));
})();
