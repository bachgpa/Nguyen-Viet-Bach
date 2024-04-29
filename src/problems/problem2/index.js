import React, { useState, useEffect } from "react";

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

    setResult(
      (amount * toCurrencyPrice) / fromCurrencyPrice
    );
    setError("");
  };

  return (
    <div className="App">
      <h1>Currency Swap Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fromCurrency">
            From Currency:
          </label>
          <select
            id="fromCurrency"
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
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) =>
                setAmount(parseFloat(e.target.value))
              }
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="toCurrency">To Currency:</label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="">Select Currency</option>
            {currencyData.map((currency, index) => (
              <option key={index} value={currency.currency}>
                {currency.currency}
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

          <div className="result">Result: {result}</div>
        </div>

        <button type="submit">Swap</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
