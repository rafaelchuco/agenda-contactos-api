const express = require('express');
const Contact = require('../models/Contact');
const { validateContact, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Obtener  contactos
router.get('/', async (req, res) => {
  try {
    const { search, sortBy = 'nombre', order = 'asc', page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const sortOrder = order === 'desc' ? -1 : 1;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const contacts = await Contact.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Contact.countDocuments(query);
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener contactos',
      error: error.message
    });
  }
});

// Obtener contacto por ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de contacto inválido'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al obtener contacto',
      error: error.message
    });
  }
});

// Crear contacto
router.post('/', validateContact, handleValidationErrors, async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    
    res.status(201).json({
      success: true,
      message: 'Contacto creado exitosamente',
      data: contact
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `El ${field} ya existe`
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al crear contacto',
      error: error.message
    });
  }
});

// Actualizar contacto
router.put('/:id', validateContact, handleValidationErrors, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Contacto actualizado exitosamente',
      data: contact
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de contacto inválido'
      });
    }
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `El ${field} ya existe`
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al actualizar contacto',
      error: error.message
    });
  }
});

// Eliminar contacto
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contacto no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Contacto eliminado exitosamente'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de contacto inválido'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al eliminar contacto',
      error: error.message
    });
  }
});

module.exports = router;