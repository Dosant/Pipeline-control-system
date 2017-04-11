import React from 'react';
import {withRouter, Link} from 'react-router';

const TITLE_MAPPER = {
  '/': 'Общее cостояние cистемы',
  '/browse': 'Обзор показаний датчиков',
  '/map': 'Карта трубопровода',
  '/alerts': 'Обзор принятых решений',
  '/stats': 'Статистика работы трубопровода'
};

const getTitle = router =>
  TITLE_MAPPER[router.getCurrentLocation().pathname] || TITLE_MAPPER['/'];

const Header = ({router}) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar bar1" />
            <span className="icon-bar bar2" />
            <span className="icon-bar bar3" />
          </button>
          <a className="navbar-brand" href="#">{getTitle(router)}</a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            {/*<li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="ti-bell" />
                <p className="notification">5</p>
                <p>Инциденты</p>
                <b className="caret" />
              </a>
              <ul className="dropdown-menu">
                <li><a href="#">Notification 1</a></li>
                <li><a href="#">Notification 2</a></li>
                <li><a href="#">Notification 3</a></li>
                <li><a href="#">Notification 4</a></li>
                <li><a href="#">Another notification</a></li>
              </ul>
            </li>*/}
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
              <Link to="/settings">
                <i className="ti-settings" />
                <p>Настройки</p>
              </Link>
            </li>
            <li>
              <a>v0.2</a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
