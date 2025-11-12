import { useState } from 'react';
import { getProductosVenta, buscarProductos, buscarClientes, crearVenta } from '../services/ventaService.js';
import Sidebar from '../components/Sidebar';
import './Ventas.css';
import { useAuth } from '../context/useAuth.js';

export default function Ventas() {
  const { user } = useAuth();
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [searchProducto, setSearchProducto] = useState('');
  const [searchCliente, setSearchCliente] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar productos sin filtro (opcional) - aquí no se carga automáticamente
  const cargarProductos = (term = '') => {
    setLoading(true);
    const onSuccess = (lista) => {
      setProductos(lista);
      setLoading(false);
    };
    const onError = (err) => {
      console.error('Error al cargar productos:', err);
      setProductos([]);
      setLoading(false);
    };

    if (term && term.trim().length > 0) {
      buscarProductos(term.trim(), onSuccess, onError);
    } else {
      getProductosVenta(onSuccess, onError);
    }
  };

  const manejarKeyProducto = (e) => {
    if (e.key === 'Enter') {
      const term = e.target.value;
      setSearchProducto(term);
      cargarProductos(term);
    }
  };

  const manejarKeyCliente = (e) => {
    if (e.key === 'Enter') {
      const term = e.target.value;
      setSearchCliente(term);
      if (term.trim().length === 0) {
        setClientes([]);
        return;
      }
      const onSuccess = (lista) => {
        setClientes(lista);
      };
      const onError = (err) => {
        console.error('Error buscar clientes:', err);
        setClientes([]);
      };
      buscarClientes(term, onSuccess, onError);
    }
  };

  const seleccionarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setClientes([]);
    setSearchCliente('');
  };

  const agregarAlCarrito = (producto) => {
    const existente = carrito.find((item) => item.idProducto === producto.idProducto);
    if (existente) {
      if (existente.cantidad < producto.cantidadStock) {
        setCarrito(
          carrito.map((item) =>
            item.idProducto === producto.idProducto
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        );
      } else {
        alert('No hay más stock disponible');
      }
    } else {
      setCarrito([
        ...carrito,
        {
          idProducto: producto.idProducto,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
          stockDisponible: producto.cantidadStock,
        },
      ]);
    }
  };

  const eliminarDelCarrito = (idProducto) => {
    setCarrito(carrito.filter((item) => item.idProducto !== idProducto));
  };

  const cambiarCantidad = (idProducto, nuevaCantidad) => {
    const producto = carrito.find((item) => item.idProducto === idProducto);
    if (!producto) return;
    if (nuevaCantidad === 0) {
      eliminarDelCarrito(idProducto);
    } else if (nuevaCantidad <= producto.stockDisponible) {
      setCarrito(
        carrito.map((item) =>
          item.idProducto === idProducto ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
    } else {
      alert('Cantidad supera el stock disponible');
    }
  };

  const calcularSubtotal = () => carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const calcularIVA = () => calcularSubtotal() * 0.19;

  const calcularTotal = () => calcularSubtotal() + calcularIVA();

  const procesarVenta = () => {
    if (!clienteSeleccionado) {
      alert('Debe seleccionar un cliente');
      return;
    }
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const numeroFactura = `FACT-${Date.now()}`;

    const ventaData = {
      idCliente: clienteSeleccionado.idCliente,
      idUsuario: user?.idUsuario || user?.id || 1,
      subtotal: calcularSubtotal(),
      iva: calcularIVA(),
      total: calcularTotal(),
      numeroFactura: numeroFactura,
      detalles: carrito.map((item) => ({
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        precioUnitario: item.precio,
        subtotal: item.precio * item.cantidad,
      })),
    };

    const onSuccess = (response) => {
      console.log('Venta creada:', response);
      alert(`Venta creada exitosamente ${numeroFactura}`);
      setCarrito([]);
      setClienteSeleccionado(null);
      setProductos([]);
      setSearchProducto('');
    };

    const onError = (error) => {
      console.error('Error:', error);
      alert('Error al procesar la venta');
    };

    crearVenta(ventaData, onSuccess, onError);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);

  const clienteNombre = (c) => c?.nombreCliente || c?.nombre || '';
  const clienteCedula = (c) => c?.cedulaCliente || c?.cedula || '';

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '250px' }}>
        <div className="ventas-container">
          <div className="glass-card-ventas">
            <div className="ventas-header">
              <h1>💰 Punto de Venta</h1>
              <p className="subtitle">Casa de Modas A.G</p>
            </div>

            <div className="ventas-layout">
              <div className="ventas-left">
                <div className="seccion-cliente">
                  <h3>👤 Cliente</h3>

                  {clienteSeleccionado ? (
                    <div className="cliente-seleccionado">
                      <div>
                        <p className="nombre-cliente">{clienteNombre(clienteSeleccionado)}</p>
                        <p className="cedula-cliente">CC {clienteCedula(clienteSeleccionado)}</p>
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
                        placeholder="Buscar cliente "
                        value={searchCliente}
                        onChange={(e) => setSearchCliente(e.target.value)}
                        onKeyDown={manejarKeyCliente}
                      />

                      {clientes.length > 0 && (
                        <ul className="lista-clientes">
                          {clientes.map((cliente) => (
                            <li key={cliente.idCliente} onClick={() => seleccionarCliente(cliente)}>
                              <span className="nombre">{clienteNombre(cliente)}</span>
                              <span className="cedula">CC {clienteCedula(cliente)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                <div className="seccion-productos">
                  <h3>📦 Productos Disponibles</h3>
                  <input
                    type="text"
                    className="search-producto"
                    placeholder="Buscar producto"
                    value={searchProducto}
                    onChange={(e) => setSearchProducto(e.target.value)}
                    onKeyDown={manejarKeyProducto}
                  />

                  {loading ? (
                    <p>Cargando productos...</p>
                  ) : productos.length === 0 ? (
                    <p style={{ marginTop: '1rem', color: '#667eea' }}>
                      
                    </p>
                  ) : (
                    <div className="grid-productos">
                      {productos.map((producto) => (
                        <div key={producto.idProducto} className="card-producto">
                          <h4>{producto.nombre}</h4>
                          <p className="ref">{producto.referencia}</p>
                          <p className="precio">{formatPrice(producto.precio)}</p>
                          <p className="stock">Stock {producto.cantidadStock}</p>
                          <button
                            className="btn-agregar"
                            onClick={() => agregarAlCarrito(producto)}
                            aria-label={`Agregar ${producto.nombre}`}
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
                  <h3>🛒 Carrito de Compra</h3>

                  {carrito.length === 0 ? (
                    <p className="carrito-vacio">El carrito está vacío</p>
                  ) : (
                    <div className="lista-carrito">
                      {carrito.map((item) => (
                        <div key={item.idProducto} className="item-carrito">
                          <div className="item-info">
                            <p className="item-nombre">{item.nombre}</p>
                            <p className="item-precio">{formatPrice(item.precio)}</p>
                          </div>

                          <div className="item-controles">
                            <button
                              onClick={() => cambiarCantidad(item.idProducto, item.cantidad - 1)}
                            >
                              −
                            </button>
                            <span>{item.cantidad}</span>
                            <button
                              onClick={() => cambiarCantidad(item.idProducto, item.cantidad + 1)}
                            >
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
                  )}

                  <div className="resumen-venta">
                    <div className="linea-resumen">
                      <span>Subtotal</span>
                      <span>{formatPrice(calcularSubtotal())}</span>
                    </div>

                    <div className="linea-resumen">
                      <span>IVA 19%</span>
                      <span>{formatPrice(calcularIVA())}</span>
                    </div>

                    <div className="linea-resumen total">
                      <span>TOTAL</span>
                      <span>{formatPrice(calcularTotal())}</span>
                    </div>
                  </div>

                  <button className="btn-procesar-venta" onClick={procesarVenta}>
                    ✅ Procesar Venta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}