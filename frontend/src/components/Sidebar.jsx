// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import './Sidebar.css';

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  // Menú basado en rol
  const menuItems = {
    Administrador: [
      { path: '/admin/dashboard', label: '📊 Dashboard', icon: '📊' },
      { path: '/admin/usuarios', label: '👥 Gestión Usuarios', icon: '👥' },
      { path: '/admin/productos', label: '📦 Productos', icon: '📦' },
      { path: '/admin/ventas', label: '🛒 Ventas', icon: '🛒' }
    ],
    Usuario: [
      { path: '/user/dashboard', label: '📊 Dashboard', icon: '📊' },
      { path: '/user/productos', label: '📦 Productos', icon: '📦' },
      { path: '/user/ventas', label: '🛒 Ventas', icon: '🛒' }
    ]
  };

  const items = menuItems[user?.rol] || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🏢 CDMAG</h2>
        <p className="user-role">
          {user?.rol === 'Administrador' ? '🔐 Admin' : '👤 Usuario'}
        </p>
      </div>

      <nav className="sidebar-nav">
        {items.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-item ${
              location.pathname === item.path ? 'active' : ''
            }`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>👤 {user?.nombre}</p>
        <p className="email">{user?.correo}</p>
      </div>
    </aside>
  );
}
