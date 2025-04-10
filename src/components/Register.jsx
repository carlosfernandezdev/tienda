import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { guardarUsuario } from '../db';
import logo from '../assets/tienda.png';
import './Register.css';

const Register = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('cliente');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!usuario || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      await guardarUsuario({ usuario, password, rol });
      navigate('/');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <div className="register-page">
      <div className="register-logo">
        <img src={logo} alt="Logo tienda" />
        <h1>Tiendas Carlos Fernández</h1>
      </div>

      <div className="register-card">
        <h2>Registro</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit">Registrarse</button>
        </form>
        {error && <div className="register-error">{error}</div>}
        <div className="register-link">
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
