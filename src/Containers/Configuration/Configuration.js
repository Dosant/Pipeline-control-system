import React, {Component} from 'react';
import {Link} from 'react-router';
import Header from './Header';
import Step from './Step';
import MiniMap from './MiniMap';
import {getDataCount} from '../../api/data';
import {getElements} from '../../api/elements';
import {checkConnection} from '../../api/realtime';
import AddData from './AddData';
import Card from './Card';


const ChooseElement = () => {
  return (
    <form>
      <div className="row">
        <div className="col-md-5">
          <div className="form-group">
            <label>
              Участок:{' '}
              <small>На данный момент доступен 1 участок: Вельск</small>
            </label>
            <select disabled className="form-control">
              <option>Вельск</option>
            </select>
          </div>
        </div>
        <div className="col-xs-12">
          <MiniMap />
        </div>
      </div>
    </form>
  );
};

const ChooseMode = ({isStatic, isDynamic, selectMode}) => {
  return (
    <div className="row">
      <div className="col-xs-offset-2 col-sm-4 col-xs-8">
        <div
          className={
            `card card--hover card--hover--yellow ${isStatic ? 'card--selected--yellow' : ''}`
          }
          onClick={() => selectMode('static')}
        >
          <div className="content">
            <div className="row">
              <div className="col-xs-4">
                <div className="icon-big icon-warning text-center">
                  <i className="ti-server" />
                </div>
              </div>
              <div className="col-xs-8">
                <div className="numbers">
                  <p style={{fontSize: '24px'}}>Статический</p>
                </div>
              </div>
            </div>
            <div className="footer">
              <hr />
              <div className="stats">
                <i className="ti-server" /> Данные из базы данных или файла
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-4 col-xs-8">
        <div
          className={
            `card card--hover card--hover--blue ${isDynamic ? 'card--selected--blue' : ''}`
          }
          onClick={() => selectMode('dynamic')}
        >
          <div className="content">
            <div className="row">
              <div className="col-xs-4">
                <div className="icon-big icon-info text-center">
                  <i className="ti-reload" />
                </div>
              </div>
              <div className="col-xs-8">
                <div className="numbers">
                  <p style={{fontSize: '24px'}}>Динамический</p>
                </div>
              </div>
            </div>
            <div className="footer">
              <hr />
              <div className="stats">
                <i className="ti-reload" /> Данные получаемые в реальном времени
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
class DynamicMode extends Component {
  constructor() {
    super();
    this.state = {
      isConnected: false
    }

    this.checkConnection = this.checkConnection.bind(this);
  }

  componentDidMount() {
    this.checkConnection();
  }

  checkConnection() {
    checkConnection()
      .then((isConnected) => {
        this.setState({
          isConnected
        });
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-10">
          <p>
            В динамическом режиме предполагается, что новые данные будут в реальном времени поступать на сервер системы. Данные будут проходить обработку, после чего будет синтезироваться новое состояние трубопровода.
          </p>
          <p>
            В этом режиме работы задача системы в реальном времени отображать текущее состояние объекта.
          </p>
          <p>
            В целях осуществления имитационного моделирования, был разработан отдельный модуль, который имитирует снятие показаний с датчиков{' '}
            <a
              href="http://www.ets-by.by/doc/sodk/kot-c/kot-c_passport_1_0.pdf"
              target="_blank"
            >
              КОТ-1.0.
            </a>
          </p>
          <p>
            Для работы в этом режиме необходимо соединение с датчиками или имитационным модулем:
          </p>
        </div>
          {this.renderStatusCard(!this.state.isConnected)}
      </div>
    );
  }

  renderStatusCard(isError = true) {
    return (
      <div className="col-xs-12 row" style={{'marginTop': '16px'}}>
          <div className="col-sm-4 col-xs-8">
            <div className={`card`}>
              <div className="content">
                <div className="row">
                  <div className="col-xs-3">
                    <div className={`icon-big text-center ${isError ? 'icon-danger' : 'icon-success'}`}>
                      <i className={`${isError ? 'ti-alert' : 'ti-check'}`} />
                    </div>
                  </div>
                  <div className="col-xs-9">
                    <div className="">
                      <p style={{textAlign: 'right', fontSize: '18px', marginTop: '8px', lineHeight: '1'}}>{isError ? 'Соединение отсутствует' : 'Соединение установленно'}</p>
                      <div style={{'textAlign': 'right'}}>
                        <button className="btn btn-info btn-simple" style={{ position: 'relative', right: '-20px'}} onClick={this.checkConnection}>Перепроверить <i className="ti-reload" /></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <hr />
                  <div className="stats">
                    <a href="http://kot-1.herokuapp.com" target="_blank">
                      <i className="ti-pulse" />
                      {' '}Перейти к имитацинному модулю
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

class StaticMode extends Component {
  constructor() {
    super();
    this.state = {
      total: null,
      elements: [],
      newDataSets: []
    };

    this.addNewDataSet = this.addNewDataSet.bind(this);
    this.removeNewDataSet = this.removeNewDataSet.bind(this);
    this.dataUploaded = this.dataUploaded.bind(this);
  }

  componentDidMount() {
    getDataCount().then(total => {
      this.setState({
        total
      });
    });

    getElements().then(elements => {
      this.setState({elements});
    });
  }

  dataUploaded(newCount) {
    console.log(newCount);
    this.setState({
      total: newCount
    });
  }

  addNewDataSet() {
    this.setState({
      newDataSets: this.state.newDataSets.concat(Math.random().toFixed(3))
    });
  }

  removeNewDataSet(index) {
    const removedDataSet = [].concat(this.state.newDataSets);
    removedDataSet.splice(index, 1);
    this.setState({
      newDataSets: removedDataSet
    });
  }

  render() {
    if (this.state.total === null) {
      return <p>Загрузка ...</p>;
    } else {
      return (
        <div>
          <p>На данный момент в системе <b>{this.state.total}</b> записей.</p>
          <p>Можно продолжить работу с имющимеся данными или добавить новые</p>
          {this.state.newDataSets.map((_, index) => (
            <div key={_}>
              <Card title={'Добавление данных'}>
                <AddData
                  elements={this.state.elements}
                  handleCancel={() => this.removeNewDataSet(index)}
                  dataUploaded={this.dataUploaded}
                />
              </Card>
              <hr />
            </div>
          ))}
          <div
            style={{
              textAlign: 'center',
              marginTop: '32px',
              marginBottom: '16px'
            }}
          >
            <button
              className="btn btn-success btn-sm btn-fill"
              onClick={this.addNewDataSet}
            >
              Добавить ещё данных
            </button>
          </div>
        </div>
      );
    }
  }
}

class Configuration extends Component {
  constructor() {
    super();
    this.state = {
      isStatic: false,
      isDynamic: false
    };

    this.selectMode = this.selectMode.bind(this);
  }

  selectMode(mode) {
    if (mode === 'dynamic') {
      this.setState({
        isStatic: false,
        isDynamic: true
      });
    } else {
      this.setState({
        isStatic: true,
        isDynamic: false
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <h4 style={{marginLeft: '20px'}}>Конфигурация системы</h4>
          </div>
          <div className="row">
            <Step
              title={'Шаг 1. Участок трубопровода'}
              subtitle={
                'Выбор участка трубопровода из сконфигурированных вариантов'
              }
            >
              <ChooseElement />
            </Step>
            <Step
              title={'Шаг 2. Выбор режима работы'}
              subtitle={'Работа в статическом или динамическом режиме'}
            >
              <ChooseMode
                isDynamic={this.state.isDynamic}
                isStatic={this.state.isStatic}
                selectMode={this.selectMode}
              />
            </Step>
            {this.state.isStatic &&
              <Step
                title={'Шаг 3. Заполнение базы данных'}
                subtitle={
                  'Использование существующих данных или добавление новых'
                }
              >
                <StaticMode />
              </Step>}
            {this.state.isDynamic &&
              <Step
                title={'Шаг 3. Настройка источника динамических данных'}
                subtitle={
                  'Подключение реального трубопровода или его имитационного моделирование'
                }
              >
                <DynamicMode />
              </Step>}

            {(this.state.isStatic || this.state.isDynamic) &&
              <footer
                style={{
                  textAlign: 'center',
                  marginTop: '16px',
                  marginBottom: '32px'
                }}
              >
                <Link to={{pathName: '/', state: {isDynamic: this.state.isDynamic}}} className="btn btn-info">
                  Перейти к работе с системой{' '}
                  <span
                    className="ti-arrow-right"
                    style={{marginLeft: '4px', fontSize: '12px'}}
                  />
                </Link>
              </footer>}
          </div>
        </div>
      </div>
    );
  }
}

export default Configuration;
