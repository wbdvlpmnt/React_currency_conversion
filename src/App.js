// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchData() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=EUR&to=USD`,
            { signal: controller.signal }
          );
          const data = await res.json();
          setConvertedAmount(data.rates[Object.keys(data.rates)[0]]);
        } catch (err) {
          console.log(err.message);
        }
      }

      fetchData();
    },
    [amount]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{convertedAmount}</p>
    </div>
  );
}
