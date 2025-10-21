import { Link } from 'react-router-dom';
import './Navbar.css';

/**
 * @component Navbar
 * @description Barra de navegación principal con efecto glassmorphism.
 * Proporciona navegación entre las diferentes secciones de la aplicación.
 * 
 * @version 1.0.0
 * @author CDMAG Team
 * 
 * @example
 * import Navbar from './components/Navbar';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <Navbar />
 *       {Resto del contenido }
 *     </div>
 *   );
 * }
 */
const Navbar = () => {
  return (
    <nav className="navbar-glass navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="/">
          CASA DE MODAS A.G
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Exportamos el componente para su uso en otras partes de la aplicación
export default Navbar;
