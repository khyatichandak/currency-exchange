import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";

import "react-vis/dist/style.css";

import { Bar } from "react-chartjs-2";

const Exchange = () => {
  const countries_list = [
    "AED",
    "ARS",
    "AUD",
    "BGN",
    "BRL",
    "BSD",
    "CAD",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CZK",
    "DKK",
    "DOP",
    "EGP",
    "EUR",
    "FJD",
    "GBP",
    "GTQ",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "KZT",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PAB",
    "PEN",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "RON",
    "RUB",
    "SAR",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "TWD",
    "UAH",
    "USD",
    "UYU",
    "ZAR",
  ];

  const [currencyOne, setCurrencyOne] = useState("CAD");
  const [currencyTwo, setCurrencyTwo] = useState("INR");
  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState();
  const [rateOne, setRateOne] = useState(0);
  const [rateTwo, setRateTwo] = useState(0);

  const [rate, setRate] = useState("");

  const handleSelectOne = (e) => {
    setCurrencyOne(e);
  };

  const handleSelectTwo = (e) => {
    setCurrencyTwo(e);
  };

  const state = {
    labels: [currencyOne, currencyTwo],
    datasets: [
      {
        label: "Rate",
        backgroundColor: "rgba(139,176,26,0.78)",
        borderColor: "rgba(139,176,26,1)",
        borderWidth: 1,
        data: [rateOne, rateTwo],
      },
    ],
  };

  useEffect(() => {
    const apiUrl =
      "https://v6.exchangerate-api.com/v6/751b092a1f9214953c03d57b/latest/USD";
    axios.get(apiUrl).then((res) => {
      const rateOne = res.data.conversion_rates[currencyOne];
      const rateTwo = res.data.conversion_rates[currencyTwo];
      setRateOne(rateOne);
      setRateTwo(rateTwo);
      setRate(rateTwo / rateOne);
      setAmountTwo((rateTwo / rateOne) * amountOne);
    });
  });

  return (
    <div>
      <h1>Currency Exchange</h1>
      <Row>
        <Col
          md={{ span: 4, offset: 4 }}
          sm={{ span: 4, offset: 4 }}
          xs={{ span: 8, offset: 2 }}
        >
          <InputGroup className="mb-3">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="info"
              title={currencyOne}
              id="input-group-dropdown-1"
              onSelect={handleSelectOne}
            >
              {countries_list.map((country) => {
                return (
                  <Dropdown.Item eventKey={country} value={country}>
                    {country}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            <FormControl
              aria-describedby="basic-addon1"
              type="text"
              value={amountOne}
              onChange={(e) => setAmountOne(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col
          md={{ span: 4, offset: 4 }}
          sm={{ span: 4, offset: 4 }}
          xs={{ span: 8, offset: 2 }}
        >
          <InputGroup className="mb-3">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="info"
              title={currencyTwo}
              id="input-group-dropdown-1"
              onSelect={handleSelectTwo}
            >
              {countries_list.map((country) => {
                return (
                  <Dropdown.Item eventKey={country} value={country}>
                    {country}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            <FormControl
              aria-describedby="basic-addon1"
              type="text"
              value={amountTwo}
              onChange={(e) => setAmountTwo(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Container>
          <Bar
            data={state}
            options={{
              title: {
                display: true,
                text: "Currency Rate",
                fontSize: 20,
              },
              legend: {
                display: false,
                position: "right",
              },
            }}
          />
        </Container>
      </Row>
    </div>
  );
};

export default Exchange;
