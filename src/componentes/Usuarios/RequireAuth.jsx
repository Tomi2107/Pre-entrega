// src/componentes/Usuarios/RequireAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, rolRequerido }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene, redirigir
  if (rolRequerido && usuario.rol !== rolRequerido) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;
