import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "../styles/Home.module.css"; 
import {Input,Form} from "reactstrap";

export default function  InternalTranscation() {
    function Returnback(){
    window.location = "http://localhost:3000/"
    
};

    return (
        
      <div  style = {{textAlign:"center"}} > 
        <h1 style = {{textAlign:"center"}}className="p-3 mb-2 bg-dark text-white">Internal Transcation </h1>
        <div className={styles.App} > 
        <p style = {{textAlign:"center"}} className="text-info p-4 ">Account Id:
        <Input
            type="text"
            name="account " required ></Input> 
             </p>

        </div>
       
        <div className={styles.App}>
        <p style = {{textAlign:"center"}} className="text-info p-4 "> Balance:
        <Input
            type="text"
            name="amount" required ></Input>  </p>


       </div>


       
        <button className="button  p-3 mb-2 bg-dark text-white" onClick={Returnback}>
           Submit 
       </button>

        
        
        </div>

        
    );



}






