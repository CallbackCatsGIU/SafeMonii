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

import {Button,
	Form,
	FormGroup,
	Input,
	Label,
	FormFeedback,} from "reactstrap";

export default function  InternalTranscation() {
    const [reciverNum , setReciverNum]= useState("");
    const [reciverNumState , setreciverNumState]=useState("");
    const [transcationDescription , settranscationDescription ]=useState("");
    const [transDescriptionState, settransDescriptionState]=useState("");
    const [transcationBalance , settranscationBalance]= useState("");
    const [trancatBalanceState , settrancatBalanceState  ]=useState("");


  
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
		if (value <= 124 && value > 0) {
			transDescriptionState = "has-success";
		} else {
			transDescriptionState = "has-danger";
		}
		settransDescriptionState(transDescriptionState);
	}; 

    const validateTranBalance = (value) => {
		let trancatBalanceState;
		if ( value > 0) {
			trancatBalanceState = "has-success";
		} else {
			trancatBalanceState = "has-danger";
		}
		settrancatBalanceState(trancatBalanceState);
	};



    function Returnback(){
    console.log("Done transaction internally")    
    window.location = "http://localhost:3000/"
    
};

    return (
        
      <div>
        <Navbar/>
			<div className={styles.App}>
				<h2>Transfer Balance Internally</h2>
				<Form className={styles.form} onSubmit={Returnback}>
					<FormGroup>
						<Label className={styles.label} for="reciverNum">
							Reciever Account Number
						</Label>
						<Input
							type="tel"
							name="ReceiverAccountNumber"
							required
							id="reciverNum"
							placeholder="ex. 335455323532"
							minLength="12"
							maxLength="12"
							//onChange={handleChange}
							valid={reciverNumState === "has-success"}
							invalid={reciverNumState === "has-danger"}
						/>
						<FormFeedback>
							Please input a valid 12 digit account number.
						</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label className={styles.label} for="transcationBalance">
							Desired amount to transfer
						</Label>
						<Input
							type="tel"
							name="transcationBalance"
							required
							id="transcationBalance"
							minLength="1"
                            placeholder="ex. min 1 "
							//onChange={handleChange}
							valid={trancatBalanceState === "has-success"}
							invalid={trancatBalanceState === "has-danger"}
						/>
						<FormFeedback>
							Please input a valid amount to transfer 
						</FormFeedback>
						<FormGroup>
							<Label className={styles.label} for="reciverNum">
								Transaction Description
							</Label>
							<Input
								type="text"
								name="transcationDescription"
								required
								id="transcationDescription"
								minLength="1"
								maxLength="124"
								placeholder="ex. Tuition Fees"
								//onChange={handleChange}
								valid={transDescriptionState === "has-success"}
								invalid={transDescriptionState === "has-danger"}
							/>
							<FormFeedback>
								Please input a valid 12 digit account number.
                            </FormFeedback>
       
						</FormGroup>
					</FormGroup>
					
        <button className="button  p-3 mb-2 bg-dark text-white" onClick={Returnback}>
           Submit 
       </button>

              
          </Form>
          </div>
          </div>

        
    );
}






