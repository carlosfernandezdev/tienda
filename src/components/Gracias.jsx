import React from 'react';
import './Gracias.css';

const Gracias = ({ productos }) => {
  const total = productos.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

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
      </div>
    </div>
  );
};

export default Gracias;
