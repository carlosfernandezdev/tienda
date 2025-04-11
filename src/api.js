const API_URL = 'http://localhost:4000/api';

// Login
export const login = async (usuario, password) => {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Error en login');
  return data;
};

// Registro
export const register = async (usuario, password, rol) => {
  const response = await fetch(`${API_URL}/usuarios/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password, rol })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Error en registro');
  return data;
};

// Obtener productos
export const getProductos = async () => {
  const response = await fetch(`${API_URL}/productos`);
  const data = await response.json();
  if (!response.ok) throw new Error('Error al obtener productos');
  return data;
};

// Crear producto (admin)
export const crearProducto = async (producto) => {
  const response = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Error al crear producto');
  return data;
};

// Registrar compra
export const registrarCompra = async (carrito, usuario_id) => {
    const response = await fetch('http://localhost:4000/api/compras', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carrito, usuario_id })  
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al registrar compra');
    return data;
  };
  
  //Eliminar producto (admin)
  export const eliminarProducto = async (id) => {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al eliminar producto');
    return data;
  };