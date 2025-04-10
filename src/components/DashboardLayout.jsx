import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

const DashboardLayout = ({
  username,
  isAdmin,
  vistaActual,
  onSelectView,
  filtros,
  setFiltros,
  categorias,
  children
}) => {
  return (
    <div className="dashboard-layout">
      <Header username={username} />
      <div className="dashboard-body">
        <Sidebar
          isAdmin={isAdmin}
          vistaActual={vistaActual}
          onSelectView={onSelectView}
          filtros={filtros}
          setFiltros={setFiltros}
          categoriasDisponibles={categorias}
        />
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
