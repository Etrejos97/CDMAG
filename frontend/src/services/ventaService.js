import axios from 'axios';

const API_URL = 'http://localhost:3000/ventas';

/* Obtener todos o (legacy) */
export const getProductosVenta = (onSuccess, onError) => {
  axios.get(`${API_URL}/productos-venta`)
    .then(response => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
      console.error('Error al obtener productos:', error);
      if (onError) onError(error);
    });
};

/* Buscar productos en backend por término (palabra clave) */
export const buscarProductos = (searchTerm, onSuccess, onError) => {
  axios.get(`${API_URL}/productos-venta`, {
    params: { search: searchTerm }
  })
    .then(response => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
      console.error('Error al buscar productos:', error);
      if (onError) onError(error);
    });
};

export const buscarClientes = (searchTerm, onSuccess, onError) => {
  axios.get(`${API_URL}/buscar-clientes`, {
    params: { search: searchTerm }
  })
    .then(response => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
      console.error('Error al buscar clientes:', error);
      if (onError) onError(error);
    });
};

export const crearVenta = (ventaData, onSuccess, onError) => {
  axios.post(`${API_URL}/crear-venta`, ventaData)
    .then(response => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
      console.error('Error al crear venta:', error);
      if (onError) onError(error);
    });
};

export const getVentas = (onSuccess, onError) => {
  axios.get(`${API_URL}/listar-ventas`)
    .then(response => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
      console.error('Error al obtener ventas:', error);
      if (onError) onError(error);
    });
};

/* RESTful (callbacks) - utilidades adicionales */
export const obtenerVenta = (id, onSuccess, onError) => {
  axios.get(`${API_URL}/${id}`)
    .then(response => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
      console.error(`Error al obtener venta ${id}:`, error);
      if (onError) onError(error);
    });
};

export const actualizarVenta = (id, data, onSuccess, onError) => {
  axios.put(`${API_URL}/${id}`, data)
    .then(response => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
      console.error(`Error al actualizar venta ${id}:`, error);
      if (onError) onError(error);
    });
};

export const eliminarVenta = (id, onSuccess, onError) => {
  axios.delete(`${API_URL}/${id}`)
    .then(response => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
      console.error(`Error al cancelar venta ${id}:`, error);
      if (onError) onError(error);
    });
};