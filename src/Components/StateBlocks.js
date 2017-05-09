// @flow
import React, { Component } from 'react';
import {Link} from 'react-router';
import Tooltip from 'rc-tooltip';
import type { Data } from '../Types/data';

const icon = stateClass => {
  return (
    <i
      style={{color: '#fff', marginRight: '8px'}}
      className={stateClass.icon}
      aria-hidden="true"
    />
  );
};

const BlockPopover = ({item}: {item: Data}) => {
  return (
    <div style={{maxWidth: '240px'}}>
      <p className="">{item.shortMessage}</p>
      <hr />
      <p>Показания:</p>
      <ul>
        <li><span style={{backgroundColor: item.fuzzificatedData.isolation.stateClass.color}}>Изоляция: {item.isolation} ({item.fuzzificatedData.isolation.state})</span></li>
        <li><span style={{backgroundColor: item.fuzzificatedData.resistance.stateClass.color}}>Сопротивление: {item.resistance} ({item.fuzzificatedData.resistance.state})</span></li>
        <li><span style={{backgroundColor: item.fuzzificatedData.power.stateClass.color}}>Заряд: {item.power} ({item.fuzzificatedData.power.state})</span></li>
      </ul>
    </div>)
}

class StateBlocks extends Component {
  props: {
    data: Array<Data>
  }
  render() {
    const { data } = this.props;
    return (
      <div className="StateBlocks row">
        {data.map((item: Data) => {
          return (
            <div key={item.element._id} className="col-xs-6 col-sm-4 col-md-2">
              <div className="StateBlocks__item" style={{backgroundColor: item.stateClass.color}}>
                <Tooltip placement="left" trigger={['hover']} overlay={<BlockPopover item={item}/>}>
                  <Link className="block-link" to={{ pathname: '/browse', query: { element: item.element._id } }}>
                    <h3>{icon(item.stateClass)} {item.state.toFixed(2)}</h3>
                    <p className=""><span className="small">{item.element._id}</span> <br/> <span>{item.element.name}</span></p>
                  </Link>
                </Tooltip>
                <hr/>
                <div className="StateBlocks__footer">
                  <Link className="small" to={{ pathname: '/map', query: { element: item.element._id } }}>
                    Карта
                  </Link>
                  <br />
                  <Link className="small" to={{ pathname: '/browse', query: { element: item.element._id } }}>
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    );
  }
}

export default StateBlocks;