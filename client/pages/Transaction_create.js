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

export default function transaction_create() {
	const [receiverNumber, setReceiverNumber] = useState("");
	const [trDescription, setTrDescription] = useState("");
	const [externalToken, setExternalToken] = useState("");
	const [trBalance, setTrBalance] = useState("");
	const [trDescriptionState, setTrDescriptionState] = useState("");
	const [receiverNumberState, setReceiverNumberState] = useState("");
	const [trBalanceState, setTrBalanceState] = useState("");
	const [bankNameState, setBankNameState] = useState("Solace Bank");
	const [endPointState, setEndPointState] = useState(
		"https://safemonii.loca.lt/external/transfer"
	);

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

	const validateTrDescription = (value) => {
		let TrDescriptionState;
		if (value.length <= 250 && value.length > 1) {
			TrDescriptionState = "has-success";
		} else {
			TrDescriptionState = "has-danger";
		}
		setTrDescriptionState(TrDescriptionState);
	};

	async function submitExternalTransfer(data) {
		console.log("abdo " + endPointState);
		await apiService
			.post(endPointState, data)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		validateReceiverNumber(receiverNumber);
		validateTrBalance(trBalance);
		validateTrDescription(trDescription);
		const currentNum = JSON.parse(
			window.localStorage.getItem("currentAccount_transaction")
		);

		console.log("kero: " + bankNameState);
		if (bankNameState == 1) {
			console.log("zayat");
			setEndPointState("https://safemonii.loca.lt/external/transfer");
		}

		if (
			receiverNumberState === "has-success" &&
			trBalanceState === "has-success" &&
			trDescriptionState === "has-success"
		) {
			const data = new FormData();
			const data2 = new FormData();
			data = {
				receiverAccountNumber: receiverNumber,
				description: trDescription,
				amount: trBalance,
			};

			data2 = {
				senderAccountNumber: currentNum,
				amount: trBalance,
				description: trDescription,
			};
			console.log(data);
			console.log(data2);
			apiService
				.post("http://localhost:8000/external/createTransfer", data2)
				.then((response) => {
					console.log(response.data.token);
					setExternalToken(response.data.token);
					submitExternalTransfer(data);
				})
				.then(() => {
					console.log("zzzz");
					submitExternalTransfer(data);
				})
				.catch((error) => {
					console.log("aaaaa");
					console.log(error);
				});
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
		} else if (name === "trDescription") {
			validateTrDescription(value);
			setTrDescription(value);
		}
	};
	/*function logValue() {
		console.log(bankNameState);
	}*/

	return (
		<div>
			<Navbar />
			<div className={styles.App}>
				<h2>Transfer Balance Externally</h2>
				<Form className={styles.form} onSubmit={handleSubmit}>
					<FormGroup>
						<Label className={styles.label} for="receiverNumber">
							Receiver Account Number
						</Label>
						<Input
							type="text"
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
							<Label className={styles.label} for="trDescription">
								Transfer Description
							</Label>
							<Input
								type="text"
								name="trDescription"
								required
								id="trDescription"
								minLength="1"
								maxLength="250"
								placeholder="ex. Tuition Fees"
								onChange={handleChange}
								valid={trDescriptionState === "has-success"}
								invalid={trDescriptionState === "has-danger"}
							/>
							<FormFeedback>
								Please input a description no more than 250 characters.
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
					<Button color="primary">Submit</Button>
				</Form>
			</div>
		</div>
	);
}
