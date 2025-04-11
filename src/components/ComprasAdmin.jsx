import React, { useEffect, useState } from 'react';
import './ComprasAdmin.css';

const ComprasAdmin = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/compras');
        const data = await res.json();
        console.log('Compras del backend:', data);
        setCompras(data);
      } catch (err) {
        console.error('Error al cargar compras:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, []);

  if (loading) return <p>Cargando compras...</p>;

  return (
    <div className="compras-admin">
      <h2>🧾 Compras Realizadas</h2>
      {compras.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        compras.map((compra) => (
          <div key={compra.id} className="compra-card">
            <h3>Compra #{compra.id}</h3>
            <p><strong>Usuario:</strong> {compra.usuario || 'Invitado'}</p>
            <p><strong>Fecha:</strong> {new Date(compra.fecha).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ${parseFloat(compra.total).toFixed(2)}</p>

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
                {compra.detalles.map((p, i) => (
                  <tr key={i}>
                    <td>{p.nombre}</td>
                    <td>{p.cantidad}</td>
                    <td>${parseFloat(p.precio_unitario).toFixed(2)}</td>
                    <td>${(p.cantidad * parseFloat(p.precio_unitario)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default ComprasAdmin;
