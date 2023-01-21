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
  const [prices, setPrices] = useState(INITIAL_PRICES);
  const [pricess, setPricess] = useState([]);
  const [pricesss, setPricesss] = useState(INITIAL_PRICES2);
  const [value, setValue] = useState([]);

  const [eurUsdValueLatest, seteurUsdValueLatest] = useState("0");
  const [gbpUsdValueLatest, setgbpUsdValueLatest] = useState("0");
  const [eurJpyValueLatest, seteurJpyValueLatest] = useState("0");

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
      // alert(err);
    }
  }

  async function fetchLatestPricesHandler(element) {
    // async before a function means a function always return a promise
    // async wraps non-promises in a promise
    console.log("Element: " + element);
    const index = element;
    console.log("index: " + index);
    try {
      const response = await fetch("https://swapi.dev/api/starships/");
      // here instead of fetch should be used getAllPrices????
      // await makes JavaScript wait until that promise settles and return its result

      const data = await response.json();
      const latestPriceExtracted = data.results[index].cost_in_credits;
      console.log("latestPriceExtracted");
      console.log(latestPriceExtracted);

      // const transformedToPrices = filteredToSlow.map((starShipData) => {
      //   return {
      //     id: starShipData.model,
      //     title: starShipData.name,
      //     amount: starShipData.cost_in_credits,
      //     length: starShipData.length,
      //     // date: starShipData.created,
      //   };
      // });
      const transformedToPrices = {
        // id: index * Math.random,
        id: index,
        title: "USD/GBP",
        amount: latestPriceExtracted,
        length: "1410",
      };

      console.log("transformedToPrices triple");
      console.log(transformedToPrices);
      console.log("value before: " + value);
      setPricesss((prevState) => {
        return [transformedToPrices, ...prevState];
      });
      console.log("value after: " + value);
      // return transformedToPrices;
      // setPricesss((prevState) => {
      //   return { ...prevState, transformedToPrices};
      // });

      // setPricesss((prevState) => {
      //   return {
      //     [
      //       id: index,
      //   title: "USD/GBP",
      //   amount: latestPriceExtracted,
      //   length: "1410"
      //     ],
      //     ...prevState,
      //   };
      // });

      // setPricesss([]);
      // setPricesss((prevState) => {
      //   return {
      //     transformedToPrices,
      //     ...prevState,
      //   };
      // });
      // setPricesss([])
    } catch (err) {
      // alert(err);
    }
  }

  // SPROBOWAC WRZUCIC fetchlatestPriceHandler DO useEffect-a

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      // fetchPricesHandler();
      console.log("in useEffect counter: " + counter);
      console.log("Value useEffect: " + value);
      // Here should be fetchLatestPrice function invoked

      fetchLatestPricesHandler(counter);
      // const dataFetched = fetchLatestPricesHandler(counter);

      // const neewestValue = dataFetched
      //   .then((response) => {
      //     return response.json();
      //     // this returns promise
      //   })
      //   .then((data) => {
      //     return data.results;
      //   });
      // console.log("neewestValue: " + neewestValue);
      // setValue(neewestValue);
      // // console.log("Value after: " + value);
      counter++;
      console.log("------------------");
    }, 1000);
    return () => {
      console.log("interval Cleared");
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Price Ticker</h1>
        <h4>Tomasz Skrzypek</h4>
        <div className="App-tables">
          <Prices name={"EUR / USD"} items={pricesss} />
          <Prices name={"GBP / USD"} items={pricesss} />
          <Prices name={"EUR / JPY"} items={pricesss} />
        </div>
        <h4>end of timer prices</h4>
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
