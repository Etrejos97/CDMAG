import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="glass-card-home">
        <h1>CASA DE MODAS A.G</h1>
        <p className="subtitle">Sistema Integral de Gestión de Inventario</p>

        <p className="description">
          Administra tu inventario de manera eficiente y profesional. 
          Controla tus productos, ventas y estadísticas en un solo lugar.
        </p>

        <div className="home-buttons">
          <Link to="/login" className="btn-primary-home">
            INICIAR SESIÓN
          </Link>
          <button className="btn-secondary-home">
            CONOCER MÁS
          </button>
        </div>
      </div>
    </div>
  );
}
