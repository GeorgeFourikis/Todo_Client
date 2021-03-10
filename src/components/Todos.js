import React, { useEffect, useState } from "react";
import { Container, Divider, Button } from "semantic-ui-react";

//components

import InputTodo from "./TodoComponents/InputTodo";
import ListTodos from "./TodoComponents/ListTodos";

const TodosComponent = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:3030/todos/", {
        method: "GET",
        headers: {
          jwt_token: localStorage.token,
          user_id: localStorage.user_id,
        },
      });

      const parseData = await res.json();

      setAllTodos(parseData["todos"]); // parse the todos from DB
      setEmail(parseData["user"][0].user_email); // parse email to show
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <Container>
      <Container>
        <h2>{email} todos</h2>
        <Divider />
        <Button onClick={(e) => logout(e)}>Logout</Button>
      </Container>

      <InputTodo setTodosChange={setTodosChange} />
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
    </Container>
  );
};

export default TodosComponent;
