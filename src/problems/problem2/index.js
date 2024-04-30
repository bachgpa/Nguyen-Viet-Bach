import React, { useState, useEffect } from "react";
import "./problem2.css";

export default function Problem2() {
  const [currencyData, setCurrencyData] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        const data = await response.json();
        const updatedData = data.map((currency) => ({
          ...currency,
          svgLink: `/tokens/${currency.currency}.svg`,
        }));
        setCurrencyData(updatedData);
      } catch (error) {
        console.error(
          "Error fetching currency data:",
          error
        );
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromCurrency || !toCurrency || !amount) {
      setError("Please fill in all fields");
      return;
    }

    const fromCurrencyPrice = currencyData.find(
      (option) => option.currency === fromCurrency
    )?.price;
    const toCurrencyPrice = currencyData.find(
      (option) => option.currency === toCurrency
    )?.price;

    if (!fromCurrencyPrice || !toCurrencyPrice) {
      setError("Currency not found");
      return;
    }
    const resultSwap =
      (amount * toCurrencyPrice) / fromCurrencyPrice;
    setResult(resultSwap.toFixed(2));
    setError("");
  };

  return (
    <div className="problem2">
      <h1>Currency Swap Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form_group">
          <label
            htmlFor="fromCurrency"
            className="form_title"
          >
            From Currency:
          </label>
          <select
            className="form_option"
            id="fromCurrency"
            required
            value={fromCurrency}
            onChange={(e) =>
              setFromCurrency(e.target.value)
            }
          >
            <option value="">Select Currency</option>
            {currencyData.map((currency, index) => (
              <option key={index} value={currency.currency}>
                {currency.currency}
              </option>
            ))}
          </select>
          {fromCurrency && (
            <img
              htmlFor="fromCurrency"
              src={
                currencyData.find(
                  (currency) =>
                    currency.currency === fromCurrency
                )?.svgLink
              }
              alt={fromCurrency}
              className="currency-icon"
            />
          )}
        </div>
        <div className="form_group">
          <label className="form_title" htmlFor="amount">
            Amount:
          </label>
          <input
            className="form_option"
            type="number"
            id="amount"
            // value={amount}
            required
            onChange={(e) =>
              setAmount(parseFloat(e.target.value))
            }
          />
        </div>
        <div className="form_group">
          <label
            className="form_title"
            htmlFor="toCurrency"
          >
            To Currency:
          </label>
          <select
            className="form_option"
            id="toCurrency"
            value={toCurrency}
            required
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="">Select Currency</option>
            {currencyData.map((currency, index) => (
              <option
                key={index}
                value={currency.currency.trim()}
              >
                {currency.currency.trim()}
              </option>
            ))}
          </select>
          {toCurrency && (
            <img
              src={
                currencyData.find(
                  (currency) =>
                    currency.currency === toCurrency
                )?.svgLink
              }
              alt={toCurrency}
              className="currency-icon"
            />
          )}
        </div>
        <div className="form_group">
          <div className="form_title">Result:</div>
          <div className="form_result">{result}</div>
        </div>

        <button className="submit_button" type="submit">
          Swap
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
