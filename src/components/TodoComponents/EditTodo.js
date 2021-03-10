import React, { useState } from "react";
import {
  Container,
  Button,
  Input,
  Modal,
  Header,
  Icon,
} from "semantic-ui-react";

const EditTodo = ({ todo, setTodosChange }) => {
  const [open, setOpen] = React.useState(false);

  //editText function
  const editText = async (id) => {
    try {
      const body = { description, status };
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      myHeaders.append("user_id", localStorage.user_id);

      await fetch(`http://localhost:3030/todos/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setTodosChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [description, setDescription] = useState(todo.todo_description);
  const [status, setStatus] = useState(todo.todo_status);

  return (
    <Container>
      <Modal
        basic
        id={`id${todo.todo_id}`}
        onClick={() => {
          setDescription(todo.todo_description);
          setStatus(todo.todo_status);
        }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
        trigger={<Button>Edit</Button>}
      >
        <Header icon>
          <Icon name="file alternate" />
          Edit your Todo here
        </Header>
        <Modal.Actions>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="checkbox"
            checked={status}
            onChange={(e) => {
              setStatus(!status);
            }}
          />
          <Button
            basic
            color="red"
            inverted
            onClick={() => {
              setDescription(todo.todo_description);
              setStatus(todo.todo_status);
              setOpen(false);
            }}
          >
            <Icon name="remove" /> Close
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              editText(todo.todo_id);
              setOpen(false);
            }}
          >
            <Icon name="checkmark" /> Edit
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default EditTodo;
