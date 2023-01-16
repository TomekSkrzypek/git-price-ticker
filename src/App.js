import "./App.css";
import { startTransition, useState } from "react";
import Prices from "./components/Prices/Prices";
import { useEffect } from "react";

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
  const [pricess, setPricess] = useState([]);

  // function fetchPricesHandler() {
  //   fetch("https://swapi.dev/api/starships/")
  //  // fetch returns a promise
  //     .then((response) => {
  //       return response.json();
  //       // this returns promise
  //     })
  //     .then((data) => {
  //       // trzy razy zrobic to co ponizej dla eurusd gbpusd i eurjpy przefiltrowac a pozniej zmapowac
  //       const transformedToPrices = data.results.map((starShipData) => {
  //         return {
  //           id: starShipData.model,
  //           title: starShipData.name,
  //           amount: starShipData.cost_in_credits,
  //           // date: starShipData.created,
  //         };
  //       });

  //       setPricess(transformedToPrices);
  //     });
  // }

  async function fetchPricesHandler() {
    // async before a function means a function always return a promise
    // async wraps non-promises in a promise

    try {
      const response = await fetch("https://swapi.dev/api/starships/");
      // here instead of fetch should be used getAllPrices????
      // await makes JavaScript wait until that promise settles and return its result

      const data = await response.json();

      // NEW START
      const filteredToSlow = data.results.filter(
        (starShipData1) => starShipData1.length < 600
      );
      console.log("fileteredToSlow");
      console.log(filteredToSlow);

      const transformedToPrices = filteredToSlow.map((starShipData) => {
        return {
          id: starShipData.model,
          title: starShipData.name,
          amount: starShipData.cost_in_credits,
          length: starShipData.length,
          // date: starShipData.created,
        };
      });
      // NEW END

      // const transformedToPrices = data.results.map((starShipData) => {
      //   return {
      //     id: starShipData.model,
      //     title: starShipData.name,
      //     amount: starShipData.cost_in_credits,
      //     // date: starShipData.created,
      //   };
      // });
      setPricess(transformedToPrices);
      console.log("transformedToPrices");
      console.log(transformedToPrices);
    } catch (err) {
      alert(err);
    }
  }



  useEffect(()=> {
    const interval = setInterval(()=> {
      // fetchPricesHandler();

// Here should be fetchLatestPrice function invoked

      console.log("Bang")
    
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Price Ticker</h1>
        <h4>Tomasz Skrzypek</h4>
        <Prices items={INITIAL_PRICES} />
        <p>-----------</p>
        <h4>From Star Wars API Mock Data</h4>
        <button onClick={fetchPricesHandler}>Fetch Fetch Fetch</button>
        <div className="App-tables">
          <Prices items={pricess} />
          <Prices items={pricess} />
          <Prices items={pricess} />
        </div>
      </header>
    </div>
  );
};

export default App;
