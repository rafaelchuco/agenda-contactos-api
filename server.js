require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const contactsRoutes = require('./routes/contacts');

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/contacts', contactsRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando correctamente' });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});