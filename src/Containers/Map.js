import React, {Component} from 'react';
import {withRouter} from 'react-router';
import MapboxWrapper from '../Components/MapboxWrapper';
import {getGeoData, getElements, getElementById} from '../Services/Data';

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
  constructor(props) {
    super(props);
    this.state = {
      element: null,
    };

    if (props.router) {
      const {
        element: elementId,
      } = props.router.getCurrentLocation().query;
      const element = getElementById(elementId);
      if (element) {
        this.state = {
          element,
        };
      }
    }
  }
  render() {
    return (
      <div className="row">
        <BigCard
          title={'Карта трубопровода: Сейчас'}
          date={'Данные представлены в реальном времени'}
        >
          <MapboxWrapper
            geojson={getGeoData()}
            elements={getElements()}
            initialElement={this.state.element}
          />
        </BigCard>
      </div>
    );
  }
}

export default withRouter(Map);
