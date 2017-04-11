import React, { Component } from 'react';
import {Link} from 'react-router';
import Tooltip from 'rc-tooltip';

const icon = stateClass => {
  return (
    <i
      style={{color: '#fff', marginRight: '8px'}}
      className={stateClass.icon}
      aria-hidden="true"
    />
  );
};

class StateBlocks extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="StateBlocks row">
        {data.map((item) => {
          return (
            <div key={item.info.id} className="col-xs-6 col-sm-4 col-md-2">
              <div className="StateBlocks__item" style={{backgroundColor: item.stateClass.color}}>
                <Tooltip placement="left" trigger={['hover']} overlay={<span>{item.shortMessage}</span>}>
                  <div>
                    <h3>{icon(item.stateClass)} {item.state.toFixed(2)}</h3>
                    <p className=""><span className="small">{item.info.id}</span> <br/> <span>{item.info.name}</span></p>
                  </div>
                </Tooltip>
                <hr/>
                <Link className="small" to={{ pathname: '/map', query: { element: item.info.id } }}>
                  Карта
                </Link>
                <br />
                <Link className="small" to={{ pathname: '/browse', query: { element: item.info.id } }}>
                  Подробнее
                </Link>
              </div>
            </div>
          );
        })}

      </div>
    );
  }
}

export default StateBlocks;