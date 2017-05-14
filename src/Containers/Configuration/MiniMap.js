import React, { Component } from 'react';
import { MiniMap } from '../../Components/MapboxWrapper';
import geoData from '../../../data/geo.pipe.json';
import {getElements} from '../../api/elements';

class MiniMapWrapper extends Component {
  constructor() {
    super();
    this.state = {
      elements: []
    }
  }

  componentDidMount() {
    getElements()
      .then(elements => {
        this.setState({
          elements
        })
      });
  }

  render() {
    return (
      <div>
        {
          this.state.elements.length ? (
            <MiniMap geojson={geoData} elements={this.state.elements}/>
          ) : (
            <span>Загрузка</span>
          )

        }
      </div>
    );
  }
}

export default MiniMapWrapper;