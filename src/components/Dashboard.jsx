import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import ProductosCliente from './ProductosCliente';
import Carrito from './Carrito';
import Gracias from './Gracias';
import { getProductos } from '../api'; 

const Dashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const [vistaActual, setVistaActual] = useState('productos');
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
    if (userData) setUsuario(userData);
    else setUsuario({ usuario: 'Invitado', rol: 'cliente' });

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);

    const cargarProductos = async () => {
      try {
        const productosDesdeApi = await getProductos();
        setProductos(productosDesdeApi);
        const categoriasUnicas = [...new Set(productosDesdeApi.map(p => p.categoria))];
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    cargarProductos();
  }, []);

  const confirmarCompra = () => {
    setUltimaCompra(carrito);
    setCarrito([]);
    localStorage.removeItem('carrito');
    setVistaActual('gracias');
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <DashboardLayout
      username={usuario.usuario}
      isAdmin={usuario.rol === 'admin'}
      vistaActual={vistaActual}
      onSelectView={setVistaActual}
      filtros={filtros}
      setFiltros={setFiltros}
      categorias={categorias}
    >
      {vistaActual === 'productos' && (
        <ProductosCliente
          filtros={filtros}
          carrito={carrito}
          setCarrito={setCarrito}
          productos={productos}
        />
      )}
      {vistaActual === 'carrito' && (
        <Carrito carrito={carrito} setCarrito={setCarrito} onConfirmarCompra={confirmarCompra} />
      )}
      {vistaActual === 'gracias' && (
        <Gracias productos={ultimaCompra} onVolver={() => setVistaActual('productos')} />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
