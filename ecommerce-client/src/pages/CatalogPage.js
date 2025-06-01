import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CatalogPage.css';

function CatalogPage() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState(null);
  const [imagenPrevia, setImagenPrevia] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [cantidades, setCantidades] = useState({});

  useEffect(() => {
    fetchData();
    cargarCarrito();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getProducts();
      const productosConImagen = data.map(producto => ({
        ...producto,
        imagen: producto.imagen || 'https://via.placeholder.com/300x300?text=Sin+imagen'
      }));
      setProductos(productosConImagen);
      
      const cantidadesIniciales = {};
      productosConImagen.forEach(producto => {
        cantidadesIniciales[producto._id] = 1;
      });
      setCantidades(cantidadesIniciales);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      setMensaje('❌ Error al cargar productos');
    }
  };

  const cargarCarrito = () => {
    try {
      const carritoGuardado = localStorage.getItem('carrito');
      const carritoParseado = carritoGuardado ? JSON.parse(carritoGuardado) : [];
      setCarrito(carritoParseado);
    } catch (error) {
      console.error('Error al cargar carrito:', error);
      localStorage.removeItem('carrito');
      setCarrito([]);
    }
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPrevia(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');
    
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);
      formData.append('precio', precio);
      if (imagen) {
        formData.append('imagen', imagen);
      }

      await axios.post('http://localhost:5000/api/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMensaje('✅ Producto agregado correctamente');
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setImagen(null);
      setImagenPrevia('');
      fetchData();
    } catch (error) {
      console.error('Error al agregar producto:', error);
      setMensaje('❌ Error al agregar producto');
    } finally {
      setCargando(false);
    }
  };

  const handleCambiarCantidad = (productoId, nuevaCantidad) => {
    const cantidad = Math.max(1, nuevaCantidad);
    setCantidades(prev => ({
      ...prev,
      [productoId]: cantidad
    }));
  };

  const handleAgregarAlCarrito = (producto) => {
    try {
      const cantidad = cantidades[producto._id] || 1;
      const productoConCantidad = {
        ...producto,
        cantidad,
        subtotal: producto.precio * cantidad
      };

      const carritoActual = [...carrito];
      const indiceExistente = carritoActual.findIndex(item => item._id === producto._id);

      if (indiceExistente >= 0) {
        carritoActual[indiceExistente] = productoConCantidad;
      } else {
        carritoActual.push(productoConCantidad);
      }

      localStorage.setItem('carrito', JSON.stringify(carritoActual));
      setCarrito(carritoActual);
      alert(`${cantidad} ${producto.nombre} agregado(s) al carrito`);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Error al agregar al carrito');
    }
  };

  const verCarrito = () => {
    navigate('/cart');
  };

  return (
    <div className="catalog-container">
      <div className="header-with-cart">
        <h1 className="catalog-title">Catálogo de Productos</h1>
        <button onClick={verCarrito} className="cart-button">
          🛒 Ver Carrito ({carrito.reduce((total, item) => total + (item.cantidad || 1), 0)})
        </button>
      </div>

      <div className="add-product-section">
        <h2 className="section-title">Agregar Nuevo Producto</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-input"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              rows="3"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-input"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label className="file-upload-label">
              {imagen ? 'Imagen seleccionada' : 'Seleccionar imagen (JPG/PNG)'}
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImagenChange}
                className="file-upload-input"
                required
              />
            </label>
            {imagenPrevia && (
              <div className="image-preview">
                <img src={imagenPrevia} alt="Vista previa" className="preview-image" />
                <button 
                  type="button" 
                  className="remove-image-button"
                  onClick={() => {
                    setImagen(null);
                    setImagenPrevia('');
                  }}
                >
                  Eliminar imagen
                </button>
              </div>
            )}
          </div>
          <button type="submit" className="submit-button" disabled={cargando}>
            {cargando ? 'Agregando...' : 'Agregar Producto'}
          </button>
          {mensaje && <p className={`message ${mensaje.includes('✅') ? 'success' : 'error'}`}>{mensaje}</p>}
        </form>
      </div>

      <div className="products-grid">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto._id} className="product-card">
              <div className="product-image-container">
                <img 
                  src={producto.imagen.includes('http') ? producto.imagen : `http://localhost:5000/${producto.imagen.replace(/\\/g, '/')}`}
                  alt={producto.nombre}
                  className="product-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=Imagen+no+disponible';
                  }}
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{producto.nombre}</h3>
                <p className="product-description">{producto.descripcion}</p>
                <p className="product-price">${parseFloat(producto.precio).toLocaleString()}</p>
                
                <div className="quantity-selector">
                  <button 
                    onClick={() => handleCambiarCantidad(producto._id, (cantidades[producto._id] || 1) - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={cantidades[producto._id] || 1}
                    onChange={(e) => handleCambiarCantidad(producto._id, parseInt(e.target.value))}
                    className="quantity-input"
                  />
                  <button 
                    onClick={() => handleCambiarCantidad(producto._id, (cantidades[producto._id] || 1) + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => handleAgregarAlCarrito(producto)}
                  className="add-to-cart-button"
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
}

export default CatalogPage;