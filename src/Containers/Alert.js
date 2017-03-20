import React, {Component} from 'react';
import {BigCard} from '../Components/Cards';
import {getSystemState} from '../Services/Data';
import {Link} from 'react-router';
import moment from 'moment';
import {TableListBody} from '../Components/TableView/TableList';

const {systemState} = getSystemState();
const crtiticalSystemStates = systemState.filter(({stateClass}) => {
  return stateClass.id === '3' || stateClass.id === '4'
});


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

class Alert extends Component {
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
            <h3 className="title">Обзор принятых решений</h3>
          </div>
        </div>
        <div className="row">
          {crtiticalSystemStates.slice(0, this.state.top).map((state, index) => {
            return (
              <BigCard
                key={index}
                title={'Отчет о принятом решении'}
                date={formatDate(state.date)}
              >
                <div className="row" style={{marginBottom: '20px'}}>
                  <div className="col-xs-12">
                    <h4 className="no-top-margin">
                      Состояние Системы:{' '}
                      {icon(state.stateClass)}
                      {' '}
                      {state.stateClass.name}
                    </h4>
                  </div>
                </div>
                {state.criticalData.isCritical &&
                  <div>
                    <hr />
                    <div className="row" style={{marginTop: '36px'}}>
                      <div className="col-xs-12">
                        <h4 className="title">Причина:</h4>
                        <TableListBody data={state.criticalDataArray} />
                      </div>
                    </div>
                    <hr />
                  </div>}
                <div className="row" style={{marginTop: '36px'}}>
                  <div className="col-xs-12">
                    <h4 className="title">Действие:</h4>
                    <p style={{marginTop: '16px'}}>
                      {state.criticalData.message}
                    </p>
                  </div>
                </div>
                <div>
                  <hr />
                  <div className="row" style={{marginTop: '36px'}}>
                    <div className="col-xs-12" style={{textAlign: 'right'}}>
                      <Link to="/browse" className="btn btn-info btn-simple">
                        Подробнее
                      </Link>
                    </div>
                  </div>
                </div>
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

export default Alert;
