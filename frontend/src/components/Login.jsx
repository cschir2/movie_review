import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login({ login }) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const handleLogin = () => {
    login({
      name,
      id,
    });

    navigate("/");
  };

  return (
    <Container className="mt-4">
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={name}
            onChange={onChangeName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="userId">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user ID"
            value={id}
            onChange={onChangeId}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleLogin}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;