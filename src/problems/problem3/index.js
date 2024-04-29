import "./problem3.css";
import { useEffect, useState } from "react";
// import "../../../public/tokens";

export default function Problem3() {
  const [currency, setCurrency] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        var data = await response.json();
        data.map(function (singleCurrency) {
          return (singleCurrency.linkToSvg = `/tokens/${singleCurrency.currency}.svg`);
        });
        setCurrency(data);
        console.log("array data", data);
      } catch (error) {
        console.error(
          "Error fetching currency data:",
          error
        );
      }
    };

    fetchData();
  }, []);
  return (
    <form>
      <img alt="nothing" src="/tokens/ADA.svg" />
      <div className="fromCurrency">
        <div>From</div>
        <label htmlFor="from_type_input">
          Currency type:
        </label>
        <input
          list="from_list"
          type="text"
          id="from_type_input"
        ></input>
        <datalist id="from_list">
          {currency &&
            currency.map(function (singleCurrency) {
              return (
                <div>
                  <img
                    alt="still nothing"
                    className="img_currency"
                    src={singleCurrency.linkToSvg}
                  />
                  <option
                    value={singleCurrency.currency}
                  ></option>
                </div>
              );
              // <div>{singleCurrency.currency}</div>;
            })}
        </datalist>
        <label htmlFor="fromInput">Amount:</label>
        <input type="number" id="fromInput"></input>
      </div>
      <div className="toCurrency">
        <label htmlFor="fromInput">To:</label>
        <input type="number" id="fromInput"></input>
      </div>
      <button>Swap</button>
      <div></div>
    </form>
  );
}
