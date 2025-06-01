import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

function CheckoutPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    comentarios: '',
    metodoPago: 'tarjeta'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'Nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'Email es requerido';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email no válido';
    if (!formData.direccion.trim()) newErrors.direccion = 'Dirección es requerida';
    if (!formData.ciudad.trim()) newErrors.ciudad = 'Ciudad es requerida';
    if (!formData.telefono.trim()) newErrors.telefono = 'Teléfono es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Aquí iría la lógica para enviar el pedido al backend
      // Por ahora simulamos una llamada API con timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Enviar email (simulación)
      console.log('Enviando email con detalles del pedido:', formData);
      
      setOrderSuccess(true);
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="checkout-success">
        <div className="success-card">
          <h2>¡Pedido Confirmado!</h2>
          <p>Gracias por tu compra. Hemos enviado los detalles a tu email.</p>
          <button 
            className="btn-continue-shopping"
            onClick={() => navigate('/')}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Finalizar Compra</h2>
      
      <div className="checkout-grid">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Información de Envío</h3>
          
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo*</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? 'error' : ''}
            />
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="direccion">Dirección*</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className={errors.direccion ? 'error' : ''}
            />
            {errors.direccion && <span className="error-message">{errors.direccion}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="ciudad">Ciudad*</label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                className={errors.ciudad ? 'error' : ''}
              />
              {errors.ciudad && <span className="error-message">{errors.ciudad}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="telefono">Teléfono*</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={errors.telefono ? 'error' : ''}
              />
              {errors.telefono && <span className="error-message">{errors.telefono}</span>}
            </div>
          </div>
          
          <h3>Método de Pago</h3>
          <div className="payment-methods">
            <label className="payment-method">
              <input
                type="radio"
                name="metodoPago"
                value="tarjeta"
                checked={formData.metodoPago === 'tarjeta'}
                onChange={handleChange}
              />
              <span>Tarjeta de Crédito/Débito</span>
            </label>
            
            <label className="payment-method">
              <input
                type="radio"
                name="metodoPago"
                value="transferencia"
                checked={formData.metodoPago === 'transferencia'}
                onChange={handleChange}
              />
              <span>Transferencia Bancaria</span>
            </label>
            
            <label className="payment-method">
              <input
                type="radio"
                name="metodoPago"
                value="contraentrega"
                checked={formData.metodoPago === 'contraentrega'}
                onChange={handleChange}
              />
              <span>Pago Contra Entrega</span>
            </label>
          </div>
          
          <div className="form-group">
            <label htmlFor="comentarios">Comentarios Adicionales</label>
            <textarea
              id="comentarios"
              name="comentarios"
              value={formData.comentarios}
              onChange={handleChange}
              rows="4"
              placeholder="Instrucciones especiales para la entrega, notas sobre tu pedido, etc."
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-submit-order"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
          </button>
        </form>
        
        <div className="order-summary">
          <h3>Resumen del Pedido</h3>
          <div className="order-items">
            {/* Aquí irían los productos del carrito */}
            <div className="order-item">
              <span>Camiseta Dark Skull x1</span>
              <span>$50.000</span>
            </div>
            <div className="order-item">
              <span>Falda Rosa x1</span>
              <span>$80.000</span>
            </div>
          </div>
          
          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>$130.000</span>
            </div>
            <div className="total-row">
              <span>Envío</span>
              <span>$10.000</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>$140.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
  