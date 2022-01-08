import styles from "../styles/Home.module.css";
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	FormFeedback,
} from "reactstrap";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Component } from "react";
import MyApp from "./_app";
import apiService from "../services/apiService";
import { useState } from "react";
import Navbar from "../components/Navbar";
import AccountList from "../components/AccountList";

export default function Transaction_create() {
	const [receiverNumber, setReceiverNumber] = useState("");
	const [trBalance, setTrBalance] = useState("");
	const [trDescriptionState, setTrDescriptionState] = useState("");
	const [receiverNumberState, setReceiverNumberState] = useState("");
	const [trBalanceState, setTrBalanceState] = useState("");
	const [bankNameState, setBankNameState] = useState("Solace Bank");
	const [endPointState, setEndPointState] = useState("");
	const validateReceiverNumber = (value) => {
		let receiverNumberState;
		if (value.length == 12) {
			receiverNumberState = "has-success";
		} else {
			receiverNumberState = "has-danger";
		}
		setReceiverNumberState(receiverNumberState);
	};

	const validateTrBalance = (value) => {
		let trBalanceState;
		if (value <= 50 && value > 0) {
			trBalanceState = "has-success";
		} else {
			trBalanceState = "has-danger";
		}
		setTrBalanceState(trBalanceState);
	};

	/*const validateBankName = (value) => {
		let bankNameState;
		if (value != "Choose..." || value != null) {
			bankNameState = "has-success";
		} else {
			bankNameState = "has-danger";
		}
		setBankNameState(getBankName());
	};*/
	/*function useMutateExternalTransfer() {
		return useMutation(
		  (transfer) => {
			const data = new FormData();
			data = {
			  receiverAccountNumber: user.email,
			  password: user.password,
			  userName: user.userName,
			  studentId: user.studentId,
			  phone: user.phone,
			  fullName: user.fullName
	  
			}
			return apiService.post(`http://localhost:8000/users/register`, data);
		  }, {
			// When mutate is called:
			onSuccess: (responseData) => {
			  // Redirect to login page
			  window.location="http://localhost:3000/";
			},
			onError: (e) => console.log(e.message),
		  }
		);
	  }*/

	function submitExternalTransfer(data) {
		axios.post(endPointState, data);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		validateReceiverNumber(receiverNumber);
		validateTrBalance(trBalance);

		if (bankNameState === 1) {
			setEndPointState("https://solace.loca.lt/");
		}

		if (
			receiverNumberState === "has-success" &&
			trBalanceState === "has-success"
		) {
			const data = new FormData();
			data = {
				receiverAccountNumber: receiverNumberState,
				amount: trBalanceState,
				//description: trDescriptionState
			};
			submitExternalTransfer(data);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === "ReceiverAccountNumber") {
			validateReceiverNumber(value);
			setReceiverNumber(value);
		} else if (name === "trBalance") {
			validateTrBalance(value);
			setTrBalance(value);
		}
	};
	function logValue() {
		console.log(bankNameState);
	}

	/*const handleChange2 = (e)=>{
        setBankNameState({selectValue:e.target.value});
		console.log(bankNameState)
    };*/

	/*function getBankName() {
		bnkname = document.querySelector("#BankNames");
		output = bnkname.options[bnkname.selectedIndex].value;
		setBankNameState(output);
		console.log(output);
		return output;
	}*/

	/*function enableButton() {
		var selectelem = document.getElementById("BankNames");
		var btnelem = document.getElementById("seedoc");
		btnelem.disabled = !selectelem.value;
	
	}*/

	return (
		<div>
			<Navbar />
			<div className={styles.App}>
				<h2>Transfer Balance Externally</h2>
				<Form className={styles.form} onSubmit={handleSubmit}>
					<FormGroup>
						<Label className={styles.label} for="receiverNumber">
							Reciever Account Number
						</Label>
						<Input
							type="tel"
							name="ReceiverAccountNumber"
							required
							id="receiverNumber"
							placeholder="ex. 335455323532"
							minLength="12"
							maxLength="12"
							onChange={handleChange}
							valid={receiverNumberState === "has-success"}
							invalid={receiverNumberState === "has-danger"}
						/>
						<FormFeedback>
							Please input a valid 12 digit account number.
						</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label className={styles.label} for="trbalance">
							Desired amount to transfer
						</Label>
						<Input
							type="tel"
							name="trBalance"
							required
							id="trBalance"
							minLength="1"
							maxLength="2"
							placeholder="Maximum amount is: 50"
							onChange={handleChange}
							valid={trBalanceState === "has-success"}
							invalid={trBalanceState === "has-danger"}
						/>
						<FormFeedback>
							Please input a valid amount to transfer (Between 1 and 50) .
						</FormFeedback>
						<FormGroup>
							<Label className={styles.label} for="receiverNumber">
								Reciever Account Number
							</Label>
							<Input
								type="text"
								name="TrDescription"
								required
								id="TrDescription"
								placeholder="ex. Tuition Fees"
								onChange={handleChange}
								valid={trDescriptionState === "has-success"}
								invalid={trDescriptionState === "has-danger"}
							/>
							<FormFeedback>
								Please input a valid 12 digit account number.
							</FormFeedback>
						</FormGroup>
					</FormGroup>
					<FormGroup>
						<Label className={styles.label} for="BankName">
							Desired Bank
						</Label>
						<br></br>
						<select
							class="custom-select"
							id="BankNames"
							size="1"
							name="bankNamesDD"
							bankNameState={bankNameState}
							onChange={(e) => {
								setBankNameState(e.target.value);
							}}
						>
							<option selected>Choose...</option>
							<option value="1">Solace Bank</option>
							<option value="2">MYFSD Bank</option>
							<option value="3">Amry International Bank</option>
							<option value="4">The Iron Bank</option>
							<option value="5">The Blank Bank</option>
							<option value="6">Luck Bank</option>
						</select>
					</FormGroup>
					<Button color="primary" onClick={logValue}>
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
}
