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
	const [bankName, setBankName] = useState("");
	const [receiverNumberState, setReceiverNumberState] = useState("");
	const [trBalanceState, setTrBalanceState] = useState("");
	const [bankNameState, setBankNameState] = useState("");
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

	const validateBankName = (value) => {
		let bankNameState;
		if (value != "Choose..." || value != null) {
			bankNameState = "has-success";
		} else {
			bankNameState = "has-danger";
		}
		setBankNameState(getBankName());
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		validateReceiverNumber(receiverNumber);
		validateTrBalance(trBalance);

		if (
			receiverNumberState === "has-success" &&
			trBalanceState === "has-success"
		) {
			useRegisterMutations.mutate({
				email: email,
				password: password,
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
		}
	};

	function getBankName() {
		bnkname = document.querySelector("#BankNames");
		output = bnkname.options[bnkname.selectedIndex].value;
		setBankNameState(output);
		console.log(output);
		return output;
	}

	function enableButton() {
		var selectelem = document.getElementById("BankNames");
		var btnelem = document.getElementById("seedoc");
		btnelem.disabled = !selectelem.value;
	}

	return (
		<div className={styles.App}>
			<Navbar />
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
				</FormGroup>
				<FormGroup>
					<Label className={styles.label} for="BankName">
						Desired Bank
					</Label>
					<br></br>
					<select class="custom-select" id="BankNames">
						<option selected>Choose...</option>
						<option value="1">Solace Bank</option>
						<option value="2">MYFSD Bank</option>
						<option value="3">Amry International Bank</option>
						<option value="3">The Iron Bank</option>
						<option value="3">The Blank Bank</option>
						<option value="3">Luck Bank</option>
					</select>
					<input type="button" id="seedoc" disabled value="Submit"></input>
				</FormGroup>

				<Button color="primary">Submit</Button>
			</Form>
		</div>
	);
}
