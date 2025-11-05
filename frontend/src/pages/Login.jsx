import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './Login.css';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(usuario, contraseña);
      if (result.success) {
        navigate('/productos');
      } else {
        setError(result.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error:', error);
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
        <h2>Casa de Modas A.G</h2>
        <p>Sistema de Gestión de Inventario</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div style={{ color: '#ff6b6b', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              placeholder="Tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              placeholder="Tu contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={loading}
          >
            {loading ? 'Cargando...' : '✓ INICIAR SESIÓN'}
          </button>
        </form>

        <div className="login-footer">
          <button
            type="button"
            className="btn-forgot-password"
            onClick={handleForgotPassword}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
}
