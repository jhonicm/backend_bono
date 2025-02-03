const express = require('express');
const router = express.Router();
const { getBonos, createBono, updateBono, deleteBono, calcularBono } = require('../controllers/bonoController');

router.get('/', getBonos);
router.post('/', createBono);
router.put('/:id', updateBono);
router.delete('/:id', deleteBono);
router.post('/calcular', calcularBono);

module.exports = router;