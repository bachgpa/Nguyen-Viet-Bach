import "./problem2.css";
import { useEffect, useState } from "react";

export function Problem2() {
  const [currency, setCurrency] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        const data = await response.json();
        setCurrency(data);
        console.log(data);
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
      <div className="fromCurrency">
        <label htmlFor="fromInput">From:</label>
        <input type="option"></input>
        <input type="number" id="fromInput"></input>
      </div>
      <div className="toCurrency">
        <label htmlFor="fromInput">To:</label>
        <input type="number" id="fromInput"></input>
      </div>
    </form>
  );
}
