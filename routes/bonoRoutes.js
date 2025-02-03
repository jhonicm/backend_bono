const express = require('express');
const router = express.Router();
const bonoController = require('../controllers/bonoController');

router.get('/', bonoController.getBonos);
router.post('/', bonoController.createBono);
router.put('/:id', bonoController.updateBono);
router.delete('/:id', bonoController.deleteBono);
router.post('/calcular', bonoController.calcularBonoHandler);

module.exports = router;