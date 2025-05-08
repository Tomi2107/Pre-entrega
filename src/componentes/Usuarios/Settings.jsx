import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [nombre, setNombre] = useState(usuario.nombre);
  const [email, setEmail] = useState(usuario.email);
  const [password, setPassword] = useState(usuario.password);

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const index = usuarios.findIndex((u) => u.email === usuario.email);

    if (index !== -1) {
      usuarios[index] = { ...usuarios[index], nombre, email, password };
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.setItem("usuario", JSON.stringify(usuarios[index]));
      alert("Perfil actualizado correctamente");
      navigate("/perfil");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Perfil</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar Cambios
        </Button>
      </Form>
    </div>
  );
};

export default Settings;
