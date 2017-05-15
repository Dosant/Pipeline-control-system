// @flow
import React, {Component} from 'react';
import {getSystemStates} from '../api/states';
import {Link} from 'react-router';
import moment from 'moment';

import {TableListBody} from '../Components/TableView/TableList';
import {BigCard, SmallCard} from '../Components/Cards';
import StateBlocks from '../Components/StateBlocks';
import {registerForUpdates, shouldRegisterForUpdates} from '../api/realtime';


const formatDate = ({from, to}) => {
  return `${moment(from).format('L : LTS')} - ${moment(to).format('L : LTS')}`;
};

const icon = stateClass => {
  return (
    <i
      style={{color: stateClass.color}}
      className={stateClass.icon}
      aria-hidden="true"
    />
  );
};
type State = {
  isLoading: boolean,
  top: number,
  skip: number,
  systemStates: Array<Object>
};

class Page extends Component {
  state: State;
  unregisterFunction: () => void;

  constructor() {
    super();
    this.state = {
      skip: 0,
      top: 5,
      isLoading: true,
      systemStates: []
    };

    (this: any).handleNextPage = this.handleNextPage.bind(this);
    (this: any).reloadData = this.reloadData.bind(this);
  }

  componentDidMount() {
    if (shouldRegisterForUpdates()) {
      this.unregisterFunction = registerForUpdates(this.reloadData);
    }
    this.loadNext();
  }

  componentWillUnmount() {
    if (this.unregisterFunction) {
      this.unregisterFunction();
    }
  }

  handleNextPage() {
    this.loadNext();
  }

  loadNext() {
    return getSystemStates(false, this.state.top, this.state.skip).then((
      result: Array<Object>
    ) => {
      this.setState(prevState => {
        return {
          isLoading: false,
          systemStates: prevState.systemStates.concat(result),
          skip: prevState.skip + prevState.top
        };
      });
    });
  }

  reloadData() {
    this.setState(
      () => {
        return {
          isLoading: true,
          systemStates: [],
          skip: 0
        };
      },
      () => {
        this.loadNext();
      }
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <div className="row">
            <div className="col-xs-12">
              <h3 className="title">Сейчас</h3>
            </div>
          </div>
          <div className="row">
            <BigCard
              title={'Отчет о состоянии системы'}
              date={formatDate(Date.now())}
            >
              Загрузка
            </BigCard>
          </div>
        </div>
      );
    }

    const currentState = this.state.systemStates.slice(0, 1)[0];
    const previousStates = this.state.systemStates.slice(
      1,
      this.state.systemStates.length
    );

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h3 className="title">Сейчас</h3>
          </div>
        </div>
        <div className="row">
          <BigCard
            title={'Отчет о состоянии системы'}
            date={formatDate(currentState.date)}
          >
            <div className="row" style={{marginBottom: '20px'}}>
              <div className="col-xs-2">
                <div className="icon-big" style={{textAlign: 'center'}}>
                  {icon(currentState.stateClass)}
                </div>
              </div>
              <div className="col-xs-10">
                <h4 className="no-top-margin">
                  Состояние трубопровода: {currentState.stateClass.name}
                </h4>
                <h5 style={{margin: 0}}>
                  {currentState.stateClass.action && currentState.stateClass.action.message}
                </h5>
                <h6 style={{margin: 0}}>
                  {currentState.criticalData.shortMessage}
                </h6>
              </div>
            </div>
            {(currentState.stateClass._id === '3' ||
              currentState.stateClass._id === '4') &&
              <div>
                <hr />
                <div className="row" style={{marginTop: '36px'}}>
                  <div className="col-xs-12">
                    <h4 className="title">Аварийные участки:</h4>
                    <TableListBody dataSet={currentState.criticalDataArray} />
                  </div>
                </div>
              </div>}
            <div>
              <hr />
              <div className="row" style={{marginTop: '36px'}}>
                <div className="col-xs-12">
                  <h4 className="title">Все участки:</h4>
                  {<StateBlocks data={currentState.currentDataSet}/>}
                </div>
              </div>
            </div>
            <div>
              <hr />
              <div className="row" style={{marginTop: '36px'}}>
                <div className="col-xs-12" style={{textAlign: 'right'}}>
                  <Link to="/map" className="btn btn-info btn-simple">
                    Посмотреть на карте
                  </Link>
                  <Link to="/browse" className="btn btn-info btn-simple">
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          </BigCard>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <h3 className="title">История</h3>
          </div>
        </div>
        <div className="row">
          {previousStates.map((state, index) => {
            return (
              <BigCard
                key={index}
                title={'Отчет о состоянии системы'}
                date={formatDate(state.date)}
              >
                <div className="row" style={{marginBottom: '20px'}}>
                  <div className="col-xs-2">
                    <div className="icon-big" style={{textAlign: 'center'}}>
                      {icon(state.stateClass)}
                    </div>
                  </div>
                  <div className="col-xs-10">
                    <h4 className="no-top-margin">
                      Состояние: {state.stateClass.name}
                    </h4>
                    <h5 style={{margin: 0}}>
                      {state.stateClass.action &&
                        state.stateClass.action.message}
                    </h5>
                    <h6 style={{margin: 0}}>
                      {state.criticalData.shortMessage}
                    </h6>
                  </div>
                </div>
                <div>
                  <hr />
                  <div className="row" style={{marginTop: '12px'}}>
                    <div className="col-xs-12" style={{textAlign: 'right'}}>
                      <Link to="/browse" className="btn btn-info btn-simple">
                        Подробнее
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                {state.criticalDataArray.length
                  ? <div className="row" style={{marginTop: '36px'}}>
                      <div className="col-xs-12">
                        <h4 className="title">Проблемные участки:</h4>
                        <TableListBody dataSet={state.criticalDataArray} />
                      </div>
                    </div>
                  : <div className="row" style={{marginTop: '36px'}}>
                      <div className="col-xs-12">
                        <h4 className="title" style={{marginBottom: '36px'}}>Проблемных участков нет</h4>
                      </div>
                    </div>}

              </BigCard>
            );
          })}
        </div>
        <div style={{textAlign: 'center'}}>
          <button className="btn" onClick={this.handleNextPage}>
            Загрузить ещё
          </button>
        </div>
      </div>
    );
  }
}

export default Page;
