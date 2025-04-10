import React from 'react';
import './Sidebar.css';
import Filtros from './Filtros';

const Sidebar = ({
  isAdmin,
  onSelectView,
  vistaActual,
  filtros,
  setFiltros,
  categoriasDisponibles
}) => {
  const mostrarFiltros = vistaActual === 'productos';

  return (
    <aside className="sidebar">
      {mostrarFiltros && (
        <>
          <Filtros
            filtros={filtros}
            setFiltros={setFiltros}
            categoriasDisponibles={categoriasDisponibles}
          />
          <button
            className="sidebar-btn limpiar-btn"
            onClick={() =>
              setFiltros({
                categoria: '',
                precioMin: '',
                precioMax: '',
                fechaDesde: '',
                fechaHasta: ''
              })
            }
          >
            🧹 Limpiar filtros
          </button>
        </>
      )}

      <div className="sidebar-footer">
        {vistaActual === 'productos' ? (
          <button className="sidebar-btn carrito-btn" onClick={() => onSelectView('carrito')}>
            🛒 Ver carrito
          </button>
        ) : (
          <button className="sidebar-btn" onClick={() => onSelectView('productos')}>
            🧺 Ver productos
          </button>
        )}

        {isAdmin && (
          <button className="sidebar-btn nuevo-btn" onClick={() => onSelectView('admin')}>
            ➕ Nuevo Producto
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
