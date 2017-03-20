import React from 'react';
import {withRouter} from 'react-router';
import TableView from '../Components/TableView';
import {getData, getElementById} from '../Services/Data';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 50,
      skip: 0,
      filterConfig: {},
    };

    /* check for query and apply filters */
    if (props.router) {
      const {element: elementId} = props.router.getCurrentLocation().query;
      if (elementId) {
        const element = getElementById(elementId);
        if (element) {
          this.state.filterConfig.elements = [element];
        }
      }
    }

    this.showMore = this.showMore.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  showMore() {
    this.setState(prevState => {
      prevState.top += prevState.top;
      return prevState;
    });
  }

  onFilterChange(filterConfig) {
    this.setState({
      filterConfig,
      top: 50,
      skip: 0,
    });
  }

  render() {
    const data = getData(
      this.state.skip,
      this.state.top,
      this.state.filterConfig,
    );
    return (
      <div>
        <TableView data={data} onFilterChange={this.onFilterChange} initialFilterConfig={this.state.filterConfig}/>
        <div>
          {data.length >= this.state.top &&
            <button className="btn center-block" onClick={this.showMore}>
              Загрузить ещё
            </button>}
        </div>
      </div>
    );
  }
}

export default withRouter(Browse);
