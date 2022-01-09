import { useState, useEffect } from "react";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Table from "react-bootstrap/Table";


export default function Home() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    setAccessToken(token);
  }, []);

  return accessToken ? <Dashboard /> : <Login />;
}
