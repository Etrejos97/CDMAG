// src/model/usuarioModel.js - VERSIÓN CORRECTA FINAL
import { getConnection, sql } from '../config/db.js';

class UsuarioModel {
  // ✅ Login - Versión CORRECTA basada en script real
  static async obtenerPorUsuarioOCorreo(usuarioOCorreo, contrasea) {
    try {
      const pool = await getConnection;
      const request = pool.request();

      request.input('usuarioOCorreo', sql.VarChar, usuarioOCorreo);
      request.input('contrasea', sql.VarChar, contrasea);

      // ✅ Query correcta según el script
      const result = await request.query(`
        SELECT TOP 1 
          idUsuario, 
          nombre, 
          usuario, 
          correo, 
          cedula,
          rol, 
          estado
        FROM Usuario
        WHERE estado = 1
          AND (usuario = @usuarioOCorreo OR correo = @usuarioOCorreo)
          AND contraseña = @contrasea
      `);

      console.log('✅ Query login ejecutada, resultados:', result.recordset.length);
      
      return result.recordset[0] || null;
    } catch (error) {
      console.error('❌ Error en obtenerPorUsuarioOCorreo:', error.message);
      throw error;
    }
  }

  // Listar todos los usuarios
  static async obtenerTodos() {
    try {
      const pool = await getConnection;
      const request = pool.request();

      const result = await request.query(`
        SELECT idUsuario, nombre, usuario, correo, cedula, numeroTelefono, rol, estado
        FROM Usuario
        WHERE estado = 1
        ORDER BY nombre ASC
      `);

      return result.recordset;
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  // Crear nuevo usuario
  static async crear(nombre, correo, contrasea, rol, usuario = null, cedula = null, numeroTelefono = null) {
    try {
      const pool = await getConnection;
      const request = pool.request();

      request.input('nombre', sql.VarChar, nombre);
      request.input('correo', sql.VarChar, correo);
      request.input('contrasea', sql.VarChar, contrasea);
      request.input('rol', sql.VarChar, rol);
      request.input('usuario', sql.VarChar, usuario || correo);
      request.input('cedula', sql.VarChar, cedula);
      request.input('numeroTelefono', sql.VarChar, numeroTelefono);
      request.input('edad', sql.Int, 25); // Valor por defecto

      const result = await request.query(`
        INSERT INTO Usuario (nombre, usuario, correo, contraseña, rol, cedula, numeroTelefono, edad, estado, fechaRegistro)
        VALUES (@nombre, @usuario, @correo, @contrasea, @rol, @cedula, @numeroTelefono, @edad, 1, GETDATE())

        SELECT idUsuario, nombre, usuario, correo, rol, estado
        FROM Usuario
        WHERE correo = @correo
      `);

      return result.recordset[0];
    } catch (error) {
      console.error('Error en crear usuario:', error);
      throw error;
    }
  }

  // Actualizar usuario
  static async actualizar(idUsuario, nombre, correo, rol, estado = 1, numeroTelefono = null, cedula = null) {
    try {
      const pool = await getConnection;
      const request = pool.request();

      request.input('idUsuario', sql.Int, idUsuario);
      request.input('nombre', sql.VarChar, nombre);
      request.input('correo', sql.VarChar, correo);
      request.input('rol', sql.VarChar, rol);
      request.input('estado', sql.Bit, estado === 1 || estado === true ? 1 : 0);
      request.input('numeroTelefono', sql.VarChar, numeroTelefono);
      request.input('cedula', sql.VarChar, cedula);

      await request.query(`
        UPDATE Usuario
        SET 
          nombre = @nombre, 
          correo = @correo, 
          rol = @rol, 
          estado = @estado,
          numeroTelefono = @numeroTelefono,
          cedula = @cedula
        WHERE idUsuario = @idUsuario
      `);

      return { success: true, message: 'Usuario actualizado' };
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  // Eliminar usuario (Soft Delete)
  static async eliminar(idUsuario) {
    try {
      const pool = await getConnection;
      const request = pool.request();

      request.input('idUsuario', sql.Int, idUsuario);

      await request.query(`
        UPDATE Usuario
        SET estado = 0
        WHERE idUsuario = @idUsuario
      `);

      return { success: true, message: 'Usuario eliminado' };
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }

  // Obtener usuario por ID
  static async obtenerPorId(idUsuario) {
    try {
      const pool = await getConnection;
      const request = pool.request();

      request.input('idUsuario', sql.Int, idUsuario);

      const result = await request.query(`
        SELECT idUsuario, nombre, usuario, correo, cedula, numeroTelefono, rol, estado
        FROM Usuario
        WHERE idUsuario = @idUsuario
          AND estado = 1
      `);

      return result.recordset[0] || null;
    } catch (error) {
      console.error('Error en obtenerPorId:', error);
      throw error;
    }
  }
}

export default UsuarioModel;
