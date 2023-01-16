import React from "react";
import './PriceItem.css';

const PriceItem = (props) => {
  return (
    <div>
      <ul className="price-item">
        {/* <li>id: {props.number}</li> */}
        <li>name: {props.title}</li>
        <li>{props.amount}</li>
        <li>len: {props.length}</li>
        {/* <li>{props.date}</li> */}
      </ul>
    </div>
  );
};

export default PriceItem;
