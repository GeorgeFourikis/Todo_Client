import React from "react";
import { Link } from "react-router-dom";
import { Container, Divider, Button } from "semantic-ui-react";

const LandingPage = () => {
  return (
    <Container>
      <h1>Welcome to the Todo List App</h1>
      <Divider />
      <p>Sign In and start building your todo list</p>{" "}
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Link>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="secondary">
          Register
        </Button>
      </Link>{" "}
    </Container>
  );
};

export default LandingPage;
