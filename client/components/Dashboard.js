import styles from "../styles/Home.module.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Component } from "react";
import MyApp from "../pages/_app";
import apiService from "../services/apiService";
import AccountList from "./AccountList.js";
import Navbar from "./Navbar";
import background from "../public/Logomaske_384x215_blue_light.jpg"

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      account: [],
    };
  }

  async componentDidMount() {
    const currentID = "";
    const currentUser = JSON.parse(window.sessionStorage.getItem("myUser"));
    const email = encodeURI(currentUser.email);

    const url = `http://localhost:8000/users/email/${email}`;
    const token = JSON.parse(window.sessionStorage.getItem("jwt"));


    await axios
      .get(url)
      .then((response) => {
        currentID = response.data[0].studentId;
      })
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8000/accounts/accountList/" + currentID,{ headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        this.setState({
          account: Object.values(response.data),
        });
      })
      .catch((error) => {
        console.log(error);
      });
    
  }

  DataTable() {
    return this.state.account.map((res, i) => {
      return <AccountList obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div style={{backgroundImage: `url(${background})`}}>
        <Navbar />
        <h1 style = {{textAlign:"center"}}className="p-3 mb-2 bg-dark text-white">Welcome to SafeMonii</h1>
        <div className="table-wrapper">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Balance</th>
                <th>Transactions</th>
              </tr>
            </thead>
            <tbody>{this.DataTable()}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}
