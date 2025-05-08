import React, { useEffect } from "react"; // <--- Asegurate de importar useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./Header";
import Footer from "./Footer";

import Contacto from './Contacto';
import Nosotros from './Nosotros';
import Home from "./Home";
import Productos from "./Productos";
import Carrito from "./Carrito";
import Registro from "./Usuarios/Registro";
import Login from "./Usuarios/Login";
import Admin from "./Admin";
import Api from "./Api";
import Perfil from "./Usuarios/Perfil";
import Settings from "./Usuarios/Settings";
import Listado from "./Listado";
import RequireAuth from "./Usuarios/RequireAuth";

import usuariosData from "./../data/usuarios.json"; // Asegurate que la ruta sea correcta

const Body = () => {
  useEffect(() => {
    // Solo cargamos si no existen usuarios en localStorage
    if (!localStorage.getItem("usuarios")) {
      localStorage.setItem("usuarios", JSON.stringify(usuariosData));
    }
  }, []);

  return (
    <Router>
      <Header />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/api" element={<Api />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />

          {/* Rutas protegidas */}
          <Route
            path="/perfil"
            element={
              <RequireAuth>
                <Perfil />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
          <Route
            path="/listado"
            element={
              <RequireAuth>
                <Listado />
              </RequireAuth>
            }
          />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default Body;
