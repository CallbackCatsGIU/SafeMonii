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
				Choose Your Transfer Type
			</h2>
			<div>
				<div class="row">
					<div class="col-sm-6">
						<div
							className={styles.App}
							style={{
								width: 750,
								alignItems: "center",
								alignContent: "center",
								textAlign: "center",
								backgroundColor: "#212529",
								outlineStyle: "solid", outlineColor: "green"
							}}
						>
							<div
								class="card"
								style={{ outlineStyle: "solid", outlineColor: "green" }}
							>
								<div class="card-body">
									<h5 class="card-title">Internal Transfer</h5>
									<hr></hr>
									<p class="card-text">
										Create a Transaction From a SafeMonii Account to another
										SafeMonii Account
									</p>
									<hr></hr>
									<a
										href="http://localhost:3000/InternalTransaction"
										class="btn btn-success"
									>
										Go To Internal Transactions
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-6">
						<div
							className={styles.App}
							style={{
								width: 750,
								alignItems: "center",
								alignContent: "center",
								textAlign: "center",
								backgroundColor: "#212529",
								outlineStyle: "solid", outlineColor: "green"
							}}
						>
							<div
								class="card"
								style={{ outlineStyle: "solid", outlineColor: "green" }}
							>
								<div class="card-body">
									<h5 class="card-title">External Transfer</h5>
									<hr></hr>
									<p class="card-text">
										Create a Transaction From a SafeMonii Account to a different
										Bank Account
									</p>
									<hr></hr>
									<a
										href="http://localhost:3000/Transaction_create"
										class="btn btn-success"
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
