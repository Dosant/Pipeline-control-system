//@flow
import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import type {Element} from '../../types/data';

const TooltipWrapper = ({message, children}) => {
  return (
    <Tooltip placement="bottom" trigger={['hover']} overlay={<span>{message}</span>}><span style={{cursor: 'pointer'}}>{children}</span></Tooltip>
  );
}

const TableRowInput = ({elementId, propertyType, propertyName}: {elementId: string, propertyType: string, propertyName: string}) => {
  return (
    <div className="form-group">
      <input name={{id: `${elementId}-${propertyType}`}} type="number" className="form-control border-input" placeholder={propertyName} min={0} />
    </div>
  )
}
const TableRow = ({ element }: {element: Element}) => {
  return (
    <tr className='js-elementDataRow' data-id={element._id}>
      <td>{element._id}</td>
      <td>{element.name}</td>
      <td>
        <TableRowInput elementId={element._id} propertyType={'isolation'} propertyName={'Изоляция, кОм'}/>
      </td>
      <td>
        <TableRowInput elementId={element._id} propertyType={'resistance'} propertyName={'Сопротивление, Ом'}/>
      </td>
      <td>
        <TableRowInput elementId={element._id} propertyType={'power'} propertyName={'Заряд, %'}/>
      </td>
    </tr>
  );
};

class AddDataTable extends Component {
  container: HTMLElement;
  props: {
    elements: Array<Element>
  };

  constructor (){
    super();
    (this:any).randomFill = this.randomFill.bind(this);
  }

  randomFill() {
    const TableRows = Array.from(this.container.getElementsByClassName('js-elementDataRow'));
    TableRows.forEach((tableRow) => {
      const inputs = Array.from(tableRow.getElementsByTagName('input'));
      inputs.forEach((input) => {
        input.value = (Math.random() * 100).toFixed(2).replace(',', '.');
      });
    });
  }

  render() {
    return (
      <div className="content table-responsive table-full-width" ref={(element) => this.container = element}>
        <button className="btn btn-primary btn-sm btn-simple" onClick={this.randomFill}>Случайно</button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID узла</th>
              <th>Имя узла</th>
              <th><TooltipWrapper message={'Состояние изоляции. Если сопротивление < 5 кОм - Критическое состояние'}><span>Изоляция, кОм</span></TooltipWrapper></th>
              <th><TooltipWrapper message={'Состояние сигнальных проводников. Если сопротивление > 200 Ом - Критическое состояние'}><span>Сопротивление, Ом</span></TooltipWrapper></th>
              <th><TooltipWrapper message={'Если заряд батареи датчика < 20%, то это критическое состояние'}><span>Заряд, %</span></TooltipWrapper></th>
            </tr>
          </thead>
          <tbody>
            {this.props.elements.map((element) => (
              <TableRow key={element._id} element={element}/>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AddDataTable;