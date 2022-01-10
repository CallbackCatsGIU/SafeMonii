import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import TransactionList from "../components/TransactionList";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import { renderMatches } from "react-router";
import TransactionListOuter from "../components/TransactionListOuter";

export default class Transactions extends Component {
	constructor() {
		super();
		this.state = {
			innerTransactions: [],
			outerTransactions: [],
			currentNum: [],
			currentBalance: [],
		};
	}

	async componentDidMount() {
		const currentNum = JSON.parse(
			window.sessionStorage.getItem("currentAccount")
		);
		this.setState({
			currentNum: currentNum,
		});

		const currentBalance = window.sessionStorage.getItem("currentBalance");
		this.setState({
			currentBalance: currentBalance,
		});

		const token = JSON.parse(window.sessionStorage.getItem("jwt"));
		await axios
			.get(
				"http://localhost:8000/transactions/outerTransaction/" +
					parseInt(currentNum),
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((response) => {
				console.log("success");
				this.setState({
					outerTransactions: Object.values(response.data),
				});
			})
			.catch((error) => {
				console.log(error);
			});

		await axios
			.get(
				"http://localhost:8000/transactions/innerTransaction/" +
					parseInt(currentNum),
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((response) => {
				console.log("success");
				this.setState({
					innerTransactions: Object.values(response.data),
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
	DataTable() {
		return this.state.outerTransactions.map((res, i) => {
			return <TransactionListOuter obj={res} key={i} />;
		});
	}
	DataTable2() {
		return this.state.innerTransactions.map((res, i) => {
			return <TransactionList obj={res} key={i} />;
		});
	}

	render() {
		return (
			<div>
				<Navbar />
				<h1
					style={{ textAlign: "center" }}
					className="p-3 mb-2 bg-dark text-white"
				>
					Account Transactions
				</h1>
				<div className={styles.App} style={{backgroundColor:"#212529"}}>
					<h4 style={{ textAlign: "center",color:"white"}}>
						Account Number: {this.state.currentNum}
					</h4>
					<h4 style={{ textAlign: "center" ,color:"white"}}>
						Account Balance: {this.state.currentBalance} $
					</h4>
				</div>
				<div class="row" >
					<div class="col-sm-6" >
						<div className={styles.App} style={{backgroundColor: "#212529"}}>
							<div className="table-wrapper">
								<h2 style={{ textAlign: "center",color:"white" }}>Sent Transactions</h2>
								<Table striped bordered hover variant="dark">
									<thead>
										<tr>
											<th>Date</th>
											<th>Description</th>
											<th>Type</th>
											<th>Amount</th>
										</tr>
									</thead>
									<tbody>{this.DataTable()}</tbody>
								</Table>
							</div>
						</div>
					</div>
					<div class="col-sm-6">
						<div className={styles.App} style={{backgroundColor: "#212529"}}>
							<h2 style={{ textAlign: "center",color:"white" }}>Received Transactions</h2>
							<Table striped bordered hover variant="dark">
								<thead>
									<tr>
										<th>Date</th>
										<th>Description</th>
										<th>Type</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody>{this.DataTable2()}</tbody>
							</Table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
