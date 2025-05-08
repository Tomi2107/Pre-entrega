// src/componentes/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-5">
      <h1>404 - Página no encontrada</h1>
      <p>La página que buscás no existe.</p>
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;
