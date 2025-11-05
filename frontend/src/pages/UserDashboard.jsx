import { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import Sidebar from '../components/Sidebar';
import './UserDashboard.css';

export default function UserDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    ventasHoy: 0,
    totalHoy: 0,
    topProductos: [],
    ultimasVentas: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    // Simulación de datos - En producción vendrían del backend
    setTimeout(() => {
      setStats({
        ventasHoy: 12,
        totalHoy: 2450000,
        topProductos: [
          { nombre: 'Bolso de Cuero Premium', ventas: 8, ingresos: 1599200 },
          { nombre: 'Camiseta Formal Blanca', ventas: 15, ingresos: 1348500 },
          { nombre: 'Pantalón Jean Azul', ventas: 5, ingresos: 649500 },
          { nombre: 'Zapatos Formales', ventas: 4, ingresos: 480000 },
          { nombre: 'Cinturón Cuero', ventas: 3, ingresos: 180000 },
        ],
        ultimasVentas: [
          { id: 1, cliente: 'Juan Pérez', total: 350000, fecha: '2025-11-05 14:30' },
          { id: 2, cliente: 'María García', total: 580000, fecha: '2025-11-05 13:45' },
          { id: 3, cliente: 'Carlos López', total: 1200000, fecha: '2025-11-05 12:15' },
          { id: 4, cliente: 'Ana Martínez', total: 320000, fecha: '2025-11-05 11:30' },
          { id: 5, cliente: 'Pedro González', total: 450000, fecha: '2025-11-05 10:00' },
        ],
      });
      setLoading(false);
    }, 500);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);

  const metaDiaria = 3000000;
  const porcentajeAlcanzado = (stats.totalHoy / metaDiaria) * 100;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '250px' }}>
        <div className="user-dashboard-container">
          {/* Encabezado */}
          <div className="dashboard-header">
            <h1>👔 Dashboard de Vendedor</h1>
            <p>Bienvenido, {user?.nombre}</p>
          </div>

          {/* Grid de estadísticas */}
          <div className="stats-grid">
            {/* Ventas Hoy */}
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <p className="stat-label">Ventas Hoy</p>
                <p className="stat-value">{stats.ventasHoy}</p>
              </div>
            </div>

            {/* Total Ingresos */}
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <p className="stat-label">Ingresos Hoy</p>
                <p className="stat-value">{formatPrice(stats.totalHoy)}</p>
              </div>
            </div>

            {/* Meta */}
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <p className="stat-label">Meta Diaria</p>
                <p className="stat-value">{formatPrice(metaDiaria)}</p>
              </div>
            </div>

            {/* Progreso */}
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <p className="stat-label">Progreso</p>
                <p className="stat-value">{porcentajeAlcanzado.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="progress-container">
            <div className="progress-label">
              <span>Progreso hacia Meta</span>
              <span>{formatPrice(stats.totalHoy)} de {formatPrice(metaDiaria)}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(porcentajeAlcanzado, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Contenedor dos columnas */}
          <div className="dashboard-content">
            {/* Top Productos */}
            <div className="content-section">
              <h3>🏆 Top 5 Productos</h3>
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Ventas</th>
                    <th>Ingresos</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topProductos.map((prod, idx) => (
                    <tr key={idx}>
                      <td>{prod.nombre}</td>
                      <td className="center">{prod.ventas}</td>
                      <td className="right">{formatPrice(prod.ingresos)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Últimas Transacciones */}
            <div className="content-section">
              <h3>🔄 Últimas Transacciones</h3>
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.ultimasVentas.map((venta) => (
                    <tr key={venta.id}>
                      <td>{venta.cliente}</td>
                      <td>{formatPrice(venta.total)}</td>
                      <td className="time">{venta.fecha.split(' ')[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
