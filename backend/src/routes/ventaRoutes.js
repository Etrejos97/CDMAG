import express from 'express';
import * as ventaController from '../controller/ventaController.js';

const router = express.Router();

router.get('/productos-venta', ventaController.getProductosVenta);
router.get('/buscar-clientes', ventaController.searchClientes);
router.post('/crear-venta', ventaController.createVenta);
router.get('/listar-ventas', ventaController.getVentas);

export default router;
