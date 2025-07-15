(function () {
  const containerNeoMik = document.getElementById("mik-rating-block");
  if (!containerNeoMik) return;

  const currentScript =
    document.currentScript ||
    Array.from(document.getElementsByTagName('script')).find(s => s.src && s.src.includes('widget-neo.js'));

  const scriptSrc = currentScript.src;
  const baseUrlNeoMik = scriptSrc.substring(0, scriptSrc.lastIndexOf("/"));
  const jsonFileName = currentScript.dataset.jsonName || 'data';

  const linkNeoMik = document.createElement("link");
  linkNeoMik.rel = "stylesheet";
  linkNeoMik.href = `${baseUrlNeoMik}/style.css`;
  document.head.appendChild(linkNeoMik);

  const fullWrapper = document.createElement("div");

  const containerSizeNeoMik = containerNeoMik.dataset.smallContainer || "";
  const containerClassNeoMik = containerSizeNeoMik ? 'small-container' : '';
  fullWrapper.className = `mik-full-wrapper ${containerClassNeoMik}`;
  


  fetch(`${baseUrlNeoMik}/data.php?file=${jsonFileName}.json`)
    .then((res) => {
    const warning = res.headers.get('X-MIK-WARNING');
    if (warning) {
      console.warn(warning); 
    }
    return res.json();
  })
    
    
    .then((jsonData) => {
      const settings = jsonData.settings || {};
      const casinosNeoMik = jsonData.casinos || [];

const depositMethods = containerNeoMik.dataset.depositMethods || settings.depositMethods || "Deposit Methods:";
const welcomePackage = containerNeoMik.dataset.welcomePackage || settings.welcomePackage || "Welcome Package";
const bonusUpTo = containerNeoMik.dataset.bonusUpTo || settings.bonusUpTo || "Bonus up to:";
const titleNeoMik = containerNeoMik.dataset.title || settings.title || "";

const colorTitleNeoMik = containerNeoMik.dataset.colorTitle || settings.colorTitle || "#000";
const colorTextNeoMik = containerNeoMik.dataset.colorText || settings.colorText || "#606060";
const backgroundItemNeoMik = containerNeoMik.dataset.backgroundItem || settings.backgroundItem || "#e5e5e5";
const backgroundButtonNeoMik = containerNeoMik.dataset.backgroundButton || settings.backgroundButton || "#ffcc29";
const backgroundRatingNeoMik = containerNeoMik.dataset.backgroundRating || settings.backgroundRating || "#ffcc29";


      if (titleNeoMik) {
        const titleElement = document.createElement("h2");
        titleElement.className = "mik-rating-title";
        titleElement.textContent = titleNeoMik;
        fullWrapper.appendChild(titleElement);
      }

      const casinoListWrapper = document.createElement("div");
      casinoListWrapper.className = "mik-cards-list";

      casinosNeoMik.forEach((casino, index) => {
        const depositIcons = casino.deposit.map(method => `
          <img src="${baseUrlNeoMik}/images/icons/${method}.png" alt="${method}">
        `).join('');

        const html_neo_mik = `
          <div class="mik-card" style="background-color:${backgroundItemNeoMik}">
            <div class="mik-left">
              <div class="mik-number" style="background-color:${backgroundRatingNeoMik};color:${colorTitleNeoMik}">${index + 1}</div>
              <a href="${casino.link}" target="_blank" title="${casino.name}" rel="nofollow" class="link-mik-logo">
                <img src="${baseUrlNeoMik}/images/${casino.logo}" alt="${casino.name}" class="mik-logo">
              </a>
              <div class="mik-name" style="color:${colorTitleNeoMik}">${casino.name}</div>
              <div class="mik-stars" style="color:${backgroundRatingNeoMik}">
                ${"★".repeat(casino.rating)}${"☆".repeat(5 - casino.rating)}
              </div>
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
              <a class="mik-btn" href="${casino.link}" target="_blank"
                 style="color:${colorTitleNeoMik};background-color:${backgroundButtonNeoMik}">
                ${casino.button}
              </a>
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
