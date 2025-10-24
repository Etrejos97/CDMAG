import { sql, getConnection } from "../config/db.js";

// Listar productos
export const listarProductos = async () => {
  const pool = await getConnection;
  const result = await pool.request().execute("sp_listar_productos");
  return result.recordset;
};

// Insertar producto
export const insertarProducto = async (producto) => {
  const {
    nombre,
    referencia,
    descripcion,
    precio,
    cantidadStock,
    nivelMinimoStock,
    tipoProducto,
  } = producto;

  const pool = await getConnection;
  await pool
    .request()
    .input("Nombre", sql.VarChar(100), nombre)
    .input("Referencia", sql.VarChar(50), referencia)
    .input("Descripcion", sql.VarChar(500), descripcion)
    .input("Precio", sql.Decimal(10, 2), precio)
    .input("CantidadStock", sql.Int, cantidadStock)
    .input("NivelMinimoStock", sql.Int, nivelMinimoStock)
    .input("TipoProducto", sql.VarChar(20), tipoProducto)
    .execute("sp_insertar_producto");
};

// Editar producto
export const editarProducto = async (producto) => {
  const {
    id,
    nombre,
    referencia,
    descripcion,
    precio,
    cantidadStock,
    nivelMinimoStock,
    tipoProducto,
  } = producto;

  const pool = await getConnection;
  await pool
    .request()
    .input("Id", sql.Int, id)
    .input("Nombre", sql.VarChar(100), nombre)
    .input("Referencia", sql.VarChar(50), referencia)
    .input("Descripcion", sql.VarChar(500), descripcion)
    .input("Precio", sql.Decimal(10, 2), precio)
    .input("CantidadStock", sql.Int, cantidadStock)
    .input("NivelMinimoStock", sql.Int, nivelMinimoStock)
    .input("TipoProducto", sql.VarChar(20), tipoProducto)
    .execute("sp_editar_producto");
};

// Eliminar producto (soft delete)
export const eliminarProducto = async (id) => {
  const pool = await getConnection;
  await pool
    .request()
    .input("Id", sql.Int, id)
    .execute("sp_eliminar_producto");
};
