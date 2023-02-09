import "./App.css";
import { startTransition, useState } from "react";
import Prices from "./components/Prices/Prices";
import { useEffect } from "react";

const App = () => {
  const [eurUsdValueLatest, seteurUsdVaueLatest] = useState([]);
  const [gbpUsdValueLatest, setgbpUsdValueLatest] = useState([]);
  const [eurJpyValueLatest, seteurJpyValueLatest] = useState([]);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      // here should be invoked getLatestPrice(EUR/USD) funcion

      fetch("http://localhost:5000/EurUsd")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("counter -1");
          console.log(counter - 1);
          const bid = data[counter - 1].bid;
          const ask = data[counter - 1].ask;
          const title = data[counter - 1].title;

          const transformedToPrices = {
            id: counter,
            title,
            bid,
            ask,
            timestamp: data[counter - 1].timestamp,
          };

          seteurUsdVaueLatest((prevState) => {
            return [transformedToPrices, ...prevState];
          });
        })
        .catch((err) => {
          throw err;
        });
      counter++;
      console.log("console.log after the counter++");
    }, 600);
    return () => {
      console.log("interval Cleared");
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      // here should be invoked getLatestPrice(GBP/USD) function

      fetch("http://localhost:5000/GbpUsd")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("counter -1");
          console.log(counter - 1);
          const bid = data[counter - 1].bid;
          const ask = data[counter - 1].ask;
          const title = data[counter - 1].title;

          const transformedToPrices = {
            id: counter,
            title,
            bid,
            ask,
            timestamp: data[counter - 1].timestamp,
          };

          setgbpUsdValueLatest((prevState) => {
            return [transformedToPrices, ...prevState];
          });
        })
        .catch((err) => {
          throw err;
        });
      counter++;
      console.log("console.log after the counter++");
    }, 1500);
    return () => {
      console.log("interval Cleared");
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      // here should be invoked getLatestPrice(EUR/JPY) function

      fetch("http://localhost:5000/EurJpy")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("counter -1");
          console.log(counter - 1);
          const bid = data[counter - 1].bid;
          const ask = data[counter - 1].ask;
          const title = data[counter - 1].title;

          const transformedToPrices = {
            id: counter,
            title,
            bid,
            ask,
            timestamp: data[counter - 1].timestamp,
          };

          seteurJpyValueLatest((prevState) => {
            return [transformedToPrices, ...prevState];
          });
        })
        .catch((err) => {
          throw err;
        });
      counter++;
      console.log("console.log after the counter++");
    }, 900);
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
          {eurUsdValueLatest && (
            <Prices name={"EUR / USD"} items={eurUsdValueLatest} />
          )}
          {gbpUsdValueLatest && (
            <Prices name={"GBP / USD"} items={gbpUsdValueLatest} />
          )}
          {eurJpyValueLatest && (
            <Prices name={"EUR / JPY"} items={eurJpyValueLatest} />
          )}
        </div>
      </header>
    </div>
  );
};

export default App;

// npx json-server --watch data/db.json --port 5000 --no-cors
