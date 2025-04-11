import React, { useEffect, useState } from 'react';
import './ComprasAdmin.css';

const ComprasAdmin = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    // Datos simulados (mock)
    const mockData = [
      {
        id: 1,
        usuario: 'carlos123',
        fecha: '2025-04-10T14:30:00.000Z',
        total: 105.5,
        detalles: [
          { nombre: 'Camisa', cantidad: 2, precio_unitario: 20 },
          { nombre: 'Pantalón', cantidad: 1, precio_unitario: 40 },
          { nombre: 'Zapatos', cantidad: 1, precio_unitario: 25.5 }
        ]
      },
      {
        id: 2,
        usuario: 'laura88',
        fecha: '2025-04-09T10:15:00.000Z',
        total: 60,
        detalles: [
          { nombre: 'Blusa', cantidad: 2, precio_unitario: 30 }
        ]
      }
    ];

    setCompras(mockData);
  }, []);

  return (
    <div className="compras-admin">
      <h2>🧾 Compras Realizadas</h2>
      {compras.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        compras.map((compra) => (
          <div key={compra.id} className="compra-card">
            <h3>Compra #{compra.id}</h3>
            <p><strong>Usuario:</strong> {compra.usuario}</p>
            <p><strong>Fecha:</strong> {new Date(compra.fecha).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ${compra.total.toFixed(2)}</p>

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
                    <td>${p.precio_unitario.toFixed(2)}</td>
                    <td>${(p.cantidad * p.precio_unitario).toFixed(2)}</td>
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
