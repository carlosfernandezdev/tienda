import React from 'react';
import './Header.css';
import logo from '../assets/tienda.png'; 

const Header = ({ username }) => {
  const handleLogout = () => {
    localStorage.removeItem('usuario'); 
    localStorage.removeItem('carrito'); 
    window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo Tienda" className="header-logo" />
        <h1 className="header-title">Tiendas Carlos Fernández</h1>
      </div>

      <div className="header-right">
        <span className="header-user">👤 Usuario: {username}</span>
        <button className="logout-btn" onClick={handleLogout}>Salir</button>
      </div>
    </header>
  );
};

export default Header;
