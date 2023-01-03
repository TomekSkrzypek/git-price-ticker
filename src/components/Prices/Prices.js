import React from "react";
import PriceItem from "./PriceItem";

const Prices = (props) => {
  console.log("props.items in Prices:");
  console.log(props.items);

  return (
    <div>
      <h1>Prices</h1>
      <div>
        {props.items.map((item) => (
          <PriceItem
            key={item.id}
            // number={item.id}
            title={item.title}
            amount={item.amount}
            // date={item.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Prices;
