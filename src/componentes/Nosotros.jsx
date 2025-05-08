// src/componentes/Nosotros.jsx
import React from "react";
import { Container } from "react-bootstrap";

const Nosotros = () => {
  return (
    <Container className="mt-4 text-start">
      <h2>Sobre Nosotros</h2>
      <p>
        En <strong>Mi Tienda</strong>, nos dedicamos con pasión a ofrecer productos de calidad que combinan estilo, funcionalidad y accesibilidad. Nuestra empresa nació con la idea de brindar a los usuarios una experiencia de compra confiable, cómoda y completamente digital, adaptada a los tiempos modernos. 
      </p>
      <p>
        Desde nuestros inicios, hemos trabajado con proveedores de confianza para garantizar productos duraderos y con estilo. Nuestra selección está pensada para satisfacer las necesidades de una gran variedad de clientes, desde quienes buscan artículos para el hogar hasta quienes desean regalos únicos o productos tecnológicos.
      </p>
      <p>
        Lo que nos diferencia es nuestro compromiso con la atención personalizada. Creemos que cada cliente merece una experiencia única, por eso contamos con un equipo preparado para responder dudas, recibir sugerencias y acompañarte en cada paso de tu compra. 
      </p>
      <p>
        Además, nos mantenemos en constante innovación, incorporando nuevas categorías y funcionalidades en nuestra tienda online. Actualmente, ofrecemos funciones como carrito de compras, sistema de registro y login, y una sección API interactiva para entretener a nuestros visitantes.
      </p>
      <p>
        Con una filosofía centrada en el usuario, en Mi Tienda nos proponemos ser más que una tienda: un espacio donde la tecnología y la experiencia de usuario se combinan para crear algo especial. Creemos en el comercio justo, en la sostenibilidad y en el crecimiento conjunto con nuestra comunidad.
      </p>
      <p>
        Gracias por elegirnos. ¡Esperamos seguir creciendo con vos!
      </p>
    </Container>
  );
};

export default Nosotros;
