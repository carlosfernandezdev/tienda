import React, { useEffect, useState } from 'react';
import './Gracias.css';

const Gracias = ({ onVolver }) => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) return;

    fetch(`http://localhost:4000/api/compras/ultima/${usuario.id}`)
      .then(res => res.json())
      .then(data => {
        setProductos(data.detalles || []);
        const totalCalculado = data.detalles.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
        setTotal(totalCalculado);
      })
      .catch(() => {
        setProductos([]);
        setTotal(0);
      });
  }, []);

  return (
    <div className="gracias">
      <div className="gracias-contenido">
        <h2>🎉 ¡Gracias por su compra!</h2>
        <p>Estos son los productos que compraste:</p>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, i) => (
              <tr key={i}>
                <td>{p.nombre}</td>
                <td>{p.cantidad}</td>
                <td>${p.precio}</td>
                <td>${(p.precio * p.cantidad).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={{ textAlign: 'right' }}><strong>Total:</strong></td>
              <td><strong>${total.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>

        <button className="btn-volver" onClick={onVolver}>
          🛍️ Volver a productos
        </button>
      </div>
    </div>
  );
};

export default Gracias;
