import React, { Component } from 'react';
import {BigCard} from '../Components/Cards';

class About extends Component {
  render() {
    return (
      <div className="row">
          <BigCard title={'О Системе'}>
            <h3>Тут будет общая информация о системе и разработчиках</h3>
          </BigCard>
      </div>
    );
  }
}

export default About;