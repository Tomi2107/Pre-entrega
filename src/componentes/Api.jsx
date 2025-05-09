// src/componentes/Api.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import axios from "axios";
import Actividad from "./Actividad";
import Toast from './Toast';

const Api = () => {
  const [activity, setActivity] = useState(null);
  const [joke, setJoke] = useState(null);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [loadingJoke, setLoadingJoke] = useState(true);
  const [error, setError] = useState(null);

  // Abecedario
  const abecedario = 'Saludos_Profes!!'.split('');
  const [indice, setIndice] = useState(0);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [historial, setHistorial] = useState([]);

  const mostrarSiguienteLetra = () => {
    if (indice < abecedario.length) {
      const nuevaLetra = abecedario[indice];
      setHistorial([...historial, nuevaLetra]);
      setIndice(indice + 1);
      setMostrarToast(true);
      setTimeout(() => setMostrarToast(false), 2000);
    }
  };

  const reiniciar = () => {
    setIndice(0);
    setHistorial([]);
  };

  let letraActual;
  if (indice === 0) {
    letraActual = 'Haz clic para empezar';
  } else if (indice <= abecedario.length - 1) {
    letraActual = abecedario[indice - 1];
  } else {
    letraActual = '¡Fin del abecedario!';
  }

  const haTerminado = indice >= abecedario.length;

  // Fetch actividad
  const fetchActivity = async () => {
    try {
      setLoadingActivity(true);
      const response = await axios.get("https://www.boredapi.com/api/activity");
      setActivity(response.data);
      setError(null);
    } catch (err) {
      console.error("Error al obtener actividad:", err);
      setError("Hubo un problema al obtener la actividad.");
    } finally {
      setLoadingActivity(false);
    }
  };

  // Fetch chiste
  const fetchJoke = async () => {
    try {
      setLoadingJoke(true);
      const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
      setJoke(response.data);
      setError(null);
    } catch (err) {
      console.error("Error al obtener chiste:", err);
      setError("Hubo un problema al obtener el chiste.");
    } finally {
      setLoadingJoke(false);
    }
  };

  useEffect(() => {
    fetchActivity();
    fetchJoke();
  }, []);

  return (
    <Container className="mt-4">
      <div className="text-center mb-5">
        <h1>Mostrar el saludo</h1>
        <div style={{ fontSize: '3rem', margin: '20px' }}>{letraActual}</div>

        {haTerminado ? (
          <Button variant="danger" size="lg" onClick={reiniciar}>Reiniciar</Button>
        ) : (
          <Button variant="primary" size="lg" onClick={mostrarSiguienteLetra}>Siguiente letra</Button>
        )}

        {mostrarToast && !haTerminado && (
          <Toast mensaje={`Mostrando: ${abecedario[indice - 1]}`} />
        )}

        {historial.length > 0 && (
          <div className="mt-4">
            <h4>Letras mostradas:</h4>
            <div style={{ fontSize: '1.5rem' }}>
              {historial.map((letra) => (
                <span key={letra} style={{ marginRight: '10px' }}>{letra}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <h2 className="mb-3">API de Actividades y Chistes</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Actividad */}
      <h3>Actividad sugerida</h3>
      {loadingActivity && (
        <Spinner animation="border" variant="primary" />
      )}

      {!loadingActivity && activity && (
        <>
          <Alert variant="success">
            ¡Hola! Te sugerimos esta actividad: <strong>{activity.activity}</strong>
          </Alert>
          <Row className="mb-4">
            <Col md={6}>
              <Actividad actividad={activity} onGenerarOtra={fetchActivity} />
            </Col>
          </Row>
        </>
      )}


      {/* Chiste */}
      <h3>Chiste del día</h3>
      {loadingJoke ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Row className="mb-4">
          <Col md={6}>
            {joke ? (
              <Alert variant="info">{joke.joke}</Alert>
            ) : (
              <Alert variant="warning">No hay chistes disponibles.</Alert>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Api;
