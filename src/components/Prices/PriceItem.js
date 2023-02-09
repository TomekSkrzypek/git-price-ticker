import React from "react";
import "./PriceItem.css";

const PriceItem = (props) => {
  return (
    <div>
      <ul className="price-item">
        <li>bid: {props.bid}</li>
        <li>ask: {props.ask}</li>
        <li>date: {props.timestamp}</li>
      </ul>
    </div>
  );
};

export default PriceItem;
