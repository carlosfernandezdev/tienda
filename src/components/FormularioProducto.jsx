import React, { useState } from 'react';
import './FormularioProducto.css';

const FormularioProducto = ({ onProductoAgregado }) => {
  const [producto, setProducto] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    proveedor: '',
    stock: '',
    fecha: ''
  });
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in producto) {
      formData.append(key, producto[key]);
    }
    if (imagen) formData.append('imagen', imagen);

    try {
      const res = await fetch('http://localhost:4000/api/productos', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al registrar producto');

      setMensaje('✅ Producto registrado correctamente');
      setProducto({
        nombre: '',
        categoria: '',
        precio: '',
        proveedor: '',
        stock: '',
        fecha: ''
      });
      setImagen(null);
      onProductoAgregado(); 
    } catch (err) {
      setMensaje('❌ ' + err.message);
    }
  };

  return (
    <div className="formulario-producto">
      <h2>📦 Añadir Nuevo Producto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="nombre" placeholder="Nombre" value={producto.nombre} onChange={handleChange} required />
        <input type="text" name="categoria" placeholder="Categoría" value={producto.categoria} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" value={producto.precio} onChange={handleChange} required />
        <input type="text" name="proveedor" placeholder="Proveedor" value={producto.proveedor} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" value={producto.stock} onChange={handleChange} required />
        <input type="date" name="fecha" value={producto.fecha} onChange={handleChange} required />

        <input type="file" accept="image/*" onChange={handleImageChange} required />

        <button type="submit">Agregar producto</button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default FormularioProducto;
