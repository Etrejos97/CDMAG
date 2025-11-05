import express from 'express';
import * as UsuarioController from '../controller/usuarioController.js'; 
import { verificarToken, esAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.post('/login', UsuarioController.login);
router.post('/registro', UsuarioController.registro);

// Rutas protegidas - Solo Admin
router.get('/', verificarToken, esAdmin, UsuarioController.obtenerTodos);
router.post('/', verificarToken, esAdmin, UsuarioController.crear);
router.put('/:id', verificarToken, esAdmin, UsuarioController.actualizar);
router.delete('/:id', verificarToken, esAdmin, UsuarioController.eliminar);

export default router;
