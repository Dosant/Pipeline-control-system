import React from 'react';
import {Link} from 'react-router';
import './Menu.css';
import Dropzone from 'react-dropzone';

const Menu = () => {
  return (
    <div className="Menu">
      <div className="menu-container">
        <div className="box box1">
          <Dropzone style={{heigth: 'auto'}} accept=".json">
            <div className="content">
              <p><i className="fa fa-database" aria-hidden="true" /></p>
              <p>Загрузка БД</p>
            </div>
          </Dropzone>
        </div>
        <Link to="/" className="box box2">
          <div className="content">
            <p>
              <i className="fa fa-play" aria-hidden="true" />
            </p><p>Старт Системы</p>
          </div>
        </Link>
        <Link to="/" className="box box3">
          <div className="content">
            <p><i className="fa fa-list" aria-hidden="true" /></p>
            <p>Результат Работы</p>
          </div>
        </Link>
        <Link to="/help" className="box box4">
          <div className="content">
            <p><i className="fa fa-question" aria-hidden="true" /></p>
            <p>Руководство Пользователя</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
