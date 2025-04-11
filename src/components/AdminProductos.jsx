import React from 'react';
import './AdminProductos.css';

const AdminProductos = ({ productos, recargarProductos }) => {
  const handleEditar = (producto) => {
    alert(`Función para editar: ${producto.nombre}`);
    // En el futuro: abrir modal o navegar a vista de edición
  };

  const handleEliminar = async (id) => {
    const confirmado = window.confirm('¿Estás seguro de eliminar este producto?');
    if (!confirmado) return;

    try {
      const res = await fetch(`http://localhost:4000/api/productos/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al eliminar');
      alert('Producto eliminado');
      recargarProductos();
    } catch (err) {
      console.error('Error eliminando producto:', err);
      alert('No se pudo eliminar el producto.');
    }
  };

  return (
    <div className="admin-productos">
      <h2>🛠️ Panel de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => handleEditar(p)}>✏️ Editar</button>
                  <button onClick={() => handleEliminar(p.id)}>🗑️ Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProductos;
