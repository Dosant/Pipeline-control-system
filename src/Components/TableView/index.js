//@flow
import React, {Component} from 'react';
import TableList from './TableList';
import TableFilter from './TableFilter';
import type {Data} from '../../Types/data';

class TableView extends Component {
  props: {
    dataSet: Array<Data>,
    onFilterChange: (filterConfig: Object) => void,
    initialFilterConfigElementId: string
  };

  render() {
    return (
      <div>
        <TableList
          dataSet={this.props.dataSet}
          filterComponent={
            (
              <TableFilter
                onApplyFilter={this.props.onFilterChange}
                initialFilterConfigElementId={this.props.initialFilterConfigElementId}
              />
            )
          }
        />
      </div>
    );
  }
}

export default TableView;
