import React, {Component} from 'react';
import TableList from './TableList';
import TableFilter from './TableFilter';


class TableView extends Component {
  render() {
    return (
      <div>
        <TableList data={this.props.data} filterComponent={<TableFilter onApplyFilter={this.props.onFilterChange} initialFilterConfig={this.props.initialFilterConfig}/>}/>
      </div>
    );
  }
}

export default TableView;
