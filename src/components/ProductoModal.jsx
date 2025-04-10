import React from 'react';
import './ProductoModal.css';

const ProductoModal = ({ producto, onClose, carrito, setCarrito }) => {
  if (!producto) return null;

  const agregarAlCarrito = () => {
    const actualizado = [...carrito];
    const existe = actualizado.find(p => p.id === producto.id);

    if (existe) {
      existe.cantidad += 1;
    } else {
      actualizado.push({ ...producto, cantidad: 1 });
    }

    setCarrito(actualizado);
    localStorage.setItem('carrito', JSON.stringify(actualizado));
    onClose();
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
