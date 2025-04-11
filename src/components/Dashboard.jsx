import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import ProductosCliente from './ProductosCliente';
import Carrito from './Carrito';
import Gracias from './Gracias';
import AdminProductos from './AdminProductos';
import FormularioProducto from './FormularioProducto';
import ComprasAdmin from './ComprasAdmin';
import { getProductos } from '../api';

const Dashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const [vistaActual, setVistaActual] = useState('');
  const [filtros, setFiltros] = useState({
    categoria: '',
    precioMin: '',
    precioMax: '',
    fechaDesde: '',
    fechaHasta: ''
  });
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [ultimaCompra, setUltimaCompra] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('usuario'));
    if (userData) {
      setUsuario(userData);
      setVistaActual(userData.rol === 'admin' ? 'admin' : 'productos');
    } else {
      setUsuario({ usuario: 'Invitado', rol: 'cliente' });
      setVistaActual('productos');
    }

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);

    refrescarProductos();
  }, []);

  const refrescarProductos = async () => {
    try {
      const productosDesdeApi = await getProductos();
      setProductos(productosDesdeApi);
      const categoriasUnicas = [...new Set(productosDesdeApi.map(p => p.categoria))];
      setCategorias(categoriasUnicas);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const confirmarCompra = () => {
    setUltimaCompra(carrito);
    setCarrito([]);
    localStorage.removeItem('carrito');
    setVistaActual('gracias');
  };

  if (!usuario) return <p>Cargando...</p>;

  const esAdmin = usuario.rol === 'admin';

  return (
    <DashboardLayout
      username={usuario.usuario}
      isAdmin={esAdmin}
      vistaActual={vistaActual}
      onSelectView={setVistaActual}
      filtros={filtros}
      setFiltros={setFiltros}
      categorias={categorias}
    >
      {esAdmin && vistaActual === 'admin' && (
        <AdminProductos productos={productos} onRecargar={refrescarProductos} />
      )}

      {esAdmin && vistaActual === 'nuevo' && (
        <FormularioProducto onProductoAgregado={refrescarProductos} />
      )}

      {esAdmin && vistaActual === 'compras' && (
        <ComprasAdmin />
      )}

      {!esAdmin && vistaActual === 'productos' && (
        <ProductosCliente
          filtros={filtros}
          carrito={carrito}
          setCarrito={setCarrito}
          productos={productos}
        />
      )}

      {!esAdmin && vistaActual === 'carrito' && (
        <Carrito
          carrito={carrito}
          setCarrito={setCarrito}
          onConfirmarCompra={confirmarCompra}
        />
      )}

      {!esAdmin && vistaActual === 'gracias' && (
        <Gracias
          productos={ultimaCompra}
          onVolver={() => setVistaActual('productos')}
        />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
