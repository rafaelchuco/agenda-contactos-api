const { body, validationResult } = require('express-validator');

const validateContact = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ max: 50 })
    .withMessage('El nombre no puede exceder 50 caracteres'),
  
  body('telefono')
    .trim()
    .notEmpty()
    .withMessage('El teléfono es requerido')
    .matches(/^\+?[\d\s\-\(\)]{8,15}$/)
    .withMessage('Formato de teléfono inválido'),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Formato de email inválido')
    .normalizeEmail(),
  
  body('direccion')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('La dirección no puede exceder 200 caracteres'),
  
  body('fechaNacimiento')
    .optional()
    .isISO8601()
    .withMessage('Formato de fecha inválido')
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error('La fecha de nacimiento no puede ser futura');
      }
      return true;
    })
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateContact,
  handleValidationErrors
};