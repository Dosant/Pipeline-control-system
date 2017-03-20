import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

const formatGeo = geo =>
  `ш: ${(+geo.latitude).toFixed(2)}, д: ${(+geo.longitude).toFixed(2)}`;
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

const TableRow = ({data}) => {
  return (
    <tr>
      <td>{data.info.id}</td>
      <td>{data.info.name}</td>
      <td>
        <Link to={{ pathname: '/map', query: { element: data.info.id } }}>
          <i className="fa fa-location-arrow" aria-hidden="true" />
          {formatGeo(data.info.geo)}
        </Link>
      </td>
      <td>{formatDate(data.date)}</td>
      <td>{data.data.isolation}</td>
      <td>{data.data.resistance}</td>
      <td>{data.data.power}</td>
      <td style={{cursor: 'pointer'}}><Tooltip placement="left" trigger={['hover']} overlay={<span>{data.shortMessage}</span>}><span>{icon(data.stateClass)} {data.stateClass.adj}</span></Tooltip></td>
    </tr>
  );
};

export default TableRow;
