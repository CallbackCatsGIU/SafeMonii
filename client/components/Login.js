import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import {useMutateLoginUser} from '../adapters/user'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailState, setEmailState] = useState("");
  const useLoginMutations = useMutateLoginUser();
  const validateEmail = (value) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let emailState;
    if (emailRegex.test(value)) {
      emailState = "has-success";
    } else {
      emailState = "has-danger";
    }
    setEmailState(emailState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
      validateEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call User Login Adapter
    useLoginMutations.mutate({
      email: email,
      password: password,
    });
  };

  function OnRegister(){
    window.location.replace("http://localhost:3000/register");
  };

  return (
    
    <div className={styles.App}>
      <h2>Sign In</h2>
      
      <Form className={styles.form} onSubmit={handleSubmit}>
      <div style={{display : "none"}} id="wrongCredentials" className="alert alert-danger" role="alert">
            "Wrong Credentials"
      </div>
        <FormGroup>
          <Label className={styles.label} for="email">
            Email
          </Label>

          <Input
            type="text"
            name="email"
            id="email"
            placeholder="example@example.com"
            onChange={handleChange}
            valid={emailState === "has-success"}
            invalid={emailState === "has-danger"}
          />
          <FormFeedback>Please input a correct email.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="password">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="primary" onSubmit={handleSubmit}>
          Submit
        </Button>
        <br></br>
        <br></br>
        <Button color="primary" onClick={OnRegister}>
          Don't have an account? Register here
        </Button>
      </Form>
    </div>
  );
}
