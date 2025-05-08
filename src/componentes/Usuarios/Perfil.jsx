import React from "react";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  if (!usuario) {
    return <p>No estás logueado.</p>;
  }

  return (
    <div className="perfil-container">
      <h2>Bienvenido, {usuario.nombre}</h2>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Rol:</strong> {usuario.rol || "usuario"}</p>

      <button
        className="settings-button"
        onClick={() => navigate("/settings")}
        title="Cambiar perfil de usuario"   
      >
        ⚙ Configuración
      </button>

    </div>
  );
};

export default Perfil;








