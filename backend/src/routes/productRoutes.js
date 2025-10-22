import { Router } from "express";
import {
  getAllP,
  createP,
  updateP,
  deleteP,
} from "../controller/productController.js";

const router = Router();

// Obtener todos los productos
router.get("/listarp", getAllP);
// Crear nuevo producto
router.post("/insertarp", createP);
// Actualizar producto con id
router.put("/editar/:id", updateP);
// Eliminar producto con id
router.delete("/:id", deleteP);

export default router;
