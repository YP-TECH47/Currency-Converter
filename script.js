const url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let msg = document.querySelector("#msg");
console.log(msg);

let dropdowns = document.querySelectorAll("#select");
let btn = document.querySelector("#btn");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

function updateFlag(element) {
  let currCode = element.value;
  let countName = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countName}/flat/64.png`;
  let img = element.parentElement.querySelector("img");

  img.src = newSrc;
}
async function getExchangeRate() {
  let amount = document.getElementById("number");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  let fromCurr = document
    .querySelector('select[name="from"]')
    .value.toLowerCase();
  let toCurr = document.querySelector('select[name="to"]').value.toLowerCase();
   const newUrl = `${url}/${fromCurr}.json`;

  let response = await fetch(newUrl);
  let data = await response.json();

  let rate = data[fromCurr][toCurr];

  let finalAmount = amtVal * rate;

  msg.innerText = `${amtVal} ${fromCurr.toUpperCase()} = ${finalAmount.toFixed(2)} ${toCurr.toUpperCase()}`;
}


btn.addEventListener("click", getExchangeRate);
