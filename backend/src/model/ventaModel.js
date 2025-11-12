// ...existing code...
import sql from 'mssql';
import dbConfig from '../config/db.js';

/**
 * Manejo de ventas / productos para venta (usa callbacks para consistencia)
 */

export const listarProductosVenta = (callback) => {
  let pool = new sql.ConnectionPool(dbConfig);
  pool.connect().then(() => {
    let request = new sql.Request(pool);
    request.execute('sp_ListarProductosVenta', (err, result) => {
      pool.close();
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.recordset);
      }
    });
  }).catch(err => {
    pool.close();
    callback(err, null);
  });
};

export const buscarProductos = (term, callback) => {
  let pool = new sql.ConnectionPool(dbConfig);
  pool.connect().then(() => {
    let request = new sql.Request(pool);
    request.input('term', sql.NVarChar(200), term);
    request.execute('sp_BuscarProductos', (err, result) => {
      pool.close();
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.recordset);
      }
    });
  }).catch(err => {
    pool.close();
    callback(err, null);
  });
};

export const buscarClientes = (searchTerm, callback) => {
  let pool = new sql.ConnectionPool(dbConfig);
  pool.connect().then(() => {
    let request = new sql.Request(pool);
    request.input('searchTerm', sql.NVarChar(100), searchTerm);
    request.execute('sp_BuscarClientes', (err, result) => {
      pool.close();
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.recordset);
      }
    });
  }).catch(err => {
    pool.close();
    callback(err, null);
  });
};

export const crearVentaCompleta = (ventaData, callback) => {
  let pool = new sql.ConnectionPool(dbConfig);
  pool.connect().then(() => {
    let request = new sql.Request(pool);

    request.input('idCliente', sql.Int, ventaData.idCliente);
    request.input('idUsuario', sql.Int, ventaData.idUsuario);
    request.input('subtotal', sql.Decimal(18, 2), ventaData.subtotal);
    request.input('iva', sql.Decimal(18, 2), ventaData.iva);
    request.input('total', sql.Decimal(18, 2), ventaData.total);
    request.input('numeroFactura', sql.VarChar(50), ventaData.numeroFactura);
    request.input('detalles', sql.NVarChar(sql.MAX), JSON.stringify(ventaData.detalles));

    request.execute('sp_CrearVentaCompleta', (err, result) => {
      pool.close();
      if (err) {
        callback(err, null);
      } else {
        // sp devuelve idVenta, idFactura, mensaje
        callback(null, result.recordset[0]);
      }
    });
  }).catch(err => {
    pool.close();
    callback(err, null);
  });
};

export const listarVentas = (callback) => {
  let pool = new sql.ConnectionPool(dbConfig);
  pool.connect().then(() => {
    let request = new sql.Request(pool);
    request.execute('sp_ListarVentas', (err, result) => {
      pool.close();
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.recordset);
      }
    });
  }).catch(err => {
    pool.close();
    callback(err, null);
  });
};

/* Nuevas funciones: obtener venta por id, actualizar estado y cancelar venta */

export const obtenerVentaPorId = (idVenta, callback) => {
  let pool = new sql.ConnectionPool(dbConfig);
  pool.connect().then(() => {
    const request = new sql.Request(pool);
    request.input('idVenta', sql.Int, idVenta);

    const queryCabecera = `
      SELECT V.idVenta, V.fechaVenta, V.totalVenta, V.estadoVenta,
             C.idCliente, C.nombreCliente AS nombreCliente, C.cedulaCliente, C.telefonoCliente, C.correoCliente,
             F.idFactura, F.numeroFactura
      FROM Venta V
      INNER JOIN Cliente C ON V.idCliente = C.idCliente
      LEFT JOIN Factura F ON V.idVenta = F.idVenta
      WHERE V.idVenta = @idVenta
    `;

    request.query(queryCabecera, (err, result) => {
      if (err) {
        pool.close();
        return callback(err, null);
      }
      if (!result.recordset.length) {
        pool.close();
        return callback(null, null); // no encontrada
      }

      const venta = result.recordset[0];

      // obtener detalles
      const req2 = new sql.Request(pool);
      req2.input('idVenta', sql.Int, idVenta);
      req2.query(`
        SELECT DV.idDetalle, DV.idProducto, P.nombre AS nombreProducto, DV.cantidad, DV.precioUnitario, DV.subtotal
        FROM DetalleVenta DV
        INNER JOIN Producto P ON DV.idProducto = P.idProducto
        WHERE DV.idVenta = @idVenta
      `, (err2, result2) => {
        pool.close();
        if (err2) {
          return callback(err2, null);
        }
        venta.detalles = result2.recordset;
        return callback(null, venta);
      });
    });
  }).catch(err => {
    pool.close();
    callback(err, null);
  });
};

export const actualizarEstadoVenta = (idVenta, estadoVenta, callback) => {
  let pool = new sql.ConnectionPool(dbConfig);
  pool.connect().then(() => {
    const request = new sql.Request(pool);
    request.input('idVenta', sql.Int, idVenta);
    request.input('estadoVenta', sql.VarChar(20), estadoVenta);
    request.query(`UPDATE Venta SET estadoVenta = @estadoVenta WHERE idVenta = @idVenta`, (err, result) => {
      pool.close();
      if (err) return callback(err, null);
      callback(null, { message: 'Estado actualizado' });
    });
  }).catch(err => {
    pool.close();
    callback(err, null);
  });
};

export const cancelarVenta = (idVenta, callback) => {
  // Marca la venta como 'Cancelada'
  actualizarEstadoVenta(idVenta, 'Cancelada', callback);
};

