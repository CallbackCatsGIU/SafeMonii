import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Transactions from "../pages/Transactions";
import Transaction_create from "../pages/Transaction_create";
import Internal_Transaction from "../pages/InternalTransaction";


export default class AccountList extends Component {
  constructor(props) {
    super(props);
  }


  handleClick2 = () => {
    const currentacc = this.props.obj.accountNumber;
    window.sessionStorage.setItem("currentAccount_transaction",JSON.stringify(currentacc));
    const currentbalance = this.props.obj.balance;
    window.sessionStorage.setItem("currentBalance_transaction",JSON.stringify(currentbalance));
    window.location = "http://localhost:3000/transition"
    };

  handleClick = () => {
    const currentacc = this.props.obj.accountNumber;
    window.sessionStorage.setItem("currentAccount",JSON.stringify(currentacc));
    const currentbalance = this.props.obj.balance;
    window.sessionStorage.setItem("currentBalance",JSON.stringify(currentbalance));
    window.location = "http://localhost:3000/transactions"
    };
  


  render() {
    return (
      <tr>
        <td style={{backgroundColor: "white"}}>{this.props.obj.accountNumber}</td>
        <td style={{backgroundColor: "white"}}>{this.props.obj.balance}</td>
        <td style={{backgroundColor: "white"}}>
          <Button style={{marginRight : 40}} className="btn-success" onClick= {this.handleClick2}>Create Transaction</Button>
          <Button className="btn-success" onClick= {this.handleClick}>View Transactions</Button>
        </td>
      </tr>
    );
  }
}
