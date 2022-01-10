import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Transactions from "../pages/Transactions";

export default class TransactionListOuter extends Component {
  constructor(props) {
    super(props);
  }

  booleanView(x) {
    return x ? "Debit" : "Credit";
  }

  dateFormat(date){
    const x = date.split('T');
    return x[0];
  }

  render() {
    return (
      <tr>
        <td>{this.dateFormat(this.props.obj.Date)}</td>
        <td>{this.props.obj.description}</td>
        <td>{this.booleanView(this.props.obj.debit)}</td>
        <td style={{color: "red"}}>-{this.props.obj.amount} $</td>
      </tr>
    );
  }
}
