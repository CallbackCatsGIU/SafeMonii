import styles from "../styles/Home.module.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Component } from "react";
import MyApp from "../pages/_app";
import apiService from "../services/apiService";
import Accountlist from "./AccountList.js";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      account: [],
    };
  }

  async componentDidMount() {
    const currentID = "";
    const currentUser = JSON.parse(window.localStorage.getItem("myUser"));
    const email = encodeURI(currentUser.email);
    

    const url = `http://localhost:8000/users/email/${email}`;
    
    await axios.get(url).then((response) => { 
      currentID = response.data[0].studentId;
    }).catch((error) => console.log(error));

    
    console.log(currentID);

    

     axios
      .get(
        "http://localhost:8000/accounts/accountList/" +
          currentID
      )
      .then((response) => {
       console.log("success");
       console.log(response.data + 'AAAAAAA');
         this.setState({
           account: Object.values(response.data),
         });
         console.log(this.state.account + 'BBBBBB')
       })
       .catch((error) => {
         console.log(error);
       });
  }

  DataTable() {
    
    return this.state.account.map((res, i) => {
     return(
      <Accountlist obj={res} key={i} />
     );
    });
  }

  render() {
    return (
        <div className="table-wrapper">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>{this.DataTable()}</tbody>
          </Table>
        </div>
    );
  }

  /*render (
    <div
      className={styles.App}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <div className="row ">
        <div class="col-sm-6">
          <ul class="list-group">
            <li class="list-group-item">Accounts</li>
            <li class="list-group-item">Account1</li>
            <li class="list-group-item">Account3</li>
            <li class="list-group-item">Account4</li>
            <li class="list-group-item">Account5</li>
          </ul>
        </div>
        <div class="col-sm-6">
          <ul class="list-group">
            <li class="list-group-item">Balance</li>
            <li class="list-group-item">300</li>
            <li class="list-group-item">10000</li>
            <li class="list-group-item">500000</li>
            <li class="list-group-item">100</li>
          </ul>
        </div>
      </div>
    </div>
  );*/
}
