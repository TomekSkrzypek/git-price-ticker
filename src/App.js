import "./App.css";
import { startTransition, useState } from "react";
import Prices from "./components/Prices/Prices";
import { useEffect } from "react";

const INITIAL_PRICES2 = [
  {
    id: 151,
    title: "USD/GBP",
    amount: 1000,
    length: "1410",
  },
  {
    id: 152,
    title: "USD/GBP",
    amount: 2100,
    length: "1410",
  },
  {
    id: 153,
    title: "USD/GBP",
    amount: 32100,
    length: "1410",
  },
];

const App = () => {
  const [allPrices, setAllPricess] = useState([]);
  const [eurUsdValueLatest, seteurUsdVaueLatest] = useState(INITIAL_PRICES2);
  const [gbpUsdValueLatest, setgbpUsdValueLatest] = useState(INITIAL_PRICES2);
  const [eurJpyValueLatest, seteurJpyValueLatest] = useState([]);

  async function fetchPricesHandler() {
    try {
      const response = await fetch("https://swapi.dev/api/starships/");
      const data = await response.json();
      const filteredToSlow = data.results.filter(
        (starShipData1) => starShipData1.length < 600
      );
      const transformedToPrices = filteredToSlow.map((starShipData) => {
        return {
          id: starShipData.model,
          title: starShipData.name,
          amount: starShipData.cost_in_credits,
          length: starShipData.length,
        };
      });
      setAllPricess(transformedToPrices);
    } catch (err) {
      // alert(err);
    }
  }

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      // Here should be fetchLatestPrice function invoked
      fetchLatestPricesHandler(counter);
      async function fetchLatestPricesHandler(element) {
        const index = element;
        try {
          const response = await fetch("https://swapi.dev/api/starships/");
          const data = await response.json();
          const latestPriceExtracted = data.results[index].cost_in_credits;
          const transformedToPrices = {
            id: index,
            title: "EUR/USD",
            amount: latestPriceExtracted,
            length: "1410",
          };
          seteurUsdVaueLatest((prevState) => {
            return [transformedToPrices, ...prevState];
          });
        } catch (err) {
          // alert(err);
        }
      }
      counter++;
    }, 1000);
    return () => {
      console.log("interval Cleared");
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      // Here should be fetchLatestPrice function invoked
      fetchLatestPricesHandler(counter);
      async function fetchLatestPricesHandler(element) {
        const index = element;
        try {
          const response = await fetch("https://swapi.dev/api/starships/");
          const data = await response.json();
          const latestPriceExtracted = data.results[index].cost_in_credits;
          const transformedToPrices = {
            id: index,
            title: "GBP/USD",
            amount: latestPriceExtracted,
            length: "1410",
          };
          setgbpUsdValueLatest((prevState) => {
            return [transformedToPrices, ...prevState];
          });
        } catch (err) {
          // alert(err);
        }
      }
      counter++;
    }, 1000);
    return () => {
      console.log("interval Cleared");
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      // Here should be fetchLatestPrice function invoked
      fetchLatestPricesHandler(counter);
      async function fetchLatestPricesHandler(element) {
        const index = element;
        try {
          const response = await fetch("https://swapi.dev/api/starships/");
          const data = await response.json();
          const latestPriceExtracted = data.results[index].cost_in_credits;
          const transformedToPrices = {
            id: index,
            title: "EUR/JPY",
            amount: latestPriceExtracted,
            length: "1410",
          };
          seteurJpyValueLatest((prevState) => {
            return [transformedToPrices, ...prevState];
          });
        } catch (err) {
          // alert(err);
        }
      }
      counter++;
    }, 1000);
    return () => {
      console.log("interval Cleared");
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    fetchPricesHandler();
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Price Ticker</h1>
        <h4>Tomasz Skrzypek</h4>
        <div className="App-tables">
          <Prices name={"EUR / USD"} items={eurUsdValueLatest} />
          <Prices name={"GBP / USD"} items={gbpUsdValueLatest} />
          <Prices name={"EUR / JPY"} items={eurJpyValueLatest} />
        </div>
        <h4>All prices</h4>
        <div className="App-tables">
          <Prices items={allPrices} />
          <Prices items={allPrices} />
          <Prices items={allPrices} />
          {/* here tables are the same but from a command getAllPrices I would extract specific currency */}
        </div>
      </header>
    </div>
  );
};

export default App;
