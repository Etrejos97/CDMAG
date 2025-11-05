import * as ventaModel from '../model/ventaModel.js';

export const getProductosVenta = (req, res) => {
  ventaModel.listarProductosVenta((err, productos) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener productos' });
    } else {
      res.json(productos);
    }
  });
};

export const searchClientes = (req, res) => {
  const { search } = req.query;
  ventaModel.buscarClientes(search || '', (err, clientes) => {
    if (err) {
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
      res.status(500).json({ error: 'Error al crear venta', details: err.message });
    } else {
      res.status(201).json(result);
    }
  });
};

export const getVentas = (req, res) => {
  ventaModel.listarVentas((err, ventas) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener ventas' });
    } else {
      res.json(ventas);
    }
  });
};
