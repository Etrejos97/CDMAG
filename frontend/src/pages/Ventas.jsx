import { useState, useEffect } from 'react';
import { getProductosVenta, buscarClientes, crearVenta } from '../services/ventaService.js';
import './Ventas.css';

export default function Ventas() {
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  
  const [searchProducto, setSearchProducto] = useState('');
  const [searchCliente, setSearchCliente] = useState('');
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    setLoading(true);
    const onSuccess = (lista) => {
      setProductos(lista);
      setLoading(false);
    };
    const onError = () => {
      setLoading(false);
    };
    getProductosVenta(onSuccess, onError);
  };

  const buscarClientesHandler = (term) => {
    setSearchCliente(term);
    if (term.length >= 2) {
      const onSuccess = (lista) => {
        setClientes(lista);
      };
      const onError = () => {
        setClientes([]);
      };
      buscarClientes(term, onSuccess, onError);
    } else {
      setClientes([]);
    }
  };

  const seleccionarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setClientes([]);
    setSearchCliente('');
  };

  const agregarAlCarrito = (producto) => {
    const existente = carrito.find(item => item.idProducto === producto.idProducto);
    
    if (existente) {
      if (existente.cantidad < producto.cantidadStock) {
        setCarrito(carrito.map(item =>
          item.idProducto === producto.idProducto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ));
      } else {
        alert('⚠️ No hay más stock disponible');
      }
    } else {
      setCarrito([...carrito, {
        idProducto: producto.idProducto,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
        stockDisponible: producto.cantidadStock
      }]);
    }
  };

  const eliminarDelCarrito = (idProducto) => {
    setCarrito(carrito.filter(item => item.idProducto !== idProducto));
  };

  const cambiarCantidad = (idProducto, nuevaCantidad) => {
    const producto = carrito.find(item => item.idProducto === idProducto);
    
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(idProducto);
    } else if (nuevaCantidad <= producto.stockDisponible) {
      setCarrito(carrito.map(item =>
        item.idProducto === idProducto
          ? { ...item, cantidad: nuevaCantidad }
          : item
      ));
    } else {
      alert('⚠️ Cantidad supera el stock disponible');
    }
  };

  const calcularSubtotal = () => {
    return carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const calcularIVA = () => {
    return calcularSubtotal() * 0.19;
  };

  const calcularTotal = () => {
    return calcularSubtotal() + calcularIVA();
  };

  const procesarVenta = () => {
    if (!clienteSeleccionado) {
      alert('⚠️ Debe seleccionar un cliente');
      return;
    }

    if (carrito.length === 0) {
      alert('⚠️ El carrito está vacío');
      return;
    }

    const numeroFactura = `FACT-${Date.now()}`;
    
    const ventaData = {
      idCliente: clienteSeleccionado.idCliente,
      idUsuario: 1,
      subtotal: calcularSubtotal(),
      iva: calcularIVA(),
      total: calcularTotal(),
      numeroFactura: numeroFactura,
      detalles: carrito.map(item => ({
        idProducto: item.idProducto,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio
      }))
    };

    const onSuccess = (response) => {
      console.log('Venta creada:', response);
      alert(`✅ Venta creada exitosamente\nFactura: ${numeroFactura}`);
      setCarrito([]);
      setClienteSeleccionado(null);
      cargarProductos();
    };

    const onError = (error) => {
      console.error('Error:', error);
      alert('❌ Error al procesar la venta');
    };

    crearVenta(ventaData, onSuccess, onError);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchProducto.toLowerCase()) ||
    p.referencia.toLowerCase().includes(searchProducto.toLowerCase())
  );

  return (
    <div className="ventas-container">
      <div className="glass-card-ventas">
        
        <div className="ventas-header">
          <h1>Punto de Venta</h1>
          <p className="subtitle">Casa de Modas A.G</p>
        </div>

        <div className="ventas-layout">
          
          <div className="ventas-left">
            
            <div className="seccion-cliente">
              <h3>Cliente</h3>
              {clienteSeleccionado ? (
                <div className="cliente-seleccionado">
                  <div>
                    <p className="nombre-cliente">{clienteSeleccionado.nombreCliente}</p>
                    <p className="cedula-cliente">CC: {clienteSeleccionado.cedulaCliente}</p>
                  </div>
                  <button 
                    className="btn-cambiar-cliente"
                    onClick={() => setClienteSeleccionado(null)}
                  >
                    Cambiar
                  </button>
                </div>
              ) : (
                <div className="buscar-cliente">
                  <input
                    type="text"
                    placeholder="Buscar cliente por nombre o cédula..."
                    value={searchCliente}
                    onChange={(e) => buscarClientesHandler(e.target.value)}
                  />
                  {clientes.length > 0 && (
                    <ul className="lista-clientes">
                      {clientes.map(cliente => (
                        <li 
                          key={cliente.idCliente}
                          onClick={() => seleccionarCliente(cliente)}
                        >
                          <span className="nombre">{cliente.nombreCliente}</span>
                          <span className="cedula">CC: {cliente.cedulaCliente}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div className="seccion-productos">
              <h3>Productos Disponibles</h3>
              <input
                type="text"
                className="search-producto"
                placeholder="Buscar producto..."
                value={searchProducto}
                onChange={(e) => setSearchProducto(e.target.value)}
              />
              
              {loading ? (
                <p>Cargando productos...</p>
              ) : (
                <div className="grid-productos">
                  {productosFiltrados.map(producto => (
                    <div key={producto.idProducto} className="card-producto">
                      <h4>{producto.nombre}</h4>
                      <p className="ref">{producto.referencia}</p>
                      <p className="precio">{formatPrice(producto.precio)}</p>
                      <p className="stock">Stock: {producto.cantidadStock}</p>
                      <button 
                        className="btn-agregar"
                        onClick={() => agregarAlCarrito(producto)}
                      >
                        Agregar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="ventas-right">
            <div className="carrito-container">
              <h3>Carrito de Compra</h3>
              
              {carrito.length === 0 ? (
                <p className="carrito-vacio">El carrito está vacío</p>
              ) : (
                <>
                  <div className="lista-carrito">
                    {carrito.map(item => (
                      <div key={item.idProducto} className="item-carrito">
                        <div className="item-info">
                          <p className="item-nombre">{item.nombre}</p>
                          <p className="item-precio">{formatPrice(item.precio)}</p>
                        </div>
                        <div className="item-controles">
                          <button onClick={() => cambiarCantidad(item.idProducto, item.cantidad - 1)}>
                            -
                          </button>
                          <span>{item.cantidad}</span>
                          <button onClick={() => cambiarCantidad(item.idProducto, item.cantidad + 1)}>
                            +
                          </button>
                          <button 
                            className="btn-eliminar"
                            onClick={() => eliminarDelCarrito(item.idProducto)}
                          >
                            🗑️
                          </button>
                        </div>
                        <p className="item-subtotal">{formatPrice(item.precio * item.cantidad)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="resumen-venta">
                    <div className="linea-resumen">
                      <span>Subtotal:</span>
                      <span>{formatPrice(calcularSubtotal())}</span>
                    </div>
                    <div className="linea-resumen">
                      <span>IVA (19%):</span>
                      <span>{formatPrice(calcularIVA())}</span>
                    </div>
                    <div className="linea-resumen total">
                      <span>TOTAL:</span>
                      <span>{formatPrice(calcularTotal())}</span>
                    </div>
                  </div>

                  <button 
                    className="btn-procesar-venta"
                    onClick={procesarVenta}
                  >
                    Procesar Venta
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
