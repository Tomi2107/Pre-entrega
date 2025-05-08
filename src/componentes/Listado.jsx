// src/componentes/Listado.jsx
import React, { useEffect, useState } from "react";
import { ListGroup, Spinner, Alert } from "react-bootstrap";

const Listado = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://68056fddca467c15be691494.mockapi.io/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudo cargar el listado de productos.");
        setCargando(false);
      });
  }, []);

  if (cargando) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h2>Listado Detallado de Productos</h2>
      <ListGroup>
  {productos.map((producto) => (
    <ListGroup.Item key={producto.id} className="d-flex align-items-center justify-content-between">
      <div className="d-flex flex-column me-3" style={{ flex: 1 }}>
        <h5>{producto.name}</h5>
        <p className="mb-0" style={{ fontSize: "0.9rem", color: "#6c757d" }}>{producto.description}</p>
      </div>
      <strong>Precio: ${producto.price || 100}</strong>
    </ListGroup.Item>
  ))}
</ListGroup>
    </div>
  );
};

export default Listado;
