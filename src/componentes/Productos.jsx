import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://68056fddca467c15be691494.mockapi.io/productos')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al cargar productos.");
        setCargando(false);
      });
  }, []);

  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoActual.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
  
    window.dispatchEvent(new Event("carritoActualizado"));
  
    // SweetAlert de confirmación
    Swal.fire({
      title: '¡Producto agregado!',
      text: `${producto.name} fue agregado al carrito.`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };
  

  if (cargando) return <p className="m-4">Cargando productos...</p>;
  if (error) return <p className="m-4 text-danger">{error}</p>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Listado de Productos</h2>
      <Row>
        {productos.map((producto) => (
          <Col key={producto.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={producto.image || "https://picsum.photos/110/?random"}
                alt={producto.name}
              />
              <Card.Body>
                <Card.Title>{producto.name}</Card.Title>
                <Card.Text>Precio: ${producto.price || 100}</Card.Text>
                <Button variant="primary" onClick={() => agregarAlCarrito(producto)}>
                  Agregar al carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Productos;
