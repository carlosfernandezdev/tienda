import React from 'react';
import './ProductoModal.css';

const ProductoModal = ({ producto, onClose }) => {
  if (!producto) return null;

  const agregarAlCarrito = () => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

    // Buscar si el producto ya está en el carrito
    const existe = carritoActual.find(p => p.id === producto.id);

    if (!existe) {
      carritoActual.push({ ...producto, cantidad: 1 });
    } else {
      existe.cantidad += 1;
    }

    localStorage.setItem('carrito', JSON.stringify(carritoActual));
    alert('Producto agregado al carrito');
    onClose(); // cerrar modal después de agregar
  };

  return (
    <div className="producto-modal-backdrop" onClick={onClose}>
      <div className="producto-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cerrar-modal" onClick={onClose}>✖</button>

        <img src={producto.imagen} alt={producto.nombre} />
        <h2>{producto.nombre}</h2>

        <p><strong>Precio:</strong> ${producto.precio}</p>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Proveedor:</strong> {producto.proveedor}</p>
        <p><strong>Fecha:</strong> {producto.fecha}</p>
        <p><strong>Stock:</strong> {producto.stock}</p>

        <button className="agregar-btn" onClick={agregarAlCarrito}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductoModal;
