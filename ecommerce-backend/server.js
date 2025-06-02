require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet'); // Para seguridad HTTP
const rateLimit = require('express-rate-limit'); // Para limitar peticiones
const morgan = require('morgan'); // Para logging

const app = express();

// 1. Configuración de CORS (Segura para producción)
const allowedOrigins = [
  'https://paradise-store-sena.vercel.app/', // Tu dominio en Vercel
  'http://localhost:3000',          // Desarrollo local
  process.env.FRONTEND_URL          // Variable de entorno opcional
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como aplicaciones móviles o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Habilitar preflight para todas las rutas

// 2. Middlewares de Seguridad y Rendimiento
app.use(helmet()); // Protección contra vulnerabilidades web
app.use(express.json({ limit: '10kb' })); // Límite de tamaño para JSON
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Limitar peticiones (protección contra ataques DDoS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 peticiones por IP
});
app.use('/api', limiter);

// Logging de solicitudes (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 3. Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. Conexión a MongoDB (configuración mejorada)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => {
  console.error('❌ Error de conexión a MongoDB:', err.message);
  process.exit(1); // Salir si no hay conexión a la DB
});

// 5. Manejo de eventos de conexión de MongoDB
mongoose.connection.on('connected', () => {
  console.log('Mongoose conectado a la DB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error en la conexión de Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose desconectado');
});

// 6. Rutas
app.use('/api/productos', require('./routes/products'));

// 7. Ruta de salud (health check)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API funcionando correctamente',
    timestamp: new Date()
  });
});

// 8. Manejo de errores 404
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `No se encontró ${req.originalUrl} en este servidor`
  });
});

// 9. Middleware de manejo de errores global
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

// 10. Iniciar servidor
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

// 11. Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Apagando servidor...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECIBIDO. Apagando servidor correctamente');
  server.close(() => {
    console.log('💥 Proceso terminado');
  });
});