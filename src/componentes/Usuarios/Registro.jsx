// src/componentes/Registro.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    usuario: '',
    email: '',
    password: '',
    rol: 'cliente'  // por defecto
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
    // Validar usuario único
    const existe = usuarios.find(u => u.usuario === formData.usuario);
    if (existe) {
      setMensaje('Ese nombre de usuario ya está registrado.');
      return;
    }
  
    usuarios.push(formData);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    setMensaje('¡Registro exitoso! Serás redirigido al login...');
  
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };
  

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Registro de Usuario</h2>
          {mensaje && <Alert variant="info">{mensaje}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control type="text" name="nombre" required onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" name="usuario" required onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" required onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" required onChange={handleChange} />
            </Form.Group>

            {/* Solo visible si querés permitir setear rol directamente */}
            {/* <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="rol" onChange={handleChange}>
                <option value="cliente">Cliente</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group> */}

            <Button variant="primary" type="submit">Registrarse</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;
