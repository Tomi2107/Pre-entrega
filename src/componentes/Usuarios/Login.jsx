import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario = verificarUsuario(email, password);

    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
      window.dispatchEvent(new Event("authChange")); // 🔥 Notificar Header

      if (usuario.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/perfil");
      }
    } else {
      setMensaje("Correo o contraseña incorrectos");
    }
  };

  const verificarUsuario = (email, password) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    return usuarios.find(
      (u) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );
  };

  const limpiarMensaje = () => {
    if (mensaje) setMensaje("");
  };



  return (
    <div className="container mt-4">
      <h2>Login</h2>
      {mensaje && <Alert variant="danger">{mensaje}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              limpiarMensaje();
            }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              limpiarMensaje();
            }}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Ingresar
        </Button>
      </Form>
    </div>
  );
};

export default Login;
