import axios from 'axios';

const API_URL = 'http://localhost:3000';

/**
* @service ProductoService
* @description Servicio para consumir API de productos usando callbacks
* @version 1.0.0
* @author CDMAG Team
*/

/**
* Obtiene todos los productos activos
* @param {Function} onSuccess - Callback cuando la petición es exitosa
* @param {Function} onError - Callback cuando hay un error
*/

export const getProductos = (onSuccess, onError) => {
  axios.get(`${API_URL}/productos/listarp`)  //
    .then(response => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
      console.error('Error al obtener productos:', error);
      if (onError) onError(error);
    });
};

/**
* Crea un nuevo producto
* @param {Object} producto - Datos del producto
* @param {Function} onSuccess - Callback cuando la petición es exitosa
* @param {Function} onError - Callback cuando hay un error
*/

export const createProducto = (producto, onSuccess, onError) => {
  axios.post(`${API_URL}/productos/insertarp`, producto)  // ✅ AGREGADO /productos
    .then(response => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
      console.error('Error al crear producto:', error);
      if (onError) onError(error);
    });
};

/**
* Actualiza un producto existente
* @param {number} id - ID del producto
* @param {Object} producto - Datos del producto
* @param {Function} onSuccess - Callback cuando la petición es exitosa
* @param {Function} onError - Callback cuando hay un error
*/

export const updateProducto = (id, producto, onSuccess, onError) => {
  axios.put(`${API_URL}/productos/editar/${id}`, producto)  // ✅ AGREGADO /productos
    .then(response => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
      console.error('Error al actualizar producto:', error);
      if (onError) onError(error);
    });
};

/**
* Elimina un producto
* @param {number} id - ID del producto
* @param {Function} onSuccess - Callback cuando la petición es exitosa
* @param {Function} onError - Callback cuando hay un error
*/

export const deleteProducto = (id, onSuccess, onError) => {
  axios.delete(`${API_URL}/productos/${id}`)  // ✅ AGREGADO /productos
    .then(response => {
      if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
      console.error('Error al eliminar producto:', error);
      if (onError) onError(error);
    });
};
