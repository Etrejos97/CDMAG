// ...existing code...
import express from 'express';
import * as ventaController from '../controller/ventaController.js';

const router = express.Router();

/* Rutas legacy (mantener compatibilidad con lo que ya exista en frontend) */
router.get('/productos-venta', ventaController.getProductosVenta);
router.get('/buscar-clientes', ventaController.searchClientes);
router.post('/crear-venta', ventaController.createVenta);
router.get('/listar-ventas', ventaController.getVentas);

/* Rutas RESTful montadas en /ventas para CRUD directo */
/* Listar ventas (GET /ventas) */
router.get('/', ventaController.getVentas);

/* Crear venta completa (POST /ventas) */
router.post('/', ventaController.createVenta);

/* Obtener venta por id (GET /ventas/:id) */
router.get('/:id', ventaController.obtenerVenta);

/* Actualizar venta (PUT /ventas/:id) - por ahora permite actualizar estadoVenta */
router.put('/:id', ventaController.actualizarVenta);

/* "Eliminar" / cancelar venta (DELETE /ventas/:id) */
router.delete('/:id', ventaController.eliminarVenta);

export default router;