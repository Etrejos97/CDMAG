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
    console.error("Error en getAllP:", error);
    res.status(500).json({ 
      success: false,
      message: "Error al obtener productos",
      error: error.message 
    });
  }
};

// Controlador para insertar producto
export const createP = async (req, res) => {
  try {
    const { nombre, referencia, precio, cantidadStock, tipoProducto } = req.body;

    // Validaciones
    if (!nombre || !referencia || !precio || !tipoProducto) {
      return res.status(400).json({ 
        success: false,
        message: "Faltan campos requeridos" 
      });
    }

    if (precio < 0 || cantidadStock < 0) {
      return res.status(400).json({ 
        success: false,
        message: "Precio y stock deben ser positivos" 
      });
    }

    if (!["Ropa", "Accesorio"].includes(tipoProducto)) {
      return res.status(400).json({ 
        success: false,
        message: "Tipo de producto inválido" 
      });
    }

    await insertarProducto(req.body);
    res.status(201).json({ 
      success: true,
      message: "Producto creado exitosamente" 
    });
  } catch (error) {
    console.error("Error en createP:", error);
    res.status(500).json({ 
      success: false,
      message: "Error al crear producto",
      error: error.message 
    });
  }
};

// Controlador para editar producto
export const updateP = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        message: "ID inválido" 
      });
    }

    const producto = { id, ...req.body };
    await editarProducto(producto);
    res.json({ 
      success: true,
      message: "Producto actualizado exitosamente" 
    });
  } catch (error) {
    console.error("Error en updateP:", error);
    res.status(500).json({ 
      success: false,
      message: "Error al actualizar producto",
      error: error.message 
    });
  }
};

// Controlador para eliminar producto
export const deleteP = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        message: "ID inválido" 
      });
    }

    await eliminarProducto(id);
    res.json({ 
      success: true,
      message: "Producto eliminado exitosamente" 
    });
  } catch (error) {
    console.error("Error en deleteP:", error);
    res.status(500).json({ 
      success: false,
      message: "Error al eliminar producto",
      error: error.message 
    });
  }
};
