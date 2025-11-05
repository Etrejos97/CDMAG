import { getConnection, sql } from '../config/db.js';

class UsuarioModel {

  // ✅ NUEVO MÉTODO PARA OPCIÓN 1 - LOGIN CON USUARIO O CORREO
  static async obtenerPorUsuarioOCorreo(usuarioOCorreo, contraseña) {
    try {
      const pool = await getConnection;
      const request = pool.request();
      request.input('usuarioOCorreo', sql.VarChar, usuarioOCorreo);
      request.input('contraseña', sql.VarChar, contraseña);
      
      const result = await request.query(`
        SELECT idUsuario, nombre, usuario, correo, rol, estado
        FROM Usuario
        WHERE (usuario = @usuarioOCorreo OR correo = @usuarioOCorreo) 
        AND contraseña = @contraseña 
        AND estado = 1
      `);
      
      return result.recordset[0] || null;
    } catch (error) {
      console.error('Error en obtenerPorUsuarioOCorreo:', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const pool = await getConnection;
      const request = pool.request();
      const result = await request.query(`
        SELECT idUsuario, nombre, email, rol, estado, numeroTelefono, cedula, direccion
        FROM Usuario
        ORDER BY nombre ASC
      `);
      return result.recordset;
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  static async crear(nombre, email, password, rol = 'usuario', cedula = null, numeroTelefono = null) {
    try {
      const pool = await getConnection;
      const request = pool.request();
      request.input('nombre', sql.VarChar, nombre);
      request.input('email', sql.VarChar, email);
      request.input('password', sql.VarChar, password);
      request.input('rol', sql.VarChar, rol);
      request.input('cedula', sql.VarChar, cedula);
      request.input('numeroTelefono', sql.VarChar, numeroTelefono);
      
      const result = await request.query(`
        INSERT INTO Usuario (nombre, email, contraseña, rol, estado, cedula, numeroTelefono, confirmacion)
        VALUES (@nombre, @email, @password, @rol, 1, @cedula, @numeroTelefono, 'si')
        SELECT idUsuario, nombre, email, rol, estado
        FROM Usuario
        WHERE email = @email
      `);
      return result.recordset[0];
    } catch (error) {
      console.error('Error en crear usuario:', error);
      throw error;
    }
  }

  static async actualizar(idUsuario, nombre, email, rol, estado, numeroTelefono = null) {
    try {
      const pool = await getConnection;
      const request = pool.request();
      request.input('idUsuario', sql.Int, idUsuario);
      request.input('nombre', sql.VarChar, nombre);
      request.input('email', sql.VarChar, email);
      request.input('rol', sql.VarChar, rol);
      request.input('estado', sql.Bit, estado === 1 || estado === true ? 1 : 0);
      request.input('numeroTelefono', sql.VarChar, numeroTelefono);
      
      await request.query(`
        UPDATE Usuario
        SET nombre = @nombre, email = @email, rol = @rol, estado = @estado, numeroTelefono = @numeroTelefono
        WHERE idUsuario = @idUsuario
      `);
      return { success: true, message: 'Usuario actualizado' };
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  static async eliminar(idUsuario) {
    try {
      const pool = await getConnection;
      const request = pool.request();
      request.input('idUsuario', sql.Int, idUsuario);
      
      await request.query('DELETE FROM Usuario WHERE idUsuario = @idUsuario');
      return { success: true, message: 'Usuario eliminado' };
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }

  static async obtenerPorId(idUsuario) {
    try {
      const pool = await getConnection;
      const request = pool.request();
      request.input('idUsuario', sql.Int, idUsuario);
      
      const result = await request.query(`
        SELECT idUsuario, nombre, email, rol, estado, numeroTelefono, cedula, direccion
        FROM Usuario
        WHERE idUsuario = @idUsuario
      `);
      return result.recordset[0] || null;
    } catch (error) {
      console.error('Error en obtenerPorId:', error);
      throw error;
    }
  }
}

export default UsuarioModel;
