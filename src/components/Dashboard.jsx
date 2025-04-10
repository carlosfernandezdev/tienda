import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import ProductosCliente from './ProductosCliente';
import Carrito from './Carrito';
import Gracias from './Gracias';

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
  const [categorias, setCategorias] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [ultimaCompra, setUltimaCompra] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('usuario'));
    if (userData) setUsuario(userData);
    else setUsuario({ usuario: 'Invitado', rol: 'cliente' });

    const productosGuardados = JSON.parse(localStorage.getItem('productos'));
    if (!productosGuardados || productosGuardados.length === 0) {
      const demo = [
        {
          id: 1,
          nombre: 'Camisa',
          categoria: 'Ropa',
          precio: 20,
          proveedor: 'Proveedor A',
          stock: 10,
          fecha: '2025-04-01',
          imagen: 'https://cdn-icons-png.flaticon.com/512/892/892458.png'
        },
        {
          id: 2,
          nombre: 'Pantalón',
          categoria: 'Ropa',
          precio: 35,
          proveedor: 'Proveedor B',
          stock: 5,
          fecha: '2025-04-03',
          imagen: 'https://cdn-icons-png.flaticon.com/512/892/892482.png'
        },
        {
          id: 3,
          nombre: 'Zapatos',
          categoria: 'Calzado',
          precio: 50,
          proveedor: 'Proveedor C',
          stock: 8,
          fecha: '2025-04-04',
          imagen: 'https://cdn-icons-png.flaticon.com/512/892/892499.png'
        }
      ];
      localStorage.setItem('productos', JSON.stringify(demo));
      setCategorias([...new Set(demo.map(p => p.categoria))]);
    } else {
      setCategorias([...new Set(productosGuardados.map(p => p.categoria))]);
    }

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
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
        <ProductosCliente filtros={filtros} carrito={carrito} setCarrito={setCarrito} />
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
