// src/componentes/Api.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import Actividad from "./Actividad"; // Componente para mostrar la actividad

const Api = () => {
  const [activity, setActivity] = useState(null);
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener una nueva actividad desde la API
  const fetchActivity = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://www.boredapi.com/api/activity");
      setActivity(response.data);
      setLoading(false);
      setError(null); // Limpiar cualquier error previo
    } catch (error) {
      console.error("Error fetching activity:", error);
      setLoading(false);
      setError("Hubo un problema al obtener la actividad.");
    }
  };

  // Obtener un chiste desde la API
  const fetchJoke = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
      setJoke(response.data);
      setLoading(false);
      setError(null); // Limpiar cualquier error previo
    } catch (error) {
      console.error("Error fetching joke:", error);
      setLoading(false);
      setError("Hubo un problema al obtener el chiste.");
    }
  };

  // Llamar a las APIs al cargar el componente
  useEffect(() => {
    fetchActivity();
    fetchJoke();
  }, []);

  // Renderizar la UI
  return (
    <Container className="mt-4">
      <h2>API de Actividades y Chistes</h2>
      
      {/* Mostrar error si ocurrió uno */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Sección de Actividad */}
      <h1>Actividad Posible</h1>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Row>
          <Col md={6}>
            <Actividad actividad={activity} onGenerarOtra={fetchActivity} />
          </Col>
        </Row>
      )}

      {/* Sección de Chistes */}
      <h1>Chistes</h1>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Row>
          <Col md={6}>
            {joke ? (
              <Alert variant="info">{joke.joke}</Alert>
            ) : (
              <Alert variant="warning">No hay chistes disponibles en este momento.</Alert>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Api;
