import React, { useState } from 'react';
import './ModalEditarProducto.css';

const ModalEditarProducto = ({ producto, onClose, onActualizado }) => {
  const [form, setForm] = useState({
    nombre: producto.nombre,
    categoria: producto.categoria,
    precio: producto.precio,
    proveedor: producto.proveedor,
    stock: producto.stock,
    fecha: producto.fecha.split('T')[0] 
  });

  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNuevaImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('Actualizando...');

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    if (nuevaImagen) formData.append('imagen', nuevaImagen);

    try {
      const res = await fetch(`http://localhost:4000/api/productos/${producto.id}`, {
        method: 'PUT',
        body: formData
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al actualizar producto');

      setMensaje('✅ Producto actualizado correctamente');
      onActualizado(); 
      onClose();
    } catch (err) {
      console.error(err);
      setMensaje('❌ Error: ' + err.message);
    }
  };

  return (
    <div className="modal-editar-backdrop" onClick={onClose}>
      <div className="modal-editar" onClick={(e) => e.stopPropagation()}>
        <h2>✏️ Editar Producto</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
          <input type="text" name="categoria" value={form.categoria} onChange={handleChange} required />
          <input type="number" name="precio" value={form.precio} onChange={handleChange} required />
          <input type="text" name="proveedor" value={form.proveedor} onChange={handleChange} required />
          <input type="number" name="stock" value={form.stock} onChange={handleChange} required />
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />

          <label>Nueva imagen (opcional):</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <div className="modal-editar-botones">
            <button type="submit">💾 Guardar cambios</button>
            <button type="button" className="cancelar" onClick={onClose}>Cancelar</button>
          </div>
        </form>
        {mensaje && <p className="modal-editar-mensaje">{mensaje}</p>}
      </div>
    </div>
  );
};

export default ModalEditarProducto;
