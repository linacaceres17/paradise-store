// routes/products.js
const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const router = express.Router();
const productoController = require('../controllers/productController');
const { check } = require('express-validator');

// Configuración de Multer para guardar las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Las imágenes se guardarán en la carpeta 'uploads'
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

router.route('/')
  .get(productoController.getProductos)
  .post(
    [
      check('nombre').not().isEmpty(),
      check('precio').isNumeric(),
      check('descripcion').isLength({ min: 5 })
    ],
    productoController.crearProducto
  );

router.route('/:id')
  .get(productoController.getProducto)
  .patch(productoController.actualizarProducto)
  .delete(productoController.eliminarProducto);


const upload = multer({ storage: storage })

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (err) {
    console.error('❌ Error al obtener productos:', err);
    res.status(500).json({ error: err.message });
  }
});

// Agregar un nuevo producto (ahora con manejo de imágenes)
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;
    const imagenPath = req.file ? req.file.path : null;

    if (!imagenPath) {
      return res.status(400).json({ error: 'La imagen es requerida' });
    }

    const nuevoProducto = new Product({
      nombre,
      descripcion,
      precio,
      imagen: imagenPath
    });

    const saved = await nuevoProducto.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Error al guardar producto:', err);
    res.status(400).json({ error: err.message });
  }
});

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    // Enviar datos al backend
    const response = await fetch('/api/enviar-pedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Error al enviar el pedido');
    
    setOrderSuccess(true);
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un error al procesar tu pedido. Por favor intenta nuevamente.');
  } finally {
    setIsSubmitting(false);
  }
};

module.exports = router;