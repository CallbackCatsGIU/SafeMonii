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
	const [trDescription, setTrDescription] = useState("");
	const [externalToken, setExternalToken] = useState("");
	const [errorState, setErrorState] = useState("Network Error");
	const [trBalance, setTrBalance] = useState("");
	const [trDescriptionState, setTrDescriptionState] = useState("");
	const [receiverNumberState, setReceiverNumberState] = useState("");
	const [trBalanceState, setTrBalanceState] = useState("");
	const [banknamestate, setBankNameState] = useState("Solace Bank");
	const [endPointState, setEndPointState] = useState();

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
				alert("Transfer Successful");
				Returnback();
			})
			.catch((error) => {
				console.log(error);
				if (error.response) {
					//console.log(error.response.data.error);

					if (error.response.data.error) {
						setErrorState(error.response.data.error);
						errorState = error.response.data.error;
					}
					if (error.response.data.message) {
						setErrorState(error.response.data.message);
						errorState = error.response.data.message;
					}
					console.log(errorState);
				}
				document.querySelector("#wrongCredentials").style.display = "block";
				axios
					.post("http://localhost:8000/external/refund", data2)
					.catch((error) => {
						console.log(error);
					});
			});
	}

	function Returnback() {
		window.location = "http://localhost:3000/";
	}

	const handleSubmit = async (event) => {
		const token = await JSON.parse(window.sessionStorage.getItem("jwt"));
		event.preventDefault();
		validateReceiverNumber(receiverNumber);
		validateTrBalance(trBalance);
		validateTrDescription(trDescription);
		const currentNum = JSON.parse(
			window.sessionStorage.getItem("currentAccount_transaction")
		);

		if (banknamestate == 1) {
			setEndPointState("https://solace.loca.lt/external/transfer");
			endPointState = "https://solace.loca.lt/external/transfer";
		}
		if (banknamestate == 2) {
			setEndPointState("https://myfsd.loca.lt/external/transfer");
			endPointState = "https://myfsd.loca.lt/external/transfer";
		}
		if (banknamestate == 3) {
			setEndPointState(
				"https://amryinternationalbank.loca.lt/external/transfer"
			);
			endPointState = "https://amryinternationalbank.loca.lt/external/transfer";
		}
		if (banknamestate == 4) {
			setEndPointState("https://ironbank.loca.lt/external/transfer");
			endPointState = "https://ironbank.loca.lt/external/transfer";
		}
		if (banknamestate == 5) {
			setEndPointState("https://safemonii.loca.lt/external/transfer");
		}
		if (banknamestate == 6) {
			setEndPointState("https://luckbank.loca.lt/external/transfer");
			endPointState = "https://luckbank.loca.lt/external/transfer";
		}

		console.log(banknamestate);
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
			//ExToken = window.sessionStorage.getItem("ExternalJWT");
			console.log(token);
			await axios
				.post("http://localhost:8000/external/createTransfer", data2, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Bypass-Tunnel-Reminder": "any",
					},
				})
				.then((response) => {
					console.log(response.data.token);
					window.sessionStorage.setItem("ExternalJWT", response.data.token);
					setExternalToken(response.data.token);
					console.log("before" + externalToken);
				})
				.then(async () => {
					await submitExternalTransfer(data, data2);
				})
				.catch((error) => {
					if (error.response.data.error) {
						setErrorState(error.response.data.error);
						errorState = error.response.data.error;
					}
					if (error.response.data.message) {
						setErrorState(error.response.data.message);
						errorState = error.response.data.message;
					}
					console.log(errorState);
					document.querySelector("#wrongCredentials").style.display = "block";
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
			<h2
				style={{ textAlign: "center" }}
				className="p-3 mb-2 bg-dark text-white"
			>
				External Transfer
			</h2>
			<div className={styles.App} style={{ backgroundColor: "#212529" }}>
				<div
					style={{ display: "none" }}
					id="wrongCredentials"
					className="alert alert-danger"
					role="alert"
				>
					{errorState}
				</div>
				<Form className={styles.form} onSubmit={handleSubmit}>
					<FormGroup>
						<Label
							className={styles.label}
							style={{ color: "white" }}
							for="receiverNumber"
						>
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
						<hr style={{color:"white"}}></hr>
					</FormGroup>
					<FormGroup>
						<Label
							className={styles.label}
							style={{ color: "white" }}
							for="trbalance"
						>
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
						<hr style={{color:"white"}}></hr>
						<FormGroup>
							<Label
								className={styles.label}
								style={{ color: "white" }}
								for="trDescription"
							>
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
							<hr style={{color:"white"}}></hr>
						</FormGroup>
					</FormGroup>
					<FormGroup>
						<Label
							className={styles.label}
							style={{ color: "white" }}
							for="BankName"
						>
							Desired Bank
						</Label>
						<br></br>
						<select
							className="form-select"
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
								Select Desired Bank..
							</option>
							<option value="1">Solace Bank</option>
							<option value="2">MYFSD Bank</option>
							<option value="3">Amry International Bank</option>
							<option value="4">The Iron Bank</option>
							<option value="5">The Blank Bank</option>
							<option value="6">Luck Bank</option>
						</select>
						<hr style={{color:"white"}}></hr>
					</FormGroup>
					<Button className="btn-success text-white btn btn-primary">
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
}
