# 📇 Agenda de Contactos API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Una API RESTful robusta y completa para gestionar contactos con funcionalidades avanzadas**

[🚀 Instalación](#-instalación) • [📚 Documentación](#-documentación-de-la-api) • [🛠️ Uso](#️-uso) • [🧪 Testing](#-testing)

</div>

---

## ✨ Características Principales

### 🔥 **Funcionalidades Core**
- ✅ **CRUD Completo** - Crear, leer, actualizar y eliminar contactos
- 🔍 **Búsqueda Inteligente** - Búsqueda fuzzy por nombre y email
- 📄 **Paginación Avanzada** - Manejo eficiente de grandes volúmenes de datos
- 🔧 **Ordenamiento Flexible** - Ordena por cualquier campo (ASC/DESC)
- 🛡️ **Validaciones Robustas** - Validación de datos en tiempo real

### 🚀 **Características Técnicas**
- 🏗️ **Arquitectura Modular** - Código limpio y escalable
- ⚡ **Alto Rendimiento** - Optimizado para velocidad
- 🔒 **Validación Estricta** - Middleware de validación personalizado
- 🎯 **Manejo de Errores** - Sistema robusto de manejo de errores
- 📊 **Índices de Base de Datos** - Búsquedas optimizadas

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito | Versión |
|------------|-----------|---------|
| **Node.js** | Runtime de JavaScript | 16+ |
| **Express.js** | Framework web minimalista | ^4.18.0 |
| **MongoDB** | Base de datos NoSQL | ^5.0 |
| **Mongoose** | ODM para MongoDB | ^7.0 |
| **Express Validator** | Validación de datos | ^7.0 |

---

## 🚀 Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- MongoDB (v5.0 o superior)
- npm o yarn

### Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/rafaelchuco/agenda-contactos-api.git
cd agenda-contactos-api

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita el archivo .env con tus configuraciones

# 4. Iniciar MongoDB (si es local)
mongod

# 5. Ejecutar en modo desarrollo
npm run dev
```

### 🐳 Docker (Opcional)
```bash
# Ejecutar con Docker Compose
docker-compose up -d
```

---

## ⚙️ Configuración

### Variables de Entorno (.env)
```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de datos
MONGODB_URI=mongodb://localhost:27017/agenda-contactos

# Opcional: Para producción
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/agenda-contactos
```

---

## 📚 Documentación de la API

### Base URL
```
http://localhost:3000/api
```

### 🎯 Endpoints Principales

#### 📋 **Obtener Contactos**
```http
GET /api/contacts
```

**Parámetros de consulta:**
- `search` - Buscar por nombre o email
- `sortBy` - Campo para ordenar (nombre, email, createdAt)
- `order` - Dirección del ordenamiento (asc, desc)
- `page` - Número de página (default: 1)
- `limit` - Contactos por página (default: 10)

**Ejemplo:**
```bash
curl "http://localhost:3000/api/contacts?search=Juan&sortBy=nombre&order=asc&page=1&limit=5"
```

#### 👤 **Obtener Contacto por ID**
```http
GET /api/contacts/:id
```

#### ➕ **Crear Contacto**
```http
POST /api/contacts
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "telefono": "+51987654321",
  "email": "juan@email.com",
  "direccion": "Av. Lima 123",
  "fechaNacimiento": "1990-05-15"
}
```

#### ✏️ **Actualizar Contacto**
```http
PUT /api/contacts/:id
Content-Type: application/json

{
  "nombre": "Juan Carlos Pérez",
  "telefono": "+51987654321",
  "email": "juancarlos@email.com"
}
```

#### 🗑️ **Eliminar Contacto**
```http
DELETE /api/contacts/:id
```

### 📊 **Estructura de Respuesta**

#### ✅ Respuesta Exitosa
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "nombre": "Juan Pérez",
    "telefono": "+51987654321",
    "email": "juan@email.com",
    "direccion": "Av. Lima 123",
    "fechaNacimiento": "1990-05-15T00:00:00.000Z",
    "createdAt": "2023-07-03T10:30:00.000Z",
    "updatedAt": "2023-07-03T10:30:00.000Z"
  }
}
```

#### ❌ Respuesta de Error
```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": [
    {
      "field": "email",
      "message": "Formato de email inválido"
    }
  ]
}
```

---

## 🛠️ Uso

### Ejemplos Prácticos

#### 🔍 **Búsqueda Avanzada**
```bash
# Buscar contactos que contengan "juan" en nombre o email
curl "http://localhost:3000/api/contacts?search=juan"

# Obtener contactos ordenados por fecha de creación (más recientes primero)
curl "http://localhost:3000/api/contacts?sortBy=createdAt&order=desc"

# Paginación: página 2, 5 contactos por página
curl "http://localhost:3000/api/contacts?page=2&limit=5"
```

#### 📝 **Operaciones CRUD**
```bash
# Crear contacto
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana García",
    "telefono": "+51123456789",
    "email": "ana@email.com"
  }'

# Actualizar contacto
curl -X PUT http://localhost:3000/api/contacts/64a1b2c3d4e5f6789abcdef0 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana María García",
    "direccion": "Calle Nueva 456"
  }'

# Eliminar contacto
curl -X DELETE http://localhost:3000/api/contacts/64a1b2c3d4e5f6789abcdef0
```

---

## 🔧 Validaciones

### Campos y Reglas

| Campo | Tipo | Requerido | Validaciones |
|-------|------|-----------|--------------|
| `nombre` | String | ✅ | Máx. 50 caracteres |
| `telefono` | String | ✅ | Formato válido, único |
| `email` | String | ❌ | Formato email válido, único |
| `direccion` | String | ❌ | Máx. 200 caracteres |
| `fechaNacimiento` | Date | ❌ | No puede ser futura |

### Formatos Válidos

```javascript
// Teléfono - Ejemplos válidos:
"+51987654321"
"987654321"
"(01) 234-5678"
"+1-555-123-4567"

// Email - Ejemplos válidos:
"usuario@email.com"
"nombre.apellido@dominio.org"

// Fecha - Formato ISO 8601:
"1990-05-15"
"1990-05-15T10:30:00.000Z"
```

---

## 🧪 Testing

### Ejecutar Tests
```bash
# Tests unitarios
npm test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

### 🔍 **Health Check**
```bash
curl http://localhost:3000/health
```

Respuesta esperada:
```json
{
  "status": "OK",
  "message": "API funcionando correctamente"
}
```

---

## 📁 Estructura del Proyecto

```
agenda-contactos-api/
├── 📁 config/
│   └── database.js          # Configuración de MongoDB
├── 📁 middleware/
│   └── validation.js        # Middleware de validación
├── 📁 models/
│   └── Contact.js          # Modelo de contacto
├── 📁 routes/
│   └── contacts.js         # Rutas de la API
├── 📄 .env                 # Variables de entorno
├── 📄 .gitignore
├── 📄 package.json
├── 📄 README.md
└── 📄 server.js            # Servidor principal
```

---

## 🚀 Despliegue

### Heroku
```bash
# Crear aplicación en Heroku
heroku create agenda-contactos-api

# Configurar variables de entorno
heroku config:set MONGODB_URI=tu_mongodb_uri_aqui

# Desplegar
git push heroku main
```

### Railway
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Desplegar
railway login
railway init
railway up
```

---


## 👨‍💻 Autor

[**Rafael Chuco**](https://github.com/rafaelchuco)
---



<div align="center">

**⭐ ¡Si te gusta este proyecto, dale una estrella! ⭐**

**Hecho con ❤️ y mucho ☕**

</div>