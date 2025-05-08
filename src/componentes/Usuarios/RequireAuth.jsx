// src/componentes/Usuarios/RequireAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, rol }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // No logueado
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Tiene que ser admin pero no lo es
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
