import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = () => {
    try {
      const carritoGuardado = localStorage.getItem('carrito');
      const carritoParseado = carritoGuardado ? JSON.parse(carritoGuardado) : [];
      setCartItems(carritoParseado);
    } catch (error) {
      console.error('Error al cargar carrito:', error);
      localStorage.removeItem('carrito');
      setCartItems([]);
    }
  };

  const handleCheckout = () => {
    alert('Pedido enviado exitosamente 🎉');
    localStorage.removeItem('carrito');
    setCartItems([]);
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    localStorage.setItem('carrito', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === productId) {
        return {
          ...item,
          cantidad: Math.max(1, newQuantity),
          subtotal: item.precio * Math.max(1, newQuantity)
        };
      }
      return item;
    });
    localStorage.setItem('carrito', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Tu carrito está vacío.</p>
          <button onClick={() => navigate('/catalogo')} className="btn-back">
            Volver al catálogo
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img 
                  src={`http://localhost:5000/${item.imagen.replace(/\\/g, '/')}`} 
                  alt={item.nombre} 
                  className="cart-item-image" 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=Imagen+no+disponible';
                  }}
                />
                <div className="cart-item-details">
                  <h5>{item.nombre}</h5>
                  <p>${item.precio.toLocaleString()} c/u</p>
                  <div className="cart-quantity-selector">
                    <button 
                      onClick={() => updateQuantity(item._id, item.cantidad - 1)}
                      className="cart-quantity-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                      className="cart-quantity-input"
                    />
                    <button 
                      onClick={() => updateQuantity(item._id, item.cantidad + 1)}
                      className="cart-quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <p>Subtotal: ${(item.precio * item.cantidad).toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => removeItem(item._id)} 
                  className="remove-item-button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h4>Total: ${calculateTotal().toLocaleString()}</h4>
            <div className="cart-actions">
              <button onClick={() => navigate('/catalogo')} className="btn-continue">
                Seguir comprando
              </button>
              <button onClick={handleCheckout} className="btn-checkout">
                Confirmar Pedido
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;