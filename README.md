Paradise Store - Ecommerce Backend
Node.js
Express
MongoDB

Backend completo para un ecommerce de ropa alternativa, con gestión de productos, carrito de compras y autenticación de usuarios.

🚀 Características Principales
✅ Gestión completa de productos (CRUD)

✅ Subida de imágenes con Multer

✅ Autenticación JWT para usuarios

✅ Carrito de compras persistente

✅ API RESTful bien documentada

✅ Configuración lista para producción

📦 Instalación
Clona el repositorio:

bash
git clone https://github.com/tuusuario/paradise-store-backend.git
cd paradise-store-backend
Instala las dependencias:

bash
npm install
Configura las variables de entorno:

bash
cp .env.example .env
Edita el archivo .env con tus credenciales.

Inicia el servidor en desarrollo:

bash
npm run dev
🔧 Configuración
Variables de Entorno
Variable	Descripción	Ejemplo
MONGODB_URI	URL de conexión a MongoDB	mongodb+srv://user:pass@cluster.mongodb.net/db
PORT	Puerto del servidor	5000
JWT_SECRET	Secreto para tokens JWT	miclavesupersecreta
FRONTEND_URL	URL del frontend para CORS	http://localhost:3000
NODE_ENV	Entorno de ejecución	development o production
Estructura de Archivos
src/
├── controllers/       # Lógica de los controladores
├── models/            # Modelos de MongoDB
├── routes/            # Definición de rutas
├── utils/             # Utilidades y helpers
├── server.js          # Punto de entrada
└── uploads/           # Imágenes subidas (se crea automáticamente)
📚 Documentación de la API
Endpoints Principales
Productos
GET /api/productos - Obtener todos los productos

POST /api/productos - Crear nuevo producto (requiere autenticación)

GET /api/productos/:id - Obtener un producto específico

PATCH /api/productos/:id - Actualizar producto

DELETE /api/productos/:id - Eliminar producto

Autenticación
POST /api/auth/register - Registrar nuevo usuario

POST /api/auth/login - Iniciar sesión

GET /api/auth/me - Obtener información del usuario actual

Carrito
GET /api/carrito - Obtener carrito del usuario

POST /api/carrito - Agregar producto al carrito

DELETE /api/carrito/:id - Eliminar producto del carrito

🛠️ Dependencias Principales
Express: Framework web para Node.js

Mongoose: ODM para MongoDB

Multer: Manejo de uploads de archivos

JWT: Autenticación con JSON Web Tokens

Helmet: Seguridad para Express

CORS: Middleware para Cross-Origin Resource Sharing

🚨 Solución de Problemas
Errores Comunes
Conexión a MongoDB fallida:

Verifica tu MONGODB_URI

Asegúrate que tu IP esté whitelisted en MongoDB Atlas

Problemas con CORS:

Revisa que FRONTEND_URL esté correctamente configurada

Verifica que no haya typos en las URLs permitidas

Error al subir imágenes:

Asegúrate que la carpeta uploads exista y tenga permisos de escritura

Verifica el tamaño máximo de archivo permitido

🌐 Despliegue
En Render.com
Crea un nuevo Web Service

Conecta tu repositorio de GitHub

Configura las variables de entorno

Establece:

Build Command: npm install

Start Command: node server.js

Port: 10000

Variables de Entorno en Producción
Asegúrate de configurar:

NODE_ENV=production
MONGODB_URI=tu_uri_de_produccion
FRONTEND_URL=https://tu-frontend.vercel.app
JWT_SECRET=tu_secreto_seguro
🤝 Contribución
Haz fork del proyecto

Crea tu branch (git checkout -b feature/nueva-funcionalidad)

Haz commit de tus cambios (git commit -m 'Add some feature')

Haz push al branch (git push origin feature/nueva-funcionalidad)

Abre un Pull Request

📄 Licencia
Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.
