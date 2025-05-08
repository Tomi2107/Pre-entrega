// src/componentes/Actividad.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Actividad = ({ actividad, onGenerarOtra }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{actividad?.activity}</Card.Title>
        <Card.Text>
          <strong>Tipo de actividad:</strong> {actividad?.type}
        </Card.Text>
        <Button variant="primary" onClick={onGenerarOtra}>
          Generar otra actividad
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Actividad;
