import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	FormFeedback,
} from "reactstrap";
import MyApp from "./_app";
import { useState } from "react";
import Transaction_create from "../pages/Transaction_create";
import Internal_Transaction from "../pages/InternalTransaction";

export default function Transition() {
	function handleClick() {
		window.location = "http://localhost:3000/Transaction_create";
	}

	function handleClick2() {
		window.location = "http://localhost:3000/InternalTransaction";
	}

	return (
		<div>
			<Navbar />
			<h2
				style={{ textAlign: "center" }}
				className="p-3 mb-2 bg-dark text-white"
			>
				Choose Your Transaction Type
			</h2>
			<div>
				<div className={styles.App} style={{width: 800,alignItems:"center",alignContent:"center",textAlign:"center",backgroundColor:"white"}}>
					<div class="row">
						<div class="col-sm-6">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Internal Transaction</h5>
									<p class="card-text">
										Create a Transaction From a SafeMonii Account to another
										SafeMonii Account
									</p>
									<a
										href="http://localhost:3000/InternalTransaction"
										class="btn btn-primary"
									>
										Go To Internal Transactions
									</a>
								</div>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">External Transaction</h5>
									<p class="card-text">
										Create a Transaction From a SafeMonii Account to a different
										Bank Account
									</p>
									<a
										href="http://localhost:3000/Transaction_create"
										class="btn btn-primary"
									>
										Go To External Transactions
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
