import React from 'react';
import {Link} from 'react-router';
import type {Data, State} from '../../Types/data';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

const formatGeo = (geo) =>
  `ш: ${(+geo.latitude).toFixed(2)}, д: ${(+geo.longitude).toFixed(2)}`;

const formatDate = (ts:Date) => moment(ts).format('L : LTS');

const icon = (stateClass: State) => {
  return (
    <i
      style={{color: stateClass.color}}
      className={stateClass.icon}
      aria-hidden="true"
    />
  );
};

const renderState = ({state, stateClass}: {state: number, stateClass: State}) => {
  if (stateClass._id === '3' || stateClass._id === '4') {
    return (
      <span style={{backgroundColor: stateClass.color, color: '#fff'}}>
        {state}
      </span>
    );
  } else {
    return <span>{state}</span>;
  }
};

const TableRow = ({data}: {data: Data}) => {
  return (
    <tr>
      <td>{data.element._id}</td>
      <td>{data.element.name}</td>
      <td>
        <Link to={{pathname: '/map', query: {element: data.element._id}}}>
          <i className="fa fa-location-arrow" aria-hidden="true" />
          {formatGeo(data.element.geo)}
        </Link>
      </td>
      <td>{formatDate(data.date)}</td>
      <td>
        {data.isolation} ({renderState(data.fuzzificatedData.isolation)})
      </td>
      <td>
        {data.resistance} ({renderState(data.fuzzificatedData.resistance)})
      </td>
      <td>{data.power} ({renderState(data.fuzzificatedData.power)})</td>
      <td style={{cursor: 'pointer'}}>
        <Tooltip
          placement="left"
          trigger={['hover']}
          overlay={<span>{data.shortMessage}</span>}
        >
          <span>
            {icon(data.stateClass)}
            {' '}
            {data.stateClass.adj}
            {' '}(
            {data.state.toFixed(2)}
            )
          </span>
        </Tooltip>
      </td>
    </tr>
  );
};

export default TableRow;
