import { Link } from 'react-router-dom';
import './Home.css';

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

export default Home;
