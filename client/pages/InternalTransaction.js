import styles from "../styles/Home.module.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
//import { Component } from "react";
import MyApp from "./_app";
import apiService from "../services/apiService";
import { useState } from "react";
import Navbar from "../components/Navbar";
import AccountList from "../components/AccountList";

import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";

export default function InternalTransaction() {
  const [reciverNum, setReciverNum] = useState("");
  const [reciverNumState, setreciverNumState] = useState("");
  const [transactionDescription, settransactionDescription] = useState("");
  const [transDescriptionState, settransDescriptionState] = useState("");
  const [transactionBalance, settransactionBalance] = useState("");
  const [tranBalanceState, settranBalanceState] = useState("");
  const [debitCredit, setdebitCredit] = useState("True");

  const validateReciverNum = (value) => {
    let reciverNumState;
    if (value.length == 12) {
      reciverNumState = "has-success";
    } else {
      reciverNumState = "has-danger";
    }
    setreciverNumState(reciverNumState);
  };

  const validateTransDescription = (value) => {
    let transDescriptionState;
    if (value.length <= 250 && value.length >= 1) {
      transDescriptionState = "has-success";
    } else {
      transDescriptionState = "has-danger";
    }
    settransDescriptionState(transDescriptionState);
  };

  const validateTranBalance = (value) => {
    let tranBalanceState;
    if (value > 0) {
      tranBalanceState = "has-success";
    } else {
      tranBalanceState = "has-danger";
    }
    settranBalanceState(tranBalanceState);
  };

  function Returnback() {
    window.location = "http://localhost:3000/";
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "reciverNum") {
      validateReciverNum(value);
      setReciverNum(value);
    } else if (name === "transactionBalance") {
      validateTranBalance(value);
      settransactionBalance(value);
    } else if (name === "transactionDescription") {
      validateTransDescription(value);
      settransactionDescription(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateReciverNum(reciverNum);
    validateTranBalance(transactionBalance);
    validateTransDescription(transactionDescription);
    console.log(debitCredit);
    if (debitCredit == "credit") {
      setdebitCredit(False);
    } else {
      setdebitCredit(True);
    }
    if (
      reciverNumState === "has-success" &&
      tranBalanceState === "has-success" &&
      transDescriptionState === "has-success"
    ) {
      const data = new FormData();
      const token = JSON.parse(window.sessionStorage.getItem("jwt"));
      data = {
        receiverAccountNumber: reciverNum,
        description: transactionDescription,
        amount: transactionBalance,
        debitCredit: debitCredit,
      };
      console.log(data);
      axios
        .post(
          "http://localhost:8000/transactions/createInternalTransaction",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
              "Access-Control-Allow-Headers":
                "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.App}>
        <h2>Transfer Balance Internally</h2>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <FormGroup>
            <Label className={styles.label} for="reciverNum">
              Reciever Account Number
            </Label>
            <Input
              type="tel"
              name="reciverNum"
              required
              id="reciverNum"
              placeholder="ex. 449955323532"
              minLength="12"
              maxLength="12"
              onChange={handleChange}
              valid={reciverNumState === "has-success"}
              invalid={reciverNumState === "has-danger"}
            />
            <FormFeedback>
              Please input a valid 12 digit account number.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="transactionBalance">
              Desired amount to transfer
            </Label>
            <Input
              type="tel"
              name="transactionBalance"
              required
              id="transactionBalance"
              minLength="1"
              placeholder="ex. min amount  1 "
              onChange={handleChange}
              valid={tranBalanceState === "has-success"}
              invalid={tranBalanceState === "has-danger"}
            />
            <FormFeedback>Please input a valid amount to transfer</FormFeedback>
            <FormGroup>
              <Label className={styles.label} for="transactionDescription">
                Transaction Description
              </Label>
              <Input
                type="text"
                name="transactionDescription"
                required
                id="transactionDescription"
                minLength="1"
                maxLength="250"
                placeholder="ex. Tuition Fees"
                onChange={handleChange}
                valid={transDescriptionState === "has-success"}
                invalid={transDescriptionState === "has-danger"}
              />

              <FormFeedback>
                Please input a description no more than 250 characters
              </FormFeedback>
              <Label className={styles.label} for="debitCredit">
                Debit/Credit
              </Label>
              <tr></tr>

              <input
                type="radio"
                name="debit"
                value="debit"
                id="debit"
                debitCredit={debitCredit}
                onChange={(e) => {
                  setdebitCredit(e.target.value);
                }}
              />
              <label for="debit">Debit</label>
              <br></br>
              <input
                type="radio"
                name="credit"
                value="credit"
                id="credit"
                debitCredit={debitCredit}
                onChange={(e) => {
                  setdebitCredit(e.target.value);
                }}
              />
              <label for="credit">Credit</label>
            </FormGroup>
          </FormGroup>

          <button className="button  p-3 mb-2 bg-dark text-white">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
