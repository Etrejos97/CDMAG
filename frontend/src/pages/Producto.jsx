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
    setCurrentProducto({
      ...currentProducto,
      [name]: value
    });
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
          <h1>Gestión de Productos</h1>
          <p className="subtitle">Casa de Modas A.G</p>
        </div>

        <div className="producto-actions">
          <button className="btn btn-primary-producto" onClick={openCreateModal}>
            Agregar Producto
          </button>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando productos...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger glass-alert" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-glass">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>REFERENCIA</th>
                  <th>PRECIO</th>
                  <th>STOCK</th>
                  <th>TIPO</th>
                  <th>FECHA</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <p className="text-muted">No hay productos registrados</p>
                    </td>
                  </tr>
                ) : (
                  productos.map((prod) => (
                    <tr key={prod.idProducto}>
                      <td>{prod.idProducto}</td>
                      <td className="fw-bold">{prod.nombre}</td>
                      <td>
                        <span className="badge bg-secondary">{prod.referencia}</span>
                      </td>
                      <td className="text-end">{formatPrice(prod.precio)}</td>
                      <td>
                        <span className={`badge ${
                          prod.cantidadStock <= prod.nivelMinimoStock 
                            ? 'bg-danger' 
                            : 'bg-success'
                        }`}>
                          {prod.cantidadStock}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          prod.tipoProducto === 'Ropa' ? 'bg-info' : 'bg-warning'
                        }`}>
                          {prod.tipoProducto}
                        </span>
                      </td>
                      <td>{formatDate(prod.fechaRegistro)}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button 
                            className="btn btn-sm btn-outline-light"
                            title="Editar"
                            onClick={() => openEditModal(prod)}
                          >
                            ✏️
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar"
                            onClick={() => handleDelete(prod.idProducto, prod.nombre)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content-producto" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header-producto">
              <h3>{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h3>
              <button className="btn-close-modal" onClick={closeModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              
              <div className="form-row">
                <div className="form-group-modal">
                  <label>Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={currentProducto.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej: Camisa Formal"
                    required
                  />
                </div>

                <div className="form-group-modal">
                  <label>Referencia *</label>
                  <input
                    type="text"
                    name="referencia"
                    value={currentProducto.referencia}
                    onChange={handleInputChange}
                    placeholder="Ejemplo: CAM-001"
                    required
                  />
                </div>
              </div>

              <div className="form-group-modal">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={currentProducto.descripcion}
                  onChange={handleInputChange}
                  placeholder="Descripción del producto"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group-modal">
                  <label>Precio *</label>
                  <input
                    type="number"
                    name="precio"
                    value={currentProducto.precio}
                    onChange={handleInputChange}
                    placeholder="Ej: 50000"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group-modal">
                  <label>Existencias</label>
                  <input
                    type="number"
                    name="cantidadStock"
                    value={currentProducto.cantidadStock}
                    onChange={handleInputChange}
                    placeholder="Ej: 50"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group-modal">
                  <label>Nivel Mínimo</label>
                  <input
                    type="number"
                    name="nivelMinimoStock"
                    value={currentProducto.nivelMinimoStock}
                    onChange={handleInputChange}
                    placeholder="Ej: 10"
                    min="0"
                  />
                </div>

                <div className="form-group-modal">
                  <label>Tipo *</label>
                  <select
                    name="tipoProducto"
                    value={currentProducto.tipoProducto}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Ropa">Ropa</option>
                    <option value="Accesorio">Accesorio</option>
                  </select>
                </div>
              </div>

              <div className="modal-buttons">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  {isEditing ? 'Actualizar' : 'Guardar'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
