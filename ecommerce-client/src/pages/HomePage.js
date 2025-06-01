import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import bannerImage from '../assets/banner-tonymoly.png';
// Importa imágenes de productos (asegúrate de tener estas imágenes en tu carpeta assets)
import producto1 from '../assets/producto1.jpg';
import producto2 from '../assets/producto2.jpg';
import producto3 from '../assets/producto3.jpg';
import producto4 from '../assets/producto4.jpg';

function HomePage() {
  const navigate = useNavigate();

  // Datos de productos virales
  const productosVirales = [
    {
      id: 1,
      nombre: "Falda Rosa de Princesas",
      precio: 80000,
      imagen: producto1,
      categoria: "faldas"
    },
    {
      id: 2,
      nombre: "Falda negra de tull corta",
      precio: 50000,
      imagen: producto2,
      categoria: "camisetas"
    },
    {
      id: 3,
      nombre: "Cardigan blanco tejido a mano",
      precio: 90000,
      imagen: producto3,
      categoria: "pantalones"
    },
    {
      id: 4,
      nombre: "Blazer negro largo con cinturon",
      precio: 120000,
      imagen: producto4,
      categoria: "accesorios"
    }
  ];

  // Función para redirigir al catálogo
  const redirectToCatalog = () => {
    navigate('/catalog');
  };

  return (
    <div className="homepage">
      {/* Hero Banner */}
      <div className="hero-banner" style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className="hero-content">
          <h1>Paradise Store</h1>
          <p>Explora nuestra colección de ropa alternativa</p>
          <button className="btn-shop" onClick={redirectToCatalog}>
            Comprar ahora
          </button>
        </div>
      </div>

      {/* Categorías */}
      <section className="categories">
        <h2>Para ti</h2>
        <div className="category-cards">
          <div className="category-card">
            <h3>Faldas</h3>
            <p>Colección primavera-verano</p>
          </div>
          <div className="category-card">
            <h3>Pantalones</h3>
            <p>Estilo urbano</p>
          </div>
          <div className="category-card">
            <h3>Zapatos</h3>
            <p>Moda alternativa</p>
          </div>
          <div className="category-card">
            <h3>Accesorios</h3>
            <p>Complementos únicos</p>
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="featured-products">
        <h2>Productos virales</h2>
        <div className="product-grid">
          {productosVirales.map(producto => (
            <div key={producto.id} className="product-card">
              <div className="product-image-container">
                <img src={producto.imagen} alt={producto.nombre} />
              </div>
              <div className="product-info">
                <h3>{producto.nombre}</h3>
                <p className="price">${producto.precio.toLocaleString()}</p>
              
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer simple */}
      <footer className="footer">
        <p>&copy; 2025 Paradise Store - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default HomePage;