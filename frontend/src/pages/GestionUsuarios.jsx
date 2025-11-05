import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './GestionUsuarios.css';

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUsuario, setCurrentUsuario] = useState({
    idUsuario: null,
    nombre: '',
    email: '',
    usuario: '',
    rol: 'Usuario',
  });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/usuarios', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsuarios(data.data || data.usuarios || []);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setCurrentUsuario({
      idUsuario: null,
      nombre: '',
      email: '',
      usuario: '',
      rol: 'Usuario',
    });
    setShowModal(true);
  };

  const openEditModal = (usuario) => {
    setIsEditing(true);
    setCurrentUsuario({
      idUsuario: usuario.idUsuario,
      nombre: usuario.nombre,
      email: usuario.email,
      usuario: usuario.usuario,
      rol: usuario.rol,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUsuario({ ...currentUsuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUsuario.nombre || !currentUsuario.email || !currentUsuario.usuario) {
      alert('Por favor completa todos los campos');
      return;
    }

    const token = localStorage.getItem('token');
    const url = isEditing
      ? `http://localhost:3000/usuarios/${currentUsuario.idUsuario}`
      : 'http://localhost:3000/usuarios';
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(currentUsuario),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert(isEditing ? 'Usuario actualizado' : 'Usuario creado');
          fetchUsuarios();
          closeModal();
        } else {
          alert(data.message || 'Error al guardar');
        }
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Error al guardar el usuario');
      });
  };

  const handleDelete = (id, nombre) => {
    if (!window.confirm(`¿Eliminar a ${nombre}?`)) return;

    const token = localStorage.getItem('token');

    fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Usuario eliminado');
          fetchUsuarios();
        }
      })
      .catch(err => console.error('Error:', err));
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '250px' }}>
        <div className="gestion-usuarios-container">
          <div className="glass-card-usuarios">
            <div className="usuarios-header">
              <h1>👥 Gestión de Usuarios</h1>
              <p className="subtitle">Administra los usuarios del sistema</p>
            </div>

            <button className="btn-primary-usuarios" onClick={openCreateModal}>
              ➕ Crear Nuevo Usuario
            </button>

            {loading ? (
              <div className="loading-container">Cargando usuarios...</div>
            ) : usuarios.length === 0 ? (
              <div className="glass-alert">
                <p>No hay usuarios registrados</p>
              </div>
            ) : (
              <table className="table-usuarios">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.idUsuario}>
                      <td>{usuario.idUsuario}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.usuario}</td>
                      <td>
                        <span className={`badge badge-${usuario.rol.toLowerCase()}`}>
                          {usuario.rol}
                        </span>
                      </td>
                      <td className="acciones-cell">
                        <button
                          className="btn-sm btn-edit"
                          onClick={() => openEditModal(usuario)}
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-sm btn-delete"
                          onClick={() => handleDelete(usuario.idUsuario, usuario.nombre)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {showModal && (
              <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content-usuarios" onClick={(e) => e.stopPropagation()}>
                  <h3>{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</h3>

                  <form onSubmit={handleSubmit} className="modal-form">
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre"
                      value={currentUsuario.nombre}
                      onChange={handleInputChange}
                      required
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={currentUsuario.email}
                      onChange={handleInputChange}
                      required
                    />

                    <input
                      type="text"
                      name="usuario"
                      placeholder="Usuario"
                      value={currentUsuario.usuario}
                      onChange={handleInputChange}
                      required
                    />

                    <select
                      name="rol"
                      value={currentUsuario.rol}
                      onChange={handleInputChange}
                    >
                      <option value="Usuario">Usuario</option>
                      <option value="Administrador">Administrador</option>
                    </select>

                    <div className="modal-buttons">
                      <button type="button" onClick={closeModal}>
                        Cancelar
                      </button>
                      <button type="submit">
                        {isEditing ? 'Actualizar' : 'Crear'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
