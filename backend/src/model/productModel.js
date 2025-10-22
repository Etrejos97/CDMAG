import { sql, getConnection } from "../config/db.js";

// Listar productos
export const listarProductos = async () => {
  const pool = await getConnection;
  const result = await pool.request().execute("sp_listar_productos");
  return result.recordset;
};

// Insertar producto
export const insertarProducto = async (producto) => {
  const { nombre, descripcion, precio, stock, categoria_id } = producto;
  const pool = await getConnection;
  await pool
    .request()
    .input("Nombre", sql.VarChar, nombre)
    .input("Descripcion", sql.VarChar, descripcion)
    .input("Precio", sql.Float, precio)
    .input("Stock", sql.Int, stock)
    .input("Categoria_id", sql.Int, categoria_id)
    .execute("sp_insertar_producto");
};

// Editar producto
export const editarProducto = async (producto) => {
  const { id, nombre, descripcion, precio, stock, categoria_id } = producto;
  const pool = await getConnection;
  await pool
    .request()
    .input("Id", sql.Int, id)
    .input("Nombre", sql.VarChar, nombre)
    .input("Descripcion", sql.VarChar, descripcion)
    .input("Precio", sql.Float, precio)
    .input("Stock", sql.Int, stock)
    .input("Categoria_id", sql.Int, categoria_id)
    .execute("sp_editar_producto");
};

// Eliminar producto
export const eliminarProducto = async (id) => {
  const pool = await getConnection;
  await pool.request().input("Id", sql.Int, id).execute("sp_eliminar_producto");
};
