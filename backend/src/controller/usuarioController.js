import UsuarioModel from '../model/usuarioModel.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'tu_clave_secreta_muy_segura_cambiar_en_produccion';

// ✅ LOGIN ACTUALIZADO PARA OPCIÓN 1
export const login = async (req, res) => {
  try {
    const { usuarioOCorreo, contraseña } = req.body;

    if (!usuarioOCorreo || !contraseña) {
      return res.status(400).json({
        success: false,
        message: 'Usuario/Correo y contraseña son requeridos',
      });
    }

    // ✅ CAMBIO AQUÍ - Usar el nuevo método
    const usuario = await UsuarioModel.obtenerPorUsuarioOCorreo(usuarioOCorreo, contraseña);

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    const token = jwt.sign(
      { idUsuario: usuario.idUsuario, usuario: usuario.usuario, rol: usuario.rol },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      usuario: {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        usuario: usuario.usuario,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      token,
    });
  } catch (error) {
    console.error('Error en login:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
    });
  }
};

// Registro (sin cambios)
export const registro = async (req, res) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;
    if (!nombre || !email || !contraseña) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, email y contraseña son requeridos',
      });
    }

    const usuarioExistente = await UsuarioModel.findByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado',
      });
    }

    const nuevoUsuario = await UsuarioModel.create({
      nombre,
      email,
      contraseña,
      rol: rol || 'Usuario',
    });

    const token = jwt.sign(
      { idUsuario: nuevoUsuario.idUsuario, email: nuevoUsuario.email, rol: nuevoUsuario.rol },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      usuario: {
        idUsuario: nuevoUsuario.idUsuario,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      },
      token,
    });
  } catch (error) {
    console.error('Error en registro:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario',
    });
  }
};

// Obtener todos (sin cambios)
export const obtenerTodos = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.obtenerTodos();
    res.json({
      success: true,
      data: usuarios,
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
    });
  }
};

// Crear (sin cambios)
export const crear = async (req, res) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;
    const nuevoUsuario = await UsuarioModel.crear(nombre, email, contraseña, rol || 'Usuario');
    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: nuevoUsuario,
    });
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al crear usuario',
    });
  }
};

// Actualizar (sin cambios)
export const actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, rol, estado, numeroTelefono } = req.body;
    const resultado = await UsuarioModel.actualizar(id, nombre, email, rol, estado, numeroTelefono);
    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: resultado,
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar usuario',
    });
  }
};

// Eliminar (sin cambios)
export const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    await UsuarioModel.eliminar(id);
    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente',
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
    });
  }
};
