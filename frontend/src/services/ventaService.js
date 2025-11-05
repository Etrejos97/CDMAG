import axios from 'axios';

const API_URL = 'http://localhost:3000/api/ventas';

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
