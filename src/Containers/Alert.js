// @flow
import React, {Component} from 'react';
import {BigCard} from '../Components/Cards';
import {getSystemStates} from '../api/states';
import {Link} from 'react-router';
import moment from 'moment';
import {TableListBody} from '../Components/TableView/TableList';

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

function unwrap<T>(val: ?T): T {
  if (val == null) throw new Error();
  return val;
}

class Alert extends Component {
  state: {
    top: number,
    nextSkip: number,
    isLoading: boolean,
    systemStates?: Array<Object>
  };

  constructor() {
    super();
    this.state = {
      top: 5,
      nextSkip: 0,
      isLoading: true
    };
    (this:any).handleNextPage = this.handleNextPage.bind(this);
    (this:any).loadNext = this.loadNext.bind(this);
  }

  componentDidMount() {
    this.loadNext();
  }

  handleNextPage() {
    this.loadNext();
  }

  loadNext() {
    return getSystemStates(true, this.state.top, this.state.nextSkip)
      .then(({skip, result}: {skip: number, result: Array<Object>}) => {
        this.setState(( prevState ) => {
          return {
            isLoading: false,
            systemStates: prevState.systemStates ? prevState.systemStates.concat(result) : result,
            nextSkip: skip + prevState.top
          }
        })
      })
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
          {this.state.isLoading ?
          (<span>Загрузка ... </span>) :
          (unwrap(this.state.systemStates).map((state, index) => {
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
                        <TableListBody dataSet={state.criticalDataArray} />
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
            )
          }))}
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
