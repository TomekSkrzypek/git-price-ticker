import "./App.css";
import { useState } from "react";
import Prices from "./components/Prices/Prices";

const INITIAL_PRICES = [
  // {
  //   id: '1i',
  //   name: 'EUR/USD',
  //   bid: '1.1000',
  //   ask: '1.2300',
  //   time: '01-06-2020 12:01:01:001'
  // }
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const App = () => {
  const [prices, setPrices] = useState(INITIAL_PRICES);
  const [pricess, setPricess] = useState("");

  function fetchPricesHandler() {
    fetch("https://swapi.dev/api/starships/")
      .then((response) => {
        return response.json();
        // this returns promise
      })
      .then((data) => {
        const transformedToPrices = data.results.map((starShipData) => {
          return {
            id: starShipData.model,
            title: starShipData.name,
            amount: starShipData.cost_in_credits,
            // date: starShipData.created,
          };
        });

        setPricess(transformedToPrices);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Price Ticker</h1>
        <h4>Tomasz Skrzypek</h4>
        <Prices items={prices} />
        <p>-----------</p>
        <h4>From Star Wars API Mock Data</h4>
        <button onClick={fetchPricesHandler}>Fetch Fetch Fetch</button>
        <Prices items={pricess} />
      </header>
    </div>
  );
};

export default App;
