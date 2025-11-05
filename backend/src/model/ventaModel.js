import sql from 'mssql';
import dbConfig from '../config/db.js';

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
