import React, { useEffect, useState } from 'react';
import ProductoModal from './ProductoModal';
import './ProductosCliente.css';
import { getProductos } from '../api';

const ProductosCliente = ({ filtros, carrito, setCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const todos = await getProductos();

        const filtrados = todos.filter((p) => {
          const cumpleCategoria = !filtros.categoria || p.categoria === filtros.categoria;
          const cumplePrecioMin = !filtros.precioMin || p.precio >= parseFloat(filtros.precioMin);
          const cumplePrecioMax = !filtros.precioMax || p.precio <= parseFloat(filtros.precioMax);
          const cumpleFechaDesde = !filtros.fechaDesde || new Date(p.fecha) >= new Date(filtros.fechaDesde);
          const cumpleFechaHasta = !filtros.fechaHasta || new Date(p.fecha) <= new Date(filtros.fechaHasta);
          return (
            cumpleCategoria &&
            cumplePrecioMin &&
            cumplePrecioMax &&
            cumpleFechaDesde &&
            cumpleFechaHasta
          );
        });

        setProductos(filtrados);
      } catch (err) {
        console.error('Error al obtener productos:', err);
        setProductos([]);
      }
    };

    fetchProductos();
  }, [filtros]);

  const abrirModal = (producto) => setProductoSeleccionado(producto);
  const cerrarModal = () => setProductoSeleccionado(null);

  return (
    <div className="productos-cliente">
      {productos.length === 0 ? (
        <p className="sin-resultados">No hay productos que coincidan con los filtros.</p>
      ) : (
        productos.map((producto) => (
          <div
            key={producto.id}
            className="producto-card"
            onClick={() => abrirModal(producto)}
          >
            <img
              src={`http://localhost:4000${producto.imagen}`}
              alt={producto.nombre}
              className="producto-imagen"
            />
            <h3>{producto.nombre}</h3>
            <p>${producto.precio}</p>
          </div>
        ))
      )}

      {productoSeleccionado && (
        <ProductoModal
          producto={productoSeleccionado}
          onClose={cerrarModal}
          carrito={carrito}
          setCarrito={setCarrito}
        />
      )}
    </div>
  );
};

export default ProductosCliente;
