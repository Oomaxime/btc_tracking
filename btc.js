const { default: axios } = require("axios");
const process = require("process");
let args = process.argv;

async function getPrice(choice) {
  const devise = choice.toUpperCase();
  try {
    const response = await axios.get(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    const defaultValue = response.data.bpi["USD"].rate;
    const value =
      devise === "EUR" || devise === "USD" || devise === "GBP"
        ? response.data.bpi[devise].rate
        : null;

    //Cette syntax pour 'currencySymbol' vien de chatGPT
    const currencySymbol = {
      EUR: "€",
      USD: "$",
      GBP: "£",
    }[devise];

    console.log(
      value
        ? `Voici le cours actuel du Bitcoin :\n1 BTC = ${value}${currencySymbol}`
        : `Erreur ! Mauvais argument !\nDevises disponibles : EUR, USD, GBP`
    );
  } catch (error) {
    console.error("Une erreur s'est produite :", error.message);
  }
}

getPrice(args[2]);
