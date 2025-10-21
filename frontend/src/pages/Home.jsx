import { Link } from 'react-router-dom';
import './Home.css';

/**
 * @component Home
 * @description Página principal de la aplicación Casa de Modas A.G. Muestra la landing page
 * con información introductoria y botones de acceso principales.
 * 
 * @returns {JSX.Element} Un componente que renderiza la página de inicio
 * con una tarjeta de presentación y botones de acción.
 * 
 * @example
 * import Home from './pages/Home';
 * 
 * function App() {
 *   return <Home />;
 * }
 */
const Home = () => {
  return (
    <div className="home-container">
      <div className="glass-card-home">
        <h1 className="display-4 text-white mb-4 fw-bold">
          CASA DE MODAS A.G
        </h1>
        <p className="lead text-white mb-4">
          Sistema Integral de Gestión de Inventario
        </p>
        <p className="text-white mb-5">
          Administra tu inventario de manera eficiente y profesional. 
          Controla tus productos, ventas y estadísticas en un solo lugar.
        </p>
        <div className="d-grid gap-3 d-md-block">
          <Link to="/login" className="btn btn-light btn-lg px-5 me-md-3">
            Iniciar Sesión
          </Link>
          <button className="btn btn-outline-light btn-lg px-5">
            Conocer Más
          </button>
        </div>
      </div>
    </div>
  );
};



// Exportamos el componente para su uso en otras partes de la aplicación
export default Home;
