import React from 'react';
import './ProductoModal.css';

const ProductoModal = ({ producto, onClose, carrito, setCarrito }) => {
  if (!producto) return null;

  const agregarAlCarrito = () => {
    if (!producto.id) {
      alert('Este producto no tiene un ID válido');
      return;
    }

    const actualizado = [...carrito];
    const existe = actualizado.find(p => p.id === producto.id);

    if (existe) {
      if (producto.stock && existe.cantidad >= producto.stock) {
        alert('No hay suficiente stock disponible');
        return;
      }
      existe.cantidad += 1;
    } else {
      actualizado.push({ ...producto, cantidad: 1 });
    }

    setCarrito(actualizado);
    localStorage.setItem('carrito', JSON.stringify(actualizado));
    onClose();
  };

  const imagenUrl = producto.imagen.startsWith('/uploads')
    ? `http://localhost:4000${producto.imagen}`
    : `http://localhost:4000/uploads/${producto.imagen}`;

  const fechaFormateada = producto.fecha
    ? new Date(producto.fecha).toISOString().split('T')[0]
    : 'Sin fecha';

  return (
    <div className="producto-modal-backdrop" onClick={onClose}>
      <div className="producto-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cerrar-modal" onClick={onClose}>✖</button>

        <img src={imagenUrl} alt={producto.nombre} />
        <h2>{producto.nombre}</h2>

        <p><strong>Precio:</strong> ${producto.precio}</p>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Proveedor:</strong> {producto.proveedor}</p>
        <p><strong>Fecha:</strong> {fechaFormateada}</p>
        <p><strong>Stock:</strong> {producto.stock}</p>

        <button className="agregar-btn" onClick={agregarAlCarrito}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductoModal;
