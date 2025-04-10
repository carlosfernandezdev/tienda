import React, { useEffect } from 'react';
import './Carrito.css';
import { registrarCompra } from '../api'; // ✅ función fetch para registrar

const Carrito = ({ carrito, setCarrito, onConfirmarCompra }) => {
  useEffect(() => {
    const normalizado = carrito.map((producto) => ({
      ...producto,
      cantidad: typeof producto.cantidad === 'number' && producto.cantidad > 0
        ? producto.cantidad
        : 1
    }));

    const necesitaActualizar = JSON.stringify(normalizado) !== JSON.stringify(carrito);
    if (necesitaActualizar) {
      setCarrito(normalizado);
      localStorage.setItem('carrito', JSON.stringify(normalizado));
    }
  }, [carrito, setCarrito]);

  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const aumentarCantidad = (id) => {
    const actualizado = carrito.map(producto =>
      producto.id === id
        ? { ...producto, cantidad: (producto.cantidad || 1) + 1 }
        : producto
    );
    guardarCarrito(actualizado);
  };

  const disminuirCantidad = (id) => {
    const actualizado = carrito
      .map(producto =>
        producto.id === id
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
      .filter(producto => producto.cantidad > 0);
    guardarCarrito(actualizado);
  };

  const eliminarProducto = (id) => {
    const actualizado = carrito.filter(producto => producto.id !== id);
    guardarCarrito(actualizado);
  };

  const vaciarCarrito = () => {
    guardarCarrito([]);
  };

  const confirmarCompra = async () => {
    if (carrito.length === 0) return;

    try {
      await registrarCompra(carrito); // ✅ enviar compra al backend
      onConfirmarCompra();            // ✅ cambiar a vista "Gracias"
    } catch (err) {
      console.error('Error al registrar la compra:', err);
      alert('Ocurrió un error al confirmar la compra');
    }
  };

  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  return (
    <div className="carrito">
      <h2>🛒 Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p className="carrito-vacio">Tu carrito está vacío.</p>
      ) : (
        <>
          <table className="carrito-tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto) => (
                <tr key={producto.id}>
                  <td className="producto-info">
                    <img src={producto.imagen} alt={producto.nombre} />
                    <span>{producto.nombre}</span>
                  </td>
                  <td>
                    <div className="cantidad-controles">
                      <button onClick={() => disminuirCantidad(producto.id)}>-</button>
                      <span>{producto.cantidad}</span>
                      <button onClick={() => aumentarCantidad(producto.id)}>+</button>
                    </div>
                  </td>
                  <td>${producto.precio}</td>
                  <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>
                  <td>
                    <button className="eliminar-btn" onClick={() => eliminarProducto(producto.id)}>
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="carrito-total">
            <strong>Total:</strong> ${total.toFixed(2)}
          </div>

          <div className="carrito-acciones">
            <button onClick={vaciarCarrito} className="vaciar-btn">Vaciar carrito</button>
            <button className="comprar-btn" onClick={confirmarCompra}>Confirmar compra</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
