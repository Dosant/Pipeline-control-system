// @flow
import React from 'react';
import {withRouter} from 'react-router';
import TableView from '../Components/TableView';
import { getData } from '../api/data';
import type {Data, Element} from '../Types/data';

function serializeFilterConfig(filterConfig: Object) {
  const serializedConfig = {};
  if (filterConfig.elements) {
    serializedConfig.elements = filterConfig.elements.map((element: Element) => element._id);
  }

  if (filterConfig.state) {
    serializedConfig.state = filterConfig.state.min;
  }

  if (filterConfig.date) {
    serializedConfig.date = filterConfig.date;
  }

  return serializedConfig;
}

type State = {
    isLoading: boolean,
    top: number,
    skip: number,
    filterConfig: Object,
    dataSet?: Array<Data>
  };

class Browse extends React.Component {
  state: State;
  initialFilterConfigElementId: string;

  constructor(props: Object) {
    super(props);
    this.state = {
      isLoading: true,
      top: 50,
      skip: 0,
      filterConfig: {}
    };

    /* check for query and apply filters */
    if (props.router) {
      const {element: elementId} = props.router.getCurrentLocation().query;
      if (elementId) {
          this.initialFilterConfigElementId = elementId;
          this.state.filterConfig = {elements: [elementId]};
      }
    }

    (this:any).showMore = this.showMore.bind(this);
    (this:any).onFilterChange = this.onFilterChange.bind(this);
  }

  componentDidMount() {
    this.loadNext();
  }

  showMore() {
    this.loadNext();
  }

  loadNext() {
    return getData(this.state.top, this.state.skip, this.state.filterConfig)
      .then((dataSet: Array<Data>) => {
        this.setState((prevState: State)=> {
          return {
            isLoading: false,
            dataSet: prevState.dataSet ? prevState.dataSet.concat(dataSet) : dataSet,
            skip: prevState.skip + 50
          }
        })
      })
  }

  onFilterChange(filterConfig: Object) {
    console.log(filterConfig);
    this.setState({
      dataSet: [],
      filterConfig: serializeFilterConfig(filterConfig),
      top: 50,
      skip: 0
    }, () => {
      this.loadNext();
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          Загрузка ...
        </div>
      )
    } else {

    }
    return (
      <div>
        <TableView dataSet={this.state.dataSet} onFilterChange={this.onFilterChange} initialFilterConfigElementId={this.initialFilterConfigElementId}/>
        <div>
            <button className="btn center-block" onClick={this.showMore}>
              Загрузить ещё
            </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Browse);
