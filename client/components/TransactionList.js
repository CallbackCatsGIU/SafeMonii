import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Transactions from "../pages/Transactions";

export default class TransactionList extends Component {
  constructor(props) {
    super(props);
  }

  booleanView(x) {
    return x? "YES" : "NO";
  }


  render() {
    return (
      <tr>
        <td>{this.props.obj.Date}</td>
        <td>{this.props.obj.transactionName}</td>
        <td>{this.booleanView(this.props.obj.debit)}</td>
        <td>{this.booleanView(this.props.obj.credit)}</td>
        <td>{this.props.obj.totalAmount}</td>
        
      </tr>
    );
  }
}
