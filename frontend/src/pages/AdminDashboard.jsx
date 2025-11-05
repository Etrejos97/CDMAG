// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import Sidebar from '../components/Sidebar';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalProductos: 0,
    totalVentas: 0,
    ingresoMes: 0
  });

  useEffect(() => {
    // TODO: Llamar a endpoints para obtener estadísticas
    // Por ahora datos mock
    setStats({
      totalUsuarios: 25,
      totalProductos: 156,
      totalVentas: 89,
      ingresoMes: 45230000
    });
  }, []);

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      
      <main className="admin-dashboard-main">
        <div className="admin-header">
          <h1>📊 Dashboard Administrativo</h1>
          <p>Bienvenido, {user?.nombre}!</p>
        </div>

        {/* Grid de Estadísticas */}
        <div className="stats-grid">
          <StatCard
            title="👥 Usuarios Activos"
            value={stats.totalUsuarios}
            color="#667eea"
            icon="👥"
          />
          <StatCard
            title="📦 Productos"
            value={stats.totalProductos}
            color="#764ba2"
            icon="📦"
          />
          <StatCard
            title="🛒 Ventas Este Mes"
            value={stats.totalVentas}
            color="#f093fb"
            icon="🛒"
          />
          <StatCard
            title="💰 Ingresos"
            value={`$${(stats.ingresoMes / 1000000).toFixed(1)}M`}
            color="#4ade80"
            icon="💰"
          />
        </div>

        {/* Sección de Acciones Rápidas */}
        <div className="quick-actions">
          <h2>⚡ Acciones Rápidas</h2>
          <div className="actions-grid">
            <ActionButton
              label="Crear Usuario"
              icon="➕"
              onClick={() => console.log('Crear usuario')}
              color="#667eea"
            />
            <ActionButton
              label="Ver Reportes"
              icon="📈"
              onClick={() => console.log('Ver reportes')}
              color="#764ba2"
            />
            <ActionButton
              label="Auditoría"
              icon="📋"
              onClick={() => console.log('Ver auditoría')}
              color="#f093fb"
            />
            <ActionButton
              label="Configuración"
              icon="⚙️"
              onClick={() => console.log('Configuración')}
              color="#4ade80"
            />
          </div>
        </div>

        {/* Resumen Reciente */}
        <div className="recent-section">
          <h2>🕐 Actividad Reciente</h2>
          <div className="activity-list">
            <ActivityItem
              action="Usuario registrado"
              user="Juan Pérez"
              time="hace 2 horas"
            />
            <ActivityItem
              action="Producto agregado"
              user="Sistema"
              time="hace 4 horas"
            />
            <ActivityItem
              action="Venta completada"
              user="María González"
              time="hace 6 horas"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-componentes
function StatCard({ title, value, color, icon }) {
  return (
    <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <p className="stat-title">{title}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}

function ActionButton({ label, icon, onClick, color }) {
  return (
    <button
      className="action-btn"
      onClick={onClick}
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <span className="action-icon">{icon}</span>
      <span className="action-label">{label}</span>
    </button>
  );
}

function ActivityItem({ action, user, time }) {
  return (
    <div className="activity-item">
      <div className="activity-content">
        <p className="activity-action">{action}</p>
        <p className="activity-user">Por: {user}</p>
      </div>
      <p className="activity-time">{time}</p>
    </div>
  );
}
