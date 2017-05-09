// @flow;
import React from 'react';
import TableRow from './TableRow';
import Tooltip from 'rc-tooltip';
import type {Data} from '../../Types/data';

const TooltipWrapper = ({message, children}) => {
  return (
    <Tooltip placement="bottom" trigger={['hover']} overlay={<span>{message}</span>}><span style={{cursor: 'pointer'}}>{children}</span></Tooltip>
  );
}

export function TableListBody({dataSet}: {dataSet: Array<Data>}) {
  return (
    <div className="content table-responsive table-full-width">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID узла</th>
            <th>Имя узла</th>
            <th>Геолокация узла</th>
            <th>Дата : Время показаний</th>
            <th><TooltipWrapper message={'Состояние изоляции. Если сопротивление < 5 кОм - Критическое состояние'}><span>Изоляция, кОм</span></TooltipWrapper></th>
            <th><TooltipWrapper message={'Состояние сигнальных проводников. Если сопротивление > 200 Ом - Критическое состояние'}><span>Сопротивление, Ом</span></TooltipWrapper></th>
            <th><TooltipWrapper message={'Если заряд батареи датчика < 20%, то это критическое состояние'}><span>Заряд, %</span></TooltipWrapper></th>
            <th>Состояние</th>
          </tr>
        </thead>
        <tbody>
          {dataSet.map((item: Data) => {
            return <TableRow key={item._id} data={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const TableList = ({dataSet, filterComponent}: {dataSet: Array<Data>, filterComponent: React.Component}) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="header">
            <h4 className="title">Обзор показаний датчиков</h4>
            <p className="category">
              В таблице представленны все данные поступившие в систему. Установите необходимый для анализа фильтр.
            </p>
            {filterComponent}
          </div>
          {dataSet.length > 0
            ? <TableListBody dataSet={dataSet} />
            : <div className="TableView__empty">
                <p>По выбранному фильтру данных не найдено</p>
              </div>}
        </div>
      </div>
    </div>
  );
};

export default TableList;
