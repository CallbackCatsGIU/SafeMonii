import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { useState } from "react";
import {useMutateRegisterUser} from '../adapters/user'
import styles from "../styles/Home.module.css";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setstudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullNameState, setFullNameState] = useState("");
  const [phoneState, setPhoneState] = useState("");
  const [userNameState, setUserNameState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [studentIdState, setstudentIdState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const useRegisterMutations = useMutateRegisterUser();
  const [confirmPasswordState, setConfirmPasswordState] = useState("");

  const validatePhone = (value) => {
    let phoneState;
    if (value.length == 11) {
      phoneState = "has-success";
    } else {
      phoneState = "has-danger";
    }
    setPhoneState(phoneState);
  };

  const validatestudentId = (value) => {
    let studentIdState;
    if (value.length == 7) {
      studentIdState = "has-success";
    } else {
      studentIdState = "has-danger";
    }
    setstudentIdState(studentIdState);
  };

  const validateFullName = (value) => {
    let fullNameState;
    if (value.length < 24) {
      fullNameState = "has-success";
    } else {
      fullNameState = "has-danger";
    }
    setFullNameState(fullNameState);
  }
  const validateUserName = (value) => {
    let userNameState;
    if (value.length < 17) {
      userNameState = "has-success";
    } else {
      userNameState = "has-danger";
    }
    setUserNameState(userNameState);
  };
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

  const validatePassword = (value) => {
    let PasswordState;
    if (value.length > 5) {
      PasswordState = "has-success";
    } else {
      PasswordState = "has-danger";
    }
    setPasswordState(PasswordState);
  };

  const validateConfirmPassword = (value) => {
    let confirmPasswordState;
    if (value === password && password.length > 0) {
      confirmPasswordState = "has-success";
    } else {
      confirmPasswordState = "has-danger";
    }
    setConfirmPasswordState(confirmPasswordState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      validateEmail(value);
      setEmail(value);
    } else if (name === "confirm_password") {
      validateConfirmPassword(value);
      setConfirmPassword(value);
    }
    else if (name === "studentId"){
    validatestudentId(value);
    setstudentId(value);
    }
    else if (name === "phone"){
      validatePhone(value);
      setPhone(value);
    }
    else if (name === "userName"){
      validateUserName(value);
      setUserName(value);
    }
    else if (name === "fullName"){
      validateFullName(value);
      setFullName(value);
    }
    else {
      validatePassword(value);
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);
    validateUserName(userName);
    validatestudentId(studentId);
    validatePhone(phone);
    validateFullName(fullName);

    if (
      emailState === "has-success" &&
      passwordState === "has-success" &&
      confirmPasswordState === "has-success" &&
      phoneState === "has-success" &&
      userNameState === "has-success" &&
      studentIdState === "has-success" &&
      fullNameState === "has-success"
    ) {
      useRegisterMutations.mutate({
        email: email,
        password: password,
        userName: userName,
        studentId: studentId,
        phone: phone,
        fullName: fullName,
      });
      // Call User Register Adapter
    }
  };

  return (
    <div className={styles.App} style={{backgroundColor: "white"}}>
      <h2 >Register</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormGroup>
          <Label className={styles.label} for="email">
            Email
          </Label>

          <Input
            type="text"
            name="email" required
            id="email"
            placeholder="example@example.com"
            onChange={handleChange}
            valid={emailState === "has-success"}
            invalid={emailState === "has-danger"}
          />
          <FormFeedback>Please input a correct email.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="username">
            Username
          </Label>
          <Input
            type="text"
            name="userName" required
            id="userName"
            minLength="4" 
            maxLength="16"
            placeholder="ex. homelessKing"
            onChange={handleChange}
            valid={userNameState === "has-success"}
            invalid={userNameState === "has-danger"}
          />
          <FormFeedback>
            Please input a valid username containing 4 to 16 characters .
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="fullName">
            Full Name
          </Label>
          <Input
            type="text"
            name="fullName" required
            id="fullName"
            minLength="2" 
            maxLength="24"
            placeholder="First and Last Name"
            onChange={handleChange}
            valid={fullNameState === "has-success"}
            invalid={fullNameState === "has-danger"}
          />
          {/* <FormFeedback>Please input a a valid username containing 4 to 16 characters .</FormFeedback> */}
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="phone">
            Phone Number
          </Label>
          <Input
            type="tel"
            name="phone" required
            id="phone"
            minLength="11" 
            maxLength="11"
            placeholder="ex. 01223456789"
            onChange={handleChange}
            valid={phoneState === "has-success"}
            invalid={phoneState === "has-danger"}
          />
          <FormFeedback>
            {" "}
            Please input a valid 11 digit phone number .
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="studentId">
            GIU Student ID
          </Label>
          <Input
            type="tel"
            name="studentId" required
            id="studentId"
            minLength="7" 
            maxLength="7"
            placeholder="ex. 1002397"
            onChange={handleChange}
            valid={studentIdState === "has-success"}
            invalid={studentIdState === "has-danger"}
          />
          <FormFeedback>
            {" "}
            Please input a valid 7 digit GIU student ID .
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="password">
            Password
          </Label>
          <Input
            type="password"
            name="password" required
            id="password"
            minLength="6" 
            maxLength="20"
            placeholder="********"
            onChange={handleChange}
            valid={passwordState === "has-success"}
            invalid={passwordState === "has-danger"}
          />
          <FormFeedback>
            Password must be at least 6 characters long and at most 20 characters long.
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="password">
            Confirm Password
          </Label>
          <Input
            type="password"
            name="confirm_password" required
            id="password"
            minLength="6" 
            maxLength="20"
            placeholder="********"
            onChange={handleChange}
            valid={confirmPasswordState === "has-success"}
            invalid={confirmPasswordState === "has-danger"}
          />
          <FormFeedback>Passwords don't match.</FormFeedback>
        </FormGroup>
        <Button color="dark">Submit</Button>
      </Form>
    </div>
  );
}
