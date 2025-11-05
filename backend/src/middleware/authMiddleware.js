import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'tu_clave_secreta_muy_segura_cambiar_en_produccion';

// Middleware para verificar si el token es válido
export const verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado',
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Formato de token inválido',
      });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded;
    next();
  } catch (error) {
    console.error('Error verificando token:', error.message);
    res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
    });
  }
};

// Middleware para verificar si es Administrador
export const esAdmin = (req, res, next) => {
  if (req.usuario?.rol !== 'Administrador') { 
    return res.status(403).json({
      success: false,
      message: 'No tienes permisos de administrador',
    });
  }
  next();
};

// Opcional: Para usuarios regulares
export const esUsuarioOAdmin = (req, res, next) => {
  if (req.usuario?.rol !== 'Usuario' && req.usuario?.rol !== 'Administrador') {
    return res.status(403).json({
      success: false,
      message: 'No autorizado',
    });
  }
  next();
};
