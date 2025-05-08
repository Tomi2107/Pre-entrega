// src/componentes/Usuarios.jsx
import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    rol: "cliente",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find((u) => u.correo === form.correo);
    if (existe) {
      Swal.fire("Error", "Este correo ya está registrado", "error");
      return;
    }

    usuarios.push(form);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire("¡Registrado!", "Redirigiendo al login...", "success").then(() => {
      navigate("/login");
    });
  };

  return (
    <Container>
      <h2 className="mb-4 text-center">Registro de Usuario</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre" className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="correo" className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="contraseña" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contraseña"
                value={form.contraseña}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="rol" className="mb-4">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="rol" value={form.rol} onChange={handleChange}>
                <option value="cliente">Cliente</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Registrarse
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Usuarios;
