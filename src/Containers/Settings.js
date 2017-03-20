import React, { Component } from 'react';
import {BigCard} from '../Components/Cards';

class Settings extends Component {
  render() {
    return (
      <div className="row">
        <BigCard title={'Настройки'}>
            <h3>Тут будут настройки и загрузка базы данных. Смена режимов работы</h3>
          </BigCard>
      </div>
    );
  }
}

export default Settings;