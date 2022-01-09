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
	const [errorState, setErrorState] = useState("Network Error");
	const [trBalance, setTrBalance] = useState("");
	const [trDescriptionState, setTrDescriptionState] = useState("");
	const [receiverNumberState, setReceiverNumberState] = useState("");
	const [trBalanceState, setTrBalanceState] = useState("");
	const [banknamestate, setBankNameState] = useState("Solace Bank");
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
		if (value.length <= 250 && value.length >= 1) {
			TrDescriptionState = "has-success";
		} else {
			TrDescriptionState = "has-danger";
		}
		setTrDescriptionState(TrDescriptionState);
	};

	async function submitExternalTransfer(data, data2) {
		const ExToken = window.sessionStorage.getItem("ExternalJWT");
		console.log("abdo " + endPointState + ExToken);
		await axios
			.post(endPointState, data, {
				headers: {
					Authorization: `Bearer ${ExToken}`,
					"Bypass-Tunnel-Reminder": "any",
					Accept: "application/json",
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
					"Access-Control-Allow-Headers":
						"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
				},
			})
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
				if (error.response && error.response.data.error == "Account doesn't exist" ) {
					console.log(error.response.data.error);
					//setErrorState(error.response.data.error)
					errorState = error.response.data.error
					console.log(errorState)
					
				}
				axios
					.post("http://localhost:8000/external/refund", data2)
					.catch((error) => {
						console.log(error)
					});
				document.querySelector("#wrongCredentials").style.display = "block";
			});
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		validateReceiverNumber(receiverNumber);
		validateTrBalance(trBalance);
		validateTrDescription(trDescription);
		const currentNum = JSON.parse(
			window.sessionStorage.getItem("currentAccount_transaction")
		);

		console.log("kero: " + banknamestate);
		if (banknamestate == 1) {
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
			await axios
				.post("http://localhost:8000/external/createTransfer", data2)
				.then((response) => {
					console.log(response.data.token);
					window.sessionStorage.setItem("ExternalJWT", response.data.token);
					setExternalToken(response.data.token);
					console.log("before" + externalToken);
				})
				.then(() => {
					console.log("zzzz");
					submitExternalTransfer(data, data2);
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

	return (
		<div>
			<Navbar />
			<div className={styles.App}>
				<div
					style={{ display: "none" }}
					id="wrongCredentials"
					className="alert alert-danger"
					role="alert"
				>
					{errorState}
				</div>
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
							className="custom-select"
							id="BankNames"
							size="1"
							name="bankNamesDD"
							defaultValue={"DEFAULT"}
							banknamestate={banknamestate}
							onChange={(e) => {
								setBankNameState(e.target.value);
							}}
						>
							<option value="DEFAULT" disabled>
								Choose...
							</option>
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
