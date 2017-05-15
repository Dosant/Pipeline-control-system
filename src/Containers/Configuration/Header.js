import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <nav className="navbar navbar-default" style={{backgroundColor: '#fff'}}>
    <div className="container-fluid">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">Система управления трубопроводом</Link>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/help">
              <i className="ti-help" />
              <p>Руководство пользователя</p>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <i className="ti-info" />
              <p>О системе</p>
            </Link>
          </li>
          <li>
            <Link to={{pathname: '/login', state: {user: null}}}>
              <i className="ti-user" />
              <p>Выйти</p>
            </Link>
          </li>
          <li>
            <a>v0.3</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;