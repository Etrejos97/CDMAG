import { useState, useEffect } from 'react';
import { getProductos } from '../services/productoService.js';
import './Producto.css';

/**
 * @component Producto
 * @description Página de gestión de productos - Listado simplificado
 * @version 2.0.0
 * @author CDMAG Team
 */
export default function Producto() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      setError('Error al cargar los productos. Verifica que el servidor esté corriendo.');
      console.error('Error:', error);
      setLoading(false);
    };
    
    getProductos(onSuccess, onError);
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
        {/* Header */}
        <div className="producto-header">
          <h1>Gestión de Productos</h1>
          <p className="subtitle">Casa de Modas A.G</p>
        </div>

        {/* Botón Agregar Producto */}
        <div className="producto-actions">
          <button className="btn btn-primary-producto">
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Producto
          </button>
        </div>

        {/* Indicador de carga */}
        {loading && (
          <div className="loading-container">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando productos...</p>
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="alert alert-danger glass-alert" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        {/* Tabla de productos */}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-glass">
              <thead>
                <tr>
                  <th>IDENTIFICACIÓN</th>
                  <th>NOMBRE</th>
                  <th>REFERENCIA</th>
                  <th>PRECIO</th>
                  <th>EXISTENCIAS</th>
                  <th>TIPO</th>
                  <th>FECHA REGISTRO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <i className="bi bi-inbox display-4 d-block mb-3"></i>
                      <p className="text-muted">No hay productos registrados</p>
                    </td>
                  </tr>
                ) : (
                  productos.map((prod) => (
                    <tr key={prod.idProducto}>
                      <td>{prod.idProducto}</td>
                      <td className="fw-bold">{prod.nombre}</td>
                      <td>
                        <span className="badge bg-secondary">
                          {prod.referencia}
                        </span>
                      </td>
                      <td className="text-end">{formatPrice(prod.precio)}</td>
                      <td>
                        <span 
                          className={`badge ${
                            prod.cantidadStock <= prod.nivelMinimoStock 
                              ? 'bg-danger' 
                              : 'bg-success'
                          }`}
                        >
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
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar"
                          >
                            <i className="bi bi-trash"></i>
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

        {/* Footer eliminado */}
      </div>
    </div>
  );
}
