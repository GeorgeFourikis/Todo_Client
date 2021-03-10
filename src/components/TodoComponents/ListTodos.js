import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import { Button, Table } from "semantic-ui-react";

const ListTodos = ({ allTodos, setTodosChange }) => {
  const [todos, setTodos] = useState([]); //useState to set todos to

  //delete todo function
  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:3030/todos/${id}`, {
        method: "DELETE",
        headers: {
          jwt_token: localStorage.token,
          user_id: localStorage.user_id,
        },
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  return (
    <Table style={{ width: "500px" }} celled stripped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={6}>Description</Table.HeaderCell>
          <Table.HeaderCell width={6}>Status</Table.HeaderCell>
          <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {todos.length !== 0 &&
          todos[0].todo_id !== null &&
          todos.map((todo) => (
            <Table.Row key={todo.todo_id}>
              <Table.Cell>{todo.todo_description}</Table.Cell>
              <Table.Cell>{todo.todo_status ? "Done" : "Pending"}</Table.Cell>
              <Table.Cell>
                <EditTodo todo={todo} setTodosChange={setTodosChange} />
                <Button onClick={() => deleteTodo(todo.todo_id)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default ListTodos;
