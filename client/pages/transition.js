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

export default function Transition() {
	return (
		<div class="row">
			<div class="col-sm-6">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">Special title treatment</h5>
						<p class="card-text">
							With supporting text below as a natural lead-in to additional
							content.
						</p>
						<a href="#" class="btn btn-primary">
							Go somewhere
						</a>
					</div>
				</div>
			</div>
			<div class="col-sm-6">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">Special title treatment</h5>
						<p class="card-text">
							With supporting text below as a natural lead-in to additional
							content.
						</p>
						<a href="#" class="btn btn-primary">
							Go somewhere
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
