import React from 'react';
import './Filtros.css';

const Filtros = ({ filtros, setFiltros, categoriasDisponibles }) => {
  return (
    <div className="filtros-container">
      <h3>Filtros</h3>

      <label>Categoría:</label>
      <select
        value={filtros.categoria}
        onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
      >
        <option value="">Todas</option>
        {categoriasDisponibles.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>

      <label>Precio mínimo:</label>
      <input
        type="number"
        placeholder="Ej. 10"
        value={filtros.precioMin}
        onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value })}
      />

      <label>Precio máximo:</label>
      <input
        type="number"
        placeholder="Ej. 100"
        value={filtros.precioMax}
        onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
      />

      <label>Fecha desde:</label>
      <input
        type="date"
        value={filtros.fechaDesde}
        onChange={(e) => setFiltros({ ...filtros, fechaDesde: e.target.value })}
      />

      <label>Fecha hasta:</label>
      <input
        type="date"
        value={filtros.fechaHasta}
        onChange={(e) => setFiltros({ ...filtros, fechaHasta: e.target.value })}
      />
    </div>
  );
};

export default Filtros;
