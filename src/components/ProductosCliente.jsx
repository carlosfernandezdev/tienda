import React, { useEffect, useState } from 'react';
import './ProductosCliente.css';
import ProductoModal from './ProductoModal';

const ProductosCliente = ({ filtros }) => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('productos')) || [];
    setProductos(guardados);
  }, []);

  useEffect(() => {
    const filtrarProductos = () => {
      let filtrados = productos;

      if (filtros.categoria && filtros.categoria !== 'Todas') {
        filtrados = filtrados.filter(p => p.categoria === filtros.categoria);
      }

      if (filtros.precioMin) {
        filtrados = filtrados.filter(p => p.precio >= parseFloat(filtros.precioMin));
      }

      if (filtros.precioMax) {
        filtrados = filtrados.filter(p => p.precio <= parseFloat(filtros.precioMax));
      }

      if (filtros.fechaDesde) {
        filtrados = filtrados.filter(p => new Date(p.fecha) >= new Date(filtros.fechaDesde));
      }

      if (filtros.fechaHasta) {
        filtrados = filtrados.filter(p => new Date(p.fecha) <= new Date(filtros.fechaHasta));
      }

      setProductosFiltrados(filtrados);
    };

    filtrarProductos();
  }, [filtros, productos]);

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setProductoSeleccionado(null);
    setMostrarModal(false);
  };

  return (
    <div className="productos-cliente">
      {productosFiltrados.length === 0 ? (
        <p className="no-productos">🥲 No hay productos que coincidan con los filtros.</p>
      ) : (
        <div className="productos-grid">
          {productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="producto-card"
              onClick={() => abrirModal(producto)}
            >
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>${producto.precio}</p>
            </div>
          ))}
        </div>
      )}

      {mostrarModal && (
        <ProductoModal
          producto={productoSeleccionado}
          onClose={cerrarModal}
        />
      )}
    </div>
  );
};

export default ProductosCliente;
