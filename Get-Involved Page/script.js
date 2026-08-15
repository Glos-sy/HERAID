document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("donationSlider");
  const valueLabel = document.getElementById("donationValue");
  const kitsLabel = document.getElementById("kitsCount");
  const vaccineLabel = document.getElementById("vaccineCount");

  if (!slider) return;

  function formatNaira(amount) {
    return "\u20A6" + Number(amount).toLocaleString("en-NG");
  }

  function update() {
    const amount = parseInt(slider.value, 10);
    valueLabel.textContent = formatNaira(amount);

    const kits = Math.max(1, Math.round(amount / 2500));
    const vaccines = Math.max(1, Math.round(amount / 5000));

    kitsLabel.textContent =
      kits + (kits === 1 ? " Safe Birth Kit" : " Safe Birth Kits");
    vaccineLabel.textContent =
      vaccines + (vaccines === 1 ? " Tetanus Vaccine" : " Tetanus Vaccines");
  }

  slider.addEventListener("input", update);
  update();
});
