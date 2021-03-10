import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Divider, Button, Input } from "semantic-ui-react";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:3030/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error("onSubmit form error: ", err.message);
    }
  };

  return (
    <Container
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <h1>Register</h1>
      <Divider />
      <form onSubmit={onSubmitForm}>
        <Input
          type="text"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          label="Email"
        />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          label="Password"
        />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <Divider />
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary">
          Login
        </Button>
      </Link>{" "}
    </Container>
  );
};

export default Register;
