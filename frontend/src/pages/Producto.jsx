// ...existing code...
import { useState, useEffect } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/productoService.js';
import './Producto.css';

export default function Producto() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProducto, setCurrentProducto] = useState({
    idProducto: null,
    nombre: '',
    referencia: '',
    descripcion: '',
    precio: '',
    cantidadStock: '',
    nivelMinimoStock: 10,
    tipoProducto: 'Ropa'
  });

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = () => {
    setLoading(true);
    setError('');
    const onSuccess = (lista) => {
      setProductos(lista);
      setLoading(false);
    };
    const onError = (error) => {
      setError('Error al cargar los productos');
      console.error('Error:', error);
      setLoading(false);
    };
    getProductos(onSuccess, onError);
  };

  const handleCreate = () => {
    const onSuccess = (response) => {
      console.log('Producto creado:', response);
      fetchProductos();
      closeModal();
      alert('✅ Producto creado exitosamente');
    };
    const onError = (error) => {
      console.error('Error al crear:', error);
      alert('❌ Error al crear el producto');
    };
    createProducto(currentProducto, onSuccess, onError);
  };

  const handleUpdate = () => {
    const onSuccess = (response) => {
      console.log('Producto actualizado:', response);
      fetchProductos();
      closeModal();
      alert('✅ Producto actualizado exitosamente');
    };
    const onError = (error) => {
      console.error('Error al actualizar:', error);
      alert('❌ Error al actualizar el producto');
    };
    updateProducto(currentProducto.idProducto, currentProducto, onSuccess, onError);
  };

  const handleDelete = (id, nombre) => {
    const confirmar = window.confirm(`¿Estás seguro de eliminar "${nombre}"?`);
    if (confirmar) {
      const onSuccess = (response) => {
        console.log('Producto eliminado:', response);
        fetchProductos();
        alert('✅ Producto eliminado exitosamente');
      };
      const onError = (error) => {
        console.error('Error al eliminar:', error);
        alert('❌ Error al eliminar el producto');
      };
      deleteProducto(id, onSuccess, onError);
    }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setCurrentProducto({
      idProducto: null,
      nombre: '',
      referencia: '',
      descripcion: '',
      precio: '',
      cantidadStock: '',
      nivelMinimoStock: 10,
      tipoProducto: 'Ropa'
    });
    setShowModal(true);
  };

  const openEditModal = (producto) => {
    setIsEditing(true);
    setCurrentProducto({
      idProducto: producto.idProducto,
      nombre: producto.nombre,
      referencia: producto.referencia,
      descripcion: producto.descripcion || '',
      precio: producto.precio,
      cantidadStock: producto.cantidadStock,
      nivelMinimoStock: producto.nivelMinimoStock,
      tipoProducto: producto.tipoProducto
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentProducto({
      idProducto: null,
      nombre: '',
      referencia: '',
      descripcion: '',
      precio: '',
      cantidadStock: '',
      nivelMinimoStock: 10,
      tipoProducto: 'Ropa'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProducto({ ...currentProducto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentProducto.nombre || !currentProducto.referencia || !currentProducto.precio) {
      alert('⚠️ Por favor completa los campos requeridos');
      return;
    }
    if (isEditing) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="producto-container">
      <div className="glass-card-producto">
        <div className="producto-header">
          <h1>📦 Gestión de Productos</h1>
          <p className="subtitle">Casa de Modas A.G - Administra tu inventario</p>
        </div>

        <div className="producto-actions">
          <button className="btn-primary-producto" onClick={openCreateModal}>
            ➕ Crear Nuevo Producto
          </button>
        </div>

        {error && <div className="glass-alert">{error}</div>}

        {loading ? (
          <div className="loading-container">Cargando productos...</div>
        ) : productos.length === 0 ? (
          <div className="glass-alert">
            <p>📦 No hay productos registrados</p>
            <p>Haz clic en "Crear Nuevo Producto" para comenzar</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table-glass">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Referencia</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.idProducto}>
                    <td>{prod.idProducto}</td>
                    <td>{prod.nombre}</td>
                    <td>{prod.referencia}</td>
                    <td>{formatPrice(prod.precio)}</td>
                    <td>{prod.cantidadStock}</td>
                    <td>{prod.tipoProducto}</td>
                    <td>{formatDate(prod.fechaRegistro)}</td>
                    <td className="acciones-cell">
                      <button className="btn-sm btn-edit" onClick={() => openEditModal(prod)}>
                        ✏️
                      </button>
                      <button className="btn-sm btn-delete" onClick={() => handleDelete(prod.idProducto, prod.nombre)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content-producto" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-producto">
                <h3>{isEditing ? '✏️ Editar Producto' : '➕ Crear Nuevo Producto'}</h3>
                <button className="btn-close-modal" onClick={closeModal}>✕</button>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group-modal">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={currentProducto.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-modal">
                  <label htmlFor="referencia">Referencia *</label>
                  <input
                    type="text"
                    id="referencia"
                    name="referencia"
                    value={currentProducto.referencia}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-modal">
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={currentProducto.descripcion}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group-modal">
                    <label htmlFor="precio">Precio *</label>
                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      value={currentProducto.precio}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group-modal">
                    <label htmlFor="cantidadStock">Stock *</label>
                    <input
                      type="number"
                      id="cantidadStock"
                      name="cantidadStock"
                      value={currentProducto.cantidadStock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group-modal">
                    <label htmlFor="nivelMinimoStock">Stock Mínimo</label>
                    <input
                      type="number"
                      id="nivelMinimoStock"
                      name="nivelMinimoStock"
                      value={currentProducto.nivelMinimoStock}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group-modal">
                  <label htmlFor="tipoProducto">Tipo de Producto</label>
                  <select
                    id="tipoProducto"
                    name="tipoProducto"
                    value={currentProducto.tipoProducto}
                    onChange={handleInputChange}
                  >
                    <option value="Ropa">Ropa</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Calzado">Calzado</option>
                    <option value="Bolsas">Bolsas</option>
                  </select>
                </div>

                <div className="modal-buttons">
                  <button type="button" className="btn-cancel" onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-save">
                    {isEditing ? 'Actualizar' : 'Crear'} Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}