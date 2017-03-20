import React, {Component} from 'react';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {getElements} from '../../Services/Data';
import {getStates} from '../../Services/State';

const elementsForSelect = getElements().map(element => {
  return {
    value: element.id,
    label: element.name,
    original: element,
  };
});

const statesForSelect = getStates().map(state => {
  return {
    value: state.id,
    label: state.adj,
    original: state,
  };
});

class TableFilter extends Component {
  constructor(props) {
    super(props);

    // TODO: Cover not only initialFilterConfig.elements filter with length === 1;
    let elemets;
    const initialFilterConfig = props.initialFilterConfig;
    if (initialFilterConfig.elements && initialFilterConfig.elements[0]) {
      const elementId = initialFilterConfig.elements[0].id;
      const element = elementsForSelect.find((element) => element.value === elementId);
      elemets = [element];
    }

    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
      stateLevel: statesForSelect[0].value,
      elements: elemets || [],
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onStateLevelChange = this.onStateLevelChange.bind(this);
    this.onElementsChange = this.onElementsChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }

  applyFilter() {
    const filterConfig = {};
    if (this.state.startDate || this.state.endDate) {
      filterConfig.date = {
        start: +this.state.startDate || new Date(0).getTime(),
        end: +this.state.endDate || new Date().getTime(),
      };
    }

    if (this.state.stateLevel) {
      filterConfig.state = !this.state.stateLevel
        ? statesForSelect[0].original
        : statesForSelect.find(
            state => state.value === this.state.stateLevel,
          ).original;
    }

    if (this.state.elements && this.state.elements.length) {
      filterConfig.elements = this.state.elements.map(
        element => element.original,
      );
    }

    this.props.onApplyFilter(filterConfig);
  }

  resetFilter() {
    this.setState(
      {
        focusedInput: null,
        startDate: null,
        endDate: null,
        stateLevel: statesForSelect[0].value,
        elements: [],
      },
      () => {
        this.applyFilter();
      },
    );
  }

  onDateChange({startDate, endDate}) {
    this.setState({
      startDate,
      endDate,
    });
  }

  onFocusChange(focus) {
    this.setState({
      focusedInput: focus,
    });
  }

  isOutsideRange() {
    return false;
  }

  onStateLevelChange(newState) {
    this.setState({
      stateLevel: (newState && newState.value) || null,
    });
  }

  onElementsChange(newElements) {
    this.setState({
      elements: newElements || [],
    });
  }

  render() {
    return (
      <form style={{padding: '24px 0px'}}>
        <h4 className="title">Фильтр</h4>
        <div className="form-group">
          <label>Выбор даты: От - До</label>
          <DateRangePicker
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            focusedInput={this.state.focusedInput}
            onDatesChange={this.onDateChange}
            onFocusChange={this.onFocusChange}
            startDatePlaceholderText={'Дата Начала'}
            endDatePlaceholderText={'Дата Конца'}
            showClearDates
            isOutsideRange={this.isOutsideRange}
            isDayBlocked={this.isOutsideRange}
            numberOfMonths={1}
          />
        </div>
        <div className="form-group">
          <label>Состояние узла: минимальный уровень</label>
          <Select
            value={this.state.stateLevel}
            options={statesForSelect}
            onChange={this.onStateLevelChange}
            clearable={false}
            noResultsText={'Уровень не найден'}
            placeholder={'Выберите минимальный уровень состояния'}
          />
        </div>
        <div className="form-group">
          <label>Выбор узлов</label>
          <Select
            multi={true}
            value={this.state.elements}
            options={elementsForSelect}
            onChange={this.onElementsChange}
            noResultsText={'Узел не найден'}
            placeholder={'Выберите узлы трубопровода'}
          />
        </div>
        <div style={{textAlign: 'center'}}>
          <button
            type="button"
            className="btn btn-danger btn-simple"
            onClick={this.resetFilter}
          >
            Очистить фильтр
          </button>
          <button
            type="button"
            className="btn btn-info btn-simple"
            onClick={this.applyFilter}
          >
            Применить фильтр
          </button>
        </div>
      </form>
    );
  }
}

export default TableFilter;
