import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api'; 
import './Login.css';
import logo from '../assets/tienda.png';

const Login = () => {
  const [usuarioInput, setUsuarioInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await login(usuarioInput.trim(), passwordInput); 
      localStorage.setItem('usuario', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-page">
      <div className="login-logo">
        <img src={logo} alt="Logo tienda" />
        <h1>Tiendas Carlos Fernández</h1>
      </div>

      <div className="login-card">
        <h2>Inicio de sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuarioInput}
            onChange={(e) => setUsuarioInput(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
          />
          <button type="submit">Acceder</button>
        </form>
        {error && <div className="login-error">{error}</div>}
        <div className="login-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
