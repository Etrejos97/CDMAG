import { Link } from 'react-router-dom';
import './Login.css';

/**
 * @component Login
 * @description Componente de página de inicio de sesión para Casa de Modas A.G.
 * Proporciona un formulario con efecto glassmorphism para la autenticación de usuarios.
 * 
 * @version 1.0.0
 * @author CDMAG Team
 * 
 * @example
 * import Login from './pages/Login';
 * 
 * function App() {
 *   return <Login />;
 * }
 */
const Login = () => {
  return (
    <div className="login-container">
      <div className="glass-card-login">
        <h2 className="text-white text-center mb-1 fw-bold">
          CASA DE MODAS A.G
        </h2>
        <p className="text-white text-center mb-4 subtitle">
          SISTEMA INTEGRAL DE GESTIÓN DE INVENTARIO
        </p>

        <form>
          <div className="mb-3">
            <label className="form-label text-white">Usuario</label>
            <input
              type="text"
              className="form-control glass-input"
              placeholder="Ingrese su usuario"
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-white">Contraseña</label>
            <input
              type="password"
              className="form-control glass-input"
              placeholder="Ingrese su contraseña"
            />
          </div>

          <div className="d-grid gap-2 mb-3">
            <button type="button" className="btn btn-purple">
              Iniciar sesión
            </button>
            <button type="button" className="btn btn-purple-outline">
              Registrarse
            </button>
          </div>

          <div className="text-center">
            <Link to="#" className="text-white forgot-password">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
// Exportamos el componente para su uso en otras partes de la aplicación

export default Login;
