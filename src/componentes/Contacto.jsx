// src/componentes/Contacto.jsx
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Contacto = () => {
  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2>Contacto</h2>
          <p><strong>Dirección:</strong> Av. Siempreviva 742, Springfield</p>
          <p><strong>Teléfono:</strong> +54 9 11 1234-5678</p>
          <p><strong>Email:</strong> contacto@mitienda.com</p>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h4>Envíanos un mensaje</h4>
          <Form>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Tu nombre" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="tu@email.com" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mensaje">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje..." required />
            </Form.Group>
            <Button variant="primary" type="submit">Enviar</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
