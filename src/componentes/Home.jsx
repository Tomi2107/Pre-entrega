// src/componentes/Home.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  const bienvenidaCards = [
    {
      titulo: "Bienvenido",
      texto: "Explorá nuestros productos destacados.",
      img: "https://source.unsplash.com/random/400x200?store"
    },
    {
      titulo: "Ofertas",
      texto: "Mirá nuestras ofertas limitadas.",
      img: "https://source.unsplash.com/random/400x200?sale"
    },
    {
      titulo: "Novedades",
      texto: "¡Nuevos productos cada semana!",
      img: "https://source.unsplash.com/random/400x200?new"
    }
  ];

  return (
    <Container>
      <h2 className="mb-4 text-center">Inicio</h2>
      <Row>
        {bienvenidaCards.map((item, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Title>{item.titulo}</Card.Title>
                <Card.Text>{item.texto}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
