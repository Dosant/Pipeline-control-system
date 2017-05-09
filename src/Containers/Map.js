//@flow
import React, {Component} from 'react';
import {withRouter} from 'react-router';
import MapboxWrapper from '../Components/MapboxWrapper';
import {getElementsWithState} from '../api/elements';
import type {ElementWithState} from '../Types/data';
import geoData from '../../data/geo.pipe.json';


const BigCard = ({title, date, children}) => {
  return (
    <div className="col-xs-12">
      <div className="card">
        <div className="header">
          <h4 className="title">{title}</h4>
          <p className="category">{date}</p>
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

class Map extends Component {
  state: {
    isLoading: boolean,
    element?: ElementWithState,
    elements?: Array<ElementWithState>
  };

  initialElementId: string;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };

    if (props.router) {
      const {
        element: elementId
      } = props.router.getCurrentLocation().query;
      this.initialElementId = elementId;
    }
  }

  componentDidMount() {
    getElementsWithState(3).then((elements: Array<ElementWithState>) => {
      this.setState({
        isLoading: false,
        elements,
        element: elements.find((element:ElementWithState) => element._id === this.initialElementId)
      });
    });
  }

  render() {
    return (
      <div className="row">
        <BigCard
          title={'Карта трубопровода: Сейчас'}
          date={'Данные представлены в реальном времени'}
        >
          {this.state.isLoading
            ? <span>Загрузка ... </span>
            : <MapboxWrapper
                geojson={geoData}
                elements={this.state.elements}
                initialElement={this.state.element}
              />}
        </BigCard>
      </div>
    );
  }
}

export default withRouter(Map);
