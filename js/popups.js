document.addEventListener("DOMContentLoaded", () => {
    const packageCards = document.querySelectorAll(".package-card");
    packageCards.forEach((card, index) => {
        const popupId = `popup-${index + 1}`;
        card.addEventListener("click", () => {
            document.querySelectorAll(".popup-overlay").forEach(popup => {
                popup.style.display = "none";
            });
            document.getElementById(popupId).style.display = "block";
        });
    });
    document.querySelectorAll(".popup-overlay").forEach(popup => {
        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.style.display = "none";
            }
        });
    });
});






const rates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0096
};

const currencySymbols = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£"
};

const currencyCycle = ["INR", "USD", "EUR", "GBP"];
let currentIndex = 0;

let savedCurrency = localStorage.getItem("selectedCurrency") || "INR";
if (currencyCycle.includes(savedCurrency)) {
  currentIndex = currencyCycle.indexOf(savedCurrency);
}

function updateAllPricesTo(currency) {
  const symbol = currencySymbols[currency];

  document.querySelectorAll('.rank-popup').forEach(rankPopup => {
    rankPopup.querySelectorAll(".price-line").forEach(el => {
      const inr = parseFloat(el.getAttribute("data-inr"));
      let keys = el.innerText.match(/\/\s*\d+\s*key/)?.[0] || "";
      let converted = currency === "INR" ? inr : (inr * rates[currency]).toFixed(2);
      el.innerText = `💸 ${symbol}${converted} ${keys}`;
    });

    let btn = rankPopup.querySelector(".currency-btn");
    if (btn) {
      btn.innerText = `Currency: ${currency}`;
    }
  });
}

function toggleCurrency(btn) {
  currentIndex = (currentIndex + 1) % currencyCycle.length;
  const selected = currencyCycle[currentIndex];

  localStorage.setItem("selectedCurrency", selected);
  updateAllPricesTo(selected);
}

window.onload = () => {
  updateAllPricesTo(savedCurrency);
};
