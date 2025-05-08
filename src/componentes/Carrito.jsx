import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Alert } from "react-bootstrap";
import Swal from "sweetalert2";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  // Cargar el carrito desde localStorage
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
    calcularTotal(carritoGuardado);
  }, []);

  const calcularTotal = (carrito) => {
    const totalCarrito = carrito.reduce((sum, producto) => sum + (producto.price || 100), 0); // Si no hay precio, se toma 100
    setTotal(totalCarrito);
  };

  const eliminarDelCarrito = (id) => {
    Swal.fire({
      title: "¿Eliminar del carrito?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then((res) => {
      if (res.isConfirmed) {
        const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
        setCarrito(nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
        calcularTotal(nuevoCarrito);
        Swal.fire("Producto eliminado", "", "success");
      }
    });
  };

  const procederAlPago = () => {
    // Muestra el SweetAlert al proceder al pago
    Swal.fire({
      title: "¡Pago Realizado!",
      text: "El pago ha sido procesado. El pedido será enviado a la dirección especificada en su perfil.",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      // Aquí puedes agregar el código para vaciar el carrito y redirigir si es necesario
      setCarrito([]); // Vaciar carrito
      localStorage.setItem("carrito", JSON.stringify([])); // Limpiar el carrito en localStorage
      setTotal(0); // Resetear el total
    });
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <Alert variant="warning" className="text-center">
          ¡Tu carrito está vacío! Agrega algunos productos.
        </Alert>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup>
              {carrito.map((producto) => (
                <ListGroup.Item key={producto.id}>
                  <Row>
                    <Col md={8}>
                      <strong>{producto.name}</strong> {/* Usar producto.name */}
                      <br />
                      ${producto.price || 100} {/* Mostrar el precio o 100 */}
                    </Col>
                    <Col md={4} className="text-end">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => eliminarDelCarrito(producto.id)}
                      >
                        Eliminar
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="text-end mt-4">
              <h4>Total: ${total.toFixed(2)}</h4>
            </div>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Resumen del Pedido</Card.Title>
                <Card.Text>
                  <strong>Total de Productos:</strong> {carrito.length}
                </Card.Text>
                <Button variant="primary" block onClick={procederAlPago}>
                  Proceder al Pago
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Carrito;
