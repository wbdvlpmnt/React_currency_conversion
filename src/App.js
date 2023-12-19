import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState();
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchData() {
        try {
          if (amount > 0 && convertFrom != convertTo) {
            const res = await fetch(
              `https://api.frankfurter.app/latest?amount=${amount}&from=${convertFrom}&to=${convertTo}`,
              { signal: controller.signal }
            );
            const data = await res.json();
            setConvertedAmount(data.rates[Object.keys(data.rates)[0]]);
          } else {
            setConvertedAmount(0);
          }
        } catch (err) {
          console.log(err.message);
        }
      }

      fetchData();
    },
    [amount, convertFrom, convertTo]
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Enter amount..."
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={convertFrom}
        onChange={(e) => setConvertFrom(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={convertTo} onChange={(e) => setConvertTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{convertedAmount > 0 && convertedAmount}</p>
    </div>
  );
}
