import React, {Component} from 'react';
import {Link} from 'react-router';
import Header from './Header';
import Step from './Step';

class PreConfiguration extends Component {
  render() {
    return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <Step title={'Конфигурация системы'} subtitle={'Выбор участка трубопровода, настройка режима работы и источника данных'}>
            <div className="row">
              <div className="col-xs-12">
                <p>Прежде чем начать работу, систему необходимо сгонфигурировать.</p>
                <p>Конфигурация включает 3 шага:</p>
                <ol>
                  <li>Выбор участка трубопровода</li>
                  <li>Выбор режима работы</li>
                  <li>Выбор источника данных </li>
                </ol>
                <p>Можно сразу перейти к анализу состояния трубопровода, используя стандартную конфигурацию:</p>
                <ol>
                  <li>Трубопровод: Вельск</li>
                  <li>Режим работы: предзагруженные данные</li>
                  <li>Источник данных: <a href="https://raw.githubusercontent.com/Dosant/Pipeline-control-system/master/data/data.json">БД</a></li>
                </ol>
                <p><Link to="/">Сразу перейти к анализу <span className="ti-arrow-right" style={{marginLeft: '4px', fontSize: '12px'}}></span></Link></p>
                <p>Или можно сгонфигурировать вручную:</p>
                <p><Link to="/configuration">Перейти к конфигурации <span className="ti-arrow-right" style={{marginLeft: '4px', fontSize: '12px'}}></span></Link></p>

              </div>
            </div>
          </Step>
        </div>
      </div>
    </div>);
  }
}

export default PreConfiguration;
