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
  const [reciverNum, setReceiverNum] = useState("");
  const [reciverNumState, setReceiverNumState] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transDescriptionState, setTransDescriptionState] = useState("");
  const [transactionBalance, setTransactionBalance] = useState("");
  const [tranBalanceState, setTranBalanceState] = useState("");
  const [debitCredit, setdebitCredit] = useState("True");
  const [errorState, setErrorState] = useState("Network Error");

  const validateReceiverNum = (value) => {
    let reciverNumState;
    if (value.length == 12) {
      reciverNumState = "has-success";
    } else {
      reciverNumState = "has-danger";
    }
    setReceiverNumState(reciverNumState);
  };

  const validateTransDescription = (value) => {
    let transDescriptionState;
    if (value.length <= 250 && value.length >= 1) {
      transDescriptionState = "has-success";
    } else {
      transDescriptionState = "has-danger";
    }
    setTransDescriptionState(transDescriptionState);
  };

  const validateTranBalance = (value) => {
    let tranBalanceState;
    if (value > 0) {
      tranBalanceState = "has-success";
    } else {
      tranBalanceState = "has-danger";
    }
    setTranBalanceState(tranBalanceState);
  };

  function Returnback() {
    window.location = "http://localhost:3000/";
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "reciverNum") {
      validateReceiverNum(value);
      setReceiverNum(value);
    } else if (name === "transactionBalance") {
      validateTranBalance(value);
      setTransactionBalance(value);
    } else if (name === "transactionDescription") {
      validateTransDescription(value);
      setTransactionDescription(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateReceiverNum(reciverNum);
    validateTranBalance(transactionBalance);
    validateTransDescription(transactionDescription);
    console.log(debitCredit);
    if (debitCredit == "credit") {
      setdebitCredit(false);
      debitCredit = false
    } else {
      setdebitCredit(true);
      debitCredit = true
    }
    if (
      reciverNumState === "has-success" &&
      tranBalanceState === "has-success" &&
      transDescriptionState === "has-success"
    ) {
      const data = new FormData();
      const token = JSON.parse(window.sessionStorage.getItem("jwt"));
      const currentNum = JSON.parse(
        window.sessionStorage.getItem("currentAccount_transaction")
      );
      data = {
        receiverAccountNumber: reciverNum,
        description: transactionDescription,
        amount: transactionBalance,
        debitCredit: debitCredit,
        senderAccountNumber: currentNum,
      };
      console.log(data);
      axios
        .post(
          "http://localhost:8000/transactions/newInternalTransaction",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              },
          }
        )
        .then((res) => {
          console.log(res);
          Returnback();
        })
        .catch((error) => {
         if (error.message){
           setErrorState(error.response.data.error);
           errorState=error.response.data.error;
           console.log(errorState);

         }
         document.querySelector("#wrongCredentials").style.display = "block";
         console.log(error);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <h2
				style={{ textAlign: "center" }}
				className="p-3 mb-2 bg-dark text-white"
			>
				Internal Transfer
			</h2>
      <div className={styles.App} style={{backgroundColor: "white"}}>
       <div
         style={{display:"none"}}
         id="wrongCredentials"
         className="alert alert-danger"
         role="alert"

       >
         {errorState}
         </div>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <FormGroup>
            <Label className={styles.label} for="reciverNum">
              Receiver Account Number
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

              <Input
                type="radio"
                name="debit"
                value="debit"
                id="debit"
                debitCredit={debitCredit}
                onChange={(e) => {
                  setdebitCredit(e.target.value);
                }}
              />
              <Label for="debit">Debit</Label>
              <br></br>
              <Input
                type="radio"
                name="debit"
                value="credit"
                id="debit"
                debitCredit={debitCredit}
                onChange={(e) => {
                  setdebitCredit(e.target.value);
                }}
              />
              <Label for="credit">Credit</Label>
            </FormGroup>
          </FormGroup>

          <Button className="button  p-3 mb-2 bg-dark text-white" >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
