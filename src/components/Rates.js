import React from "react";
import axios from "axios";

const Rates = () => {
  console.log("inside Rates");
  const apiUrl =
    "https://v6.exchangerate-api.com/v6/751b092a1f9214953c03d57b/latest/USD";
  axios.get(apiUrl).then((res) => {
    console.log(res.data.conversion_rates.USD);
  });
};

export default Rates;
