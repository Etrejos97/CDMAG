// ...existing code...
import * as ventaModel from '../model/ventaModel.js';

export const getProductosVenta = (req, res) => {
  const search = req.query.search;
  if (search && search.trim().length > 0) {
    // usar búsqueda en BD por palabra clave
    ventaModel.buscarProductos(search.trim(), (err, productos) => {
      if (err) {
        console.error('Error buscarProductos:', err);
        return res.status(500).json({ error: 'Error al buscar productos' });
      }
      return res.json(productos);
    });
  } else {
    // listar todos los productos disponibles para venta
    ventaModel.listarProductosVenta((err, productos) => {
      if (err) {
        console.error('Error listarProductosVenta:', err);
        return res.status(500).json({ error: 'Error al obtener productos' });
      }
      return res.json(productos);
    });
  }
};

export const searchClientes = (req, res) => {
  const { search } = req.query;
  ventaModel.buscarClientes(search || '', (err, clientes) => {
    if (err) {
      console.error('Error buscarClientes:', err);
      res.status(500).json({ error: 'Error al buscar clientes' });
    } else {
      res.json(clientes);
    }
  });
};

export const createVenta = (req, res) => {
  const ventaData = req.body;

  ventaModel.crearVentaCompleta(ventaData, (err, result) => {
    if (err) {
      console.error('Error crearVentaCompleta:', err);
      res.status(500).json({ error: 'Error al crear venta', details: err.message || err });
    } else {
      res.status(201).json(result);
    }
  });
};

export const getVentas = (req, res) => {
  ventaModel.listarVentas((err, ventas) => {
    if (err) {
      console.error('Error listarVentas:', err);
      res.status(500).json({ error: 'Error al obtener ventas' });
    } else {
      res.json(ventas);
    }
  });
};

/* Nuevos controladores RESTful */

export const obtenerVenta = (req, res) => {
  const { id } = req.params;
  ventaModel.obtenerVentaPorId(parseInt(id, 10), (err, venta) => {
    if (err) {
      console.error('Error obtenerVentaPorId:', err);
      return res.status(500).json({ error: 'Error al obtener la venta', details: err.message || err });
    }
    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
    return res.json(venta);
  });
};

export const actualizarVenta = (req, res) => {
  const { id } = req.params;
  const { estadoVenta } = req.body;
  if (!estadoVenta) return res.status(400).json({ error: 'estadoVenta es requerido' });

  ventaModel.actualizarEstadoVenta(parseInt(id, 10), estadoVenta, (err, result) => {
    if (err) {
      console.error('Error actualizarEstadoVenta:', err);
      return res.status(500).json({ error: 'Error al actualizar venta', details: err.message || err });
    }
    return res.json({ mensaje: 'Venta actualizada' });
  });
};

export const eliminarVenta = (req, res) => {
  const { id } = req.params;
  ventaModel.cancelarVenta(parseInt(id, 10), (err, result) => {
    if (err) {
      console.error('Error cancelarVenta:', err);
      return res.status(500).json({ error: 'Error al cancelar venta', details: err.message || err });
    }
    return res.json({ mensaje: 'Venta cancelada' });
  });
};

