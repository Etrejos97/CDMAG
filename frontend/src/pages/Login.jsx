import { Link } from 'react-router-dom';
import './Login.css';

/**
 * @component Login
 * @description Componente de inicio de sesión para Casa de Modas A.G.
 * Proporciona formulario de autenticación con efecto glassmorphism.
 * 
 * @version 2.0.0
 * @author CDMAG Team
 * 
 * @example
 * import Login from './pages/Login';
 * 
 * function App() {
 *   return <Login />
 * }
 */
export default function Login() {
  return (
    <div className="login-container">
      <div className="glass-card-login">
        <h2>CASA DE MODAS A.G</h2>
        <p className="login-subtitle">SISTEMA INTEGRAL DE GESTIÓN DE INVENTARIO</p>

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Ingrese su usuario"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese su contraseña"
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Iniciar sesión
          </button>

          {/* Enlace de contraseña olvidada */}
          <div className="forgot-password">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
