import {
  listarProductos,
  insertarProducto,
  editarProducto,
  eliminarProducto,
} from "../model/productModel.js";

// Controlador para listar productos
export const getAllP = async (req, res) => {
  try {
    const productos = await listarProductos();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// Controlador para insertar producto
export const createP = async (req, res) => {
  try {
    const producto = req.body;
    await insertarProducto(producto);
    res.status(201).json({ message: "Producto creado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

// Controlador para editar producto
export const updateP = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const producto = { id, ...req.body };
    await editarProducto(producto);
    res.json({ message: "Producto actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

// Controlador para eliminar producto
export const deleteP = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await eliminarProducto(id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};
