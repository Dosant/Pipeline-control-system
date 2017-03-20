import React from 'react';
import {Link, withRouter} from 'react-router';

const Sidebar = ({props, router}) => {
  const isActiveClass = (location) => router.isActive(location, true) ? 'active' : '';
  return (
    <div
      className="sidebar"
      data-background-color="white"
      data-active-color="danger"
    >
      <div className="sidebar-wrapper">
        <div className="logo">
          <Link to="/" className="simple-text">
            Система управления трубопроводом
          </Link>
        </div>
        <ul className="nav">
          <li className={isActiveClass('/')}>
            <Link to="/">
              <i className="ti-panel" />
              <p>Состояние системы</p>
            </Link>
          </li>
          <li className={isActiveClass('/map')}>
            <Link to="/map">
              <i className="ti-map" />
              <p>Карта трубопровода</p>
            </Link>
          </li>
          <li className={isActiveClass('/browse')}>
            <Link to="/browse">
              <i className="ti-view-list-alt" />
              <p>Обзор показаний</p>
            </Link>
          </li>
          <li className={isActiveClass('/alerts')}>
            <Link to="/alerts">
              <i className="ti-bell" />
              <p>Принятые решения</p>
            </Link>
          </li>
          <li className={isActiveClass('/stats')}>
            <Link to="/stats">
              <i className="ti-panel" />
              <p>Статистика</p>
            </Link>
          </li>
          <li className="active-pro">
            <a>
              <p style={{textAlign: 'center'}}>Досов БГУ, 2017 (с)</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
