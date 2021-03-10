import React, { useState } from "react";
import { Container, Divider, Button, Input } from "semantic-ui-react";

const InputTodo = ({ setTodosChange }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { description, user_id: localStorage.user_id };
      const response = await fetch("http://localhost:3030/todos/new", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setTodosChange(true);
      setDescription("");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Container>
      <h1>Input Todo</h1>
      <form onSubmit={onSubmitForm}>
        <Input
          type="text"
          placeholder="add todo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button>Add</Button>
      </form>
      <Divider />
    </Container>
  );
};

export default InputTodo;
