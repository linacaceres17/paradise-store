// src/components/ProductCard.jsx
import React from 'react';

function ProductCard({ producto, onAgregarAlCarrito }) {
  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">{producto.descripcion}</p>
        <p><strong>${producto.precio}</strong></p>
        <button
          className="btn btn-success"
          onClick={() => onAgregarAlCarrito(producto)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
