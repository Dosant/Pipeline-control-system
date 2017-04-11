import React, {Component} from 'react';
import {getSystemState} from '../Services/Data';
import {Link} from 'react-router';
import moment from 'moment';


import {TableListBody} from '../Components/TableView/TableList';
import {BigCard, SmallCard} from '../Components/Cards';
import StateBlocks from '../Components/StateBlocks';
const {currentState, previousStates} = getSystemState();



const formatDate = ts => moment(ts).format('L : LTS');

const icon = stateClass => {
  return (
    <i
      style={{color: stateClass.color}}
      className={stateClass.icon}
      aria-hidden="true"
    />
  );
};

class Page extends Component {
  constructor() {
    super();
    this.state = {
      top: 10,
    };

    this.handleNextPage = this.handleNextPage.bind(this);
  }

  handleNextPage() {
    this.setState(prevState => {
      prevState.top += 10;
      return prevState;
    });
  }

  render() {
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
                <h5 style={{margin: 0}}>{currentState.stateClass.action}</h5>
                <h6 style={{margin: 0}}>
                  {currentState.criticalData.shortMessage}
                </h6>
              </div>
            </div>
            {(currentState.stateClass.id === '3' ||
              currentState.stateClass.id === '4') &&
              <div>
                <hr />
                <div className="row" style={{marginTop: '36px'}}>
                  <div className="col-xs-12">
                    <h4 className="title">Аварийные участки:</h4>
                    <TableListBody data={currentState.criticalDataArray} />
                  </div>
                </div>
              </div>}
            <div>
                <hr />
                <div className="row" style={{marginTop: '36px'}}>
                  <div className="col-xs-12">
                    <h4 className="title">Все участки:</h4>
                    <StateBlocks data={currentState.data}/>
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
          {previousStates.slice(0, this.state.top).map((state, index) => {
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
                      {state.stateClass.action}
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
                {/*<hr />
                <div className="row" style={{marginTop: '36px'}}>
                  <div className="col-xs-12">
                    <h4 className="title">Проблемные участки:</h4>
                    <TableListBody data={currentState.criticalDataArray} />
                  </div>
                </div>*/
                }
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
