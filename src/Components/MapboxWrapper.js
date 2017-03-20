import React, {Component} from 'react';
import {Link} from 'react-router';
import ReactMapboxGl, {
  Layer,
  Feature,
  Popup,
  GeoJSONLayer,
  ScaleControl,
  ZoomControl,
} from 'react-mapbox-gl';
import moment from 'moment';

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

const elementToGeoArray = (elem) => elem ? [elem.geo.latitude, elem.geo.longitude] : null;

const containerStyle = {
  height: `calc(100vh - 200px)`,
  width: '100%',
};

const defaultCenter = [42.04589641453336, 61.0912082111052];

const accessToken = 'pk.eyJ1IjoiZG9zYW50IiwiYSI6ImNpemg4N2p1NDAxN2QzMmxidXMwbHlnZmUifQ.CVy7UYXLfttRnruZ1R7GbA';
const style = 'mapbox://styles/mapbox/light-v9';

class MapboxWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: null,
      center: elementToGeoArray(props.initialElement) || defaultCenter,
      zoom: [11],
      element: props.initialElement || null,
    };

    this.onDrag = this.onDrag.bind(this);
  }

  onDrag() {
    if (this.state.element) {
      this.setState({
        element: null,
      });
    }
  }

  handleElementClick(element, {feature}) {
    this.setState({
      center: feature.geometry.coordinates,
      zoom: [12],
      element,
    });
  }

  render() {
    const {geojson, elements} = this.props;
    const {element} = this.state;

    return (
      <ReactMapboxGl
        style={style}
        accessToken={accessToken}
        center={this.state.center}
        movingMethod={'jumpTo'}
        containerStyle={containerStyle}
        zoom={[11]}
        maxZoom={20}
        minZoom={10}
        onDrag={this.onDrag}
      >
        <ScaleControl />
        <ZoomControl />
        <GeoJSONLayer
          data={geojson}
          lineLayout={{
            'line-cap': 'round',
            'line-join': 'round',
          }}
          linePaint={{
            'line-opacity': 0.75,
            'line-color': '#333',
            'line-width': 2,
          }}
        />
        {elements.map(element => {
          return this.getLayersForElement(element);
        })}

        {element &&
          <Popup
            key={`element-popup-${element.id}`}
            offset={[0, -50]}
            coordinates={elementToGeoArray(element)}
          >
            {this.renderPopup(element)}
          </Popup>}

      </ReactMapboxGl>
    );
  }

  renderPopup(element) {
    return (
      <div>
        <h5>Узел: {element.name}</h5>
        <h6>Последние показания:</h6>
        <ol>
          {element.lastData.map((data, index) => {
            return (
              <li key={index}>
                <span>{icon(data.stateClass)} {data.state} : {formatDate(data.date)}</span>
              </li>
            );
          })}
        </ol>
        <Link to={{ pathname: '/browse', query: { element: element.id } }}>Подробнее...</Link>
      </div>
    );
  }

  getLayersForElement(element) {
    const getRadius = state => {
      return Math.ceil(5 + state * 10);
    };
    return [
      (
        <Layer
          type="circle"
          key={`element-circle-${element.id}`}
          id={`element-circle-${element.id}`}
          paint={{
            'circle-radius': getRadius(element.lastState),
            'circle-color': element.lastStateClass.color,
          }}
        >
          <Feature
            onClick={this.handleElementClick.bind(this, element)}
            coordinates={elementToGeoArray(element)}
          />
        </Layer>
      ),
      (
        <Layer
          type="symbol"
          key={`element-name-${element.id}`}
          id={`element-name-${element.id}`}
          layout={{
            'text-field': element.name,
            'text-offset': [1, 0.5],
            'text-anchor': 'top',
          }}
          paint={{
            'text-color': '#333',
          }}
        >
          <Feature
            coordinates={elementToGeoArray(element)}
          />
        </Layer>
      ),
    ];
  }
}

export default MapboxWrapper;
