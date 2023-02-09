import "./Prices.css";
import React from "react";
import PriceItem from "./PriceItem";

const Prices = (props) => {
  console.log("props.items in Prices:");
  console.log(props.items);

  return (
    <span>
      <h1>{props.name}</h1>
      <div className="Prices-table">
        {props.items.map((item) => (
          <PriceItem
            key={item.id}
            id={item.id}
            title={item.title}
            bid={item.bid}
            ask={item.ask}
            timestamp={item.timestamp}
          />
        ))}
      </div>
    </span>
  );
};

export default Prices;
