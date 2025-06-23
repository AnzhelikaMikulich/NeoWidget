(function () {
  const containerNeoMik = document.getElementById("mik-rating-block");
  if (!containerNeoMik) return;

  const currentScript = document.currentScript || document.querySelector('script[src*="widget-neo.js"]');
  const baseUrlNeoMik = currentScript.dataset.urlNeo;

  const depositMethods = containerNeoMik.dataset.depositMethods || "Deposit Methods:";
  const welcomePackage = containerNeoMik.dataset.welcomePackage || "Welcome Package";
  const bonusUpTo = containerNeoMik.dataset.bonusUpTo || "Bonus up to:";

  const colorTitleNeoMik = containerNeoMik.dataset.colorTitle || "#000";
  const colorTextNeoMik = containerNeoMik.dataset.colorText || "#606060";
  const backgroundItemNeoMik = containerNeoMik.dataset.backgroundItem || "#e5e5e5";
  const backgroundButtonNeoMik = containerNeoMik.dataset.backgroundButton || "#ffcc29";
  const backgroundRatingNeoMik = containerNeoMik.dataset.backgroundRating || "#ffcc29";

  const containerSizeNeoMik = containerNeoMik.dataset.smallContainer || "";
  const containerClassNeoMik = containerSizeNeoMik ? 'small-container' : '';

  const linkNeoMik = document.createElement("link");
  linkNeoMik.rel = "stylesheet";
  linkNeoMik.href = `${baseUrlNeoMik}/style.css`;
  document.head.appendChild(linkNeoMik);


  const fullWrapper = document.createElement("div");
  fullWrapper.className = `mik-full-wrapper ${containerClassNeoMik}`;

  const titleNeoMik = containerNeoMik.dataset.title;
  if (titleNeoMik) {
    const titleElement = document.createElement("h2");
    titleElement.className = "mik-rating-title";
    titleElement.textContent = titleNeoMik;
    fullWrapper.appendChild(titleElement);
  }

  const casinoListWrapper = document.createElement("div");
  casinoListWrapper.className = "mik-cards-list";

  fetch(`${baseUrlNeoMik}/data.json`)
    .then((res) => res.json())
    .then((casinosNeoMik) => {
      casinosNeoMik.forEach((casino, index) => {
        const depositIcons = casino.deposit.map(method => `
          <img src="${baseUrlNeoMik}/images/icons/${method}.png" alt="${method}">
        `).join('');

        const html_neo_mik = `
          <div class="mik-card" style="background-color:${backgroundItemNeoMik}">
            <div class="mik-left">
         <div class="mik-number" style="background-color:${backgroundRatingNeoMik};color:${colorTitleNeoMik}">${index + 1}</div>
         <a href="${casino.link}" target="_blank" title="${casino.name}" rel="nofollow" class="link-mik-logo">
              <img src="${baseUrlNeoMik}/images/${casino.logo}" alt="${casino.name}" class="mik-logo"></a>
              <div class="mik-name" style="color:${colorTitleNeoMik}">${casino.name}</div>
              <div class="mik-stars" style="color:${backgroundRatingNeoMik}">${"★".repeat(casino.rating)}${"☆".repeat(5 - casino.rating)}</div>
            </div>
            <div class="mik-middle">
              <div class="mik-bonus" style="color:${colorTextNeoMik}">
                ${bonusUpTo}: <span style="color:${colorTextNeoMik}">${casino.bonus}</span><br>
                <a href="${casino.link}" target="_blank" style="color:${colorTitleNeoMik}">${welcomePackage}</a>
                <p>${casino.note}</p>
              </div>
            </div>
            <div class="mik-right" style="color:${colorTitleNeoMik}">
              <div class="mik-pay-label">${depositMethods}</div>
              <div class="mik-pay">${depositIcons}</div>
            </div>
            <div class="mik-right">
             <a class="mik-btn" href="${casino.link}" target="_blank" style="color:${colorTitleNeoMik};background-color:${backgroundButtonNeoMik}">${casino.button}</a>
             </div>
          </div>
        `;
        casinoListWrapper.insertAdjacentHTML("beforeend", html_neo_mik);
      });

      fullWrapper.appendChild(casinoListWrapper);
      containerNeoMik.appendChild(fullWrapper);
    })
    .catch((e) => console.error("Widget error:", e));
})();

