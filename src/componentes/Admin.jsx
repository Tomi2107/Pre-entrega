// src/componentes/Admin.jsx
import React, { useEffect, useState } from "react";
import { Container, Form, Button, Table, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(productosGuardados);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let nuevosProductos;
    if (form.id !== null) {
      // Editar
      nuevosProductos = productos.map((p) =>
        p.id === form.id ? form : p
      );
      Swal.fire("Producto editado", "", "success");
    } else {
      // Agregar
      const nuevo = { ...form, id: Date.now() };
      nuevosProductos = [...productos, nuevo];
      Swal.fire("Producto agregado", "", "success");
    }

    setProductos(nuevosProductos);
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));
    setForm({ id: null, nombre: "", descripcion: "", precio: "", imagen: "" });
  };

  const handleEdit = (producto) => {
    setForm(producto);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Eliminar producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
    }).then((res) => {
      if (res.isConfirmed) {
        const nuevos = productos.filter((p) => p.id !== id);
        setProductos(nuevos);
        localStorage.setItem("productos", JSON.stringify(nuevos));
        Swal.fire("Eliminado", "", "success");
      }
    });
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Panel de Administración</h2>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                name="precio"
                type="number"
                value={form.precio}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                name="imagen"
                value={form.imagen}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={1} className="d-flex align-items-end">
            <Button type="submit" variant="success">
              {form.id ? "Editar" : "Agregar"}
            </Button>
          </Col>
        </Row>
      </Form>

      <hr />

      <h4 className="mt-4">Lista de productos</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.imagen} alt={p.nombre} width="80" />
              </td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>${p.precio}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(p)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(p.id)}
                >
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Admin;
