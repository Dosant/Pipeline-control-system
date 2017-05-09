// @flow
import React, {Component} from 'react';
import type {Element, State} from '../../Types/data';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {getStates} from '../../api/states';
import {getElements} from '../../api/elements';

type ElementForSelect = {
  value: string,
  label: string,
  original: Element
};

type StateForSelect = {
  value: string,
  label: string,
  original: State
};

const getElementsForSelect = (elements: Array<Element>): Array<ElementForSelect> => {
  return elements.map((element: Element) => {
    return {
      value: element._id,
      label: element.name,
      original: element
    };
  });
};

const getStatesForSelect = (states: Array<State>): Array<StateForSelect> => {
  return states.map((state: State) => {
    return {
      value: state._id,
      label: state.name,
      original: state
    };
  });
};

class TableFilterPreloadWrapper extends Component {
  state: {
    isLoading: boolean,
    elements?: Array<Element>,
    states?: Array<State>
  };

  props: {
    onApplyFilter: (filterConfig: Object) => void,
    initialFilterConfigElementId: string
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    Promise.all([getStates(), getElements()]).then((
      [states, elements]: [Array<State>, Array<Element>]
    ) => {
      this.setState({
        isLoading: false,
        states,
        elements
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <span>Загрузка ... </span>;
    } else {
      if (this.state.elements !== undefined) {
        const elements = getElementsForSelect(this.state.elements);
        if (this.state.states !== undefined) {
          const states = getStatesForSelect(this.state.states);
          const initialFilterConfig = {};
          if (this.props.initialFilterConfigElementId) {
            const initialElement = elements.find((element) => element.original._id === this.props.initialFilterConfigElementId);
            initialFilterConfig.elements = [initialElement];
          }
          return (
            <TableFilter elements={elements} states={states} onApplyFilter={this.props.onApplyFilter} initialFilterConfig={initialFilterConfig} />
          );
        }
      }
    }

    return <span>Smth went wrong</span>;
  }
}

type TableFilterProps = {
  elements: Array<ElementForSelect>,
  states: Array<StateForSelect>,
  onApplyFilter: (filterConfig: Object) => void,
  initialFilterConfig: Object
}

class TableFilter extends Component {
  props: TableFilterProps

  constructor(props: TableFilterProps) {
    super(props);

    // TODO: Cover not only initialFilterConfig.elements filter with length === 1;
    let elements;
    const initialFilterConfig = props.initialFilterConfig;
    if (initialFilterConfig.elements) {
      elements = initialFilterConfig.elements;
    }

    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
      stateLevel: props.states[0].value,
      elements: elements || []
    };

    (this:any).onDateChange = this.onDateChange.bind(this);
    (this:any).onFocusChange = this.onFocusChange.bind(this);
    (this:any).onStateLevelChange = this.onStateLevelChange.bind(this);
    (this:any).onElementsChange = this.onElementsChange.bind(this);
    (this:any).applyFilter = this.applyFilter.bind(this);
    (this:any).resetFilter = this.resetFilter.bind(this);
  }

  applyFilter() {
    const filterConfig = {};
    if (this.state.startDate || this.state.endDate) {
      filterConfig.date = {
        start: +this.state.startDate || new Date(0).getTime(),
        end: +this.state.endDate || new Date().getTime()
      };
    }

    if (this.state.stateLevel) {
      filterConfig.state = !this.state.stateLevel
        ? this.props.states[0].original
        : this.props.states.find(
            state => state.value === this.state.stateLevel
          ).original;
    }

    if (this.state.elements && this.state.elements.length) {
      filterConfig.elements = this.state.elements.map(
        element => element.original
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
        stateLevel: this.props.states[0].value,
        elements: []
      },
      () => {
        this.applyFilter();
      }
    );
  }

  onDateChange({startDate, endDate}) {
    this.setState({
      startDate,
      endDate
    });
  }

  onFocusChange(focus) {
    this.setState({
      focusedInput: focus
    });
  }

  isOutsideRange() {
    return false;
  }

  onStateLevelChange(newState) {
    this.setState({
      stateLevel: (newState && newState.value) || null
    });
  }

  onElementsChange(newElements) {
    this.setState({
      elements: newElements || []
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
            options={this.props.states}
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
            options={this.props.elements}
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

export default TableFilterPreloadWrapper;
