import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './Login.css';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasea, setContrasea] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(usuario, contrasea);

      if (result.success) {
        if (result.usuario && result.usuario.rol) {
          if (result.usuario.rol === 'Administrador') {
            navigate('/admin/dashboard');  // ✅ Agregué la /
          } else if (result.usuario.rol === 'Usuario') {
            navigate('/user/dashboard');   // ✅ Agregué la /
          } else {
            navigate('/productos');
          }
        } else {
          console.warn('Usuario no viene en la respuesta, usando fallback a /productos');
          navigate('/productos');
        }
      } else {
        setError(result.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en handleSubmit:', error);
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Por favor contacta al administrador para recuperar tu contraseña');
  };

  return (
    <div className="login-container">
      <div className="glass-card-login">
        <h2>👗 Casa de Modas A.G</h2>
        <p>Sistema de Gestión de Inventario</p>

        {error && (
          <div
            style={{
              color: '#ff6b6b',
              textAlign: 'center',
              marginBottom: '1rem',
              padding: '0.75rem',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
            }}
          >
            ❌ {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usuario">👤 USUARIO</label>
            <input
              type="text"
              id="usuario"
              placeholder="Tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contrasea">🔐 CONTRASEÑA</label>
            <input
              type="password"
              id="contrasea"
              placeholder="Tu contraseña"
              value={contrasea}
              onChange={(e) => setContrasea(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={loading}
          >
            🔓 {loading ? 'Cargando...' : 'INICIAR SESIÓN'}
          </button>
        </form>

        <div className="login-footer">
          <button
            type="button"
            className="btn-forgot-password"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            ❓ ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
}
