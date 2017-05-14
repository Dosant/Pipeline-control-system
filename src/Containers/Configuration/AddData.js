import React, {Component} from 'react';
import DateTimePicker from './DateTimePicker';
import AddDataTable from './AddDataTable';
import Loader from '../../Components/Loader';
import {postData} from '../../api/data';

class AddData extends Component {
  constructor() {
    super();
    this.state = {
      dateTime: null,
      dataSet: [],
      isValid: true,
      isLoading: false,
      isUploaded: false
    };

    this.onDateTimeSelect = this.onDateTimeSelect.bind(this);
    this.validateData = this.validateData.bind(this);
    this.handleUploadData = this.handleUploadData.bind(this);
  }

  onDateTimeSelect(dateTime) {
    console.log('onDateTimeSelect');
    if (this.state.dateTime !== dateTime) {
      this.setState({
        dateTime
      });
    }
  }

  aggregateData() {
    if (!this.container) {
      console.error('aggregateData() this.container is undefined');
      return;
    } else {
      const TableRows = Array.from(
        this.container.getElementsByClassName('js-elementDataRow')
      );
      const dataSet = TableRows.map(tableRow => {
        const inputs = Array.from(tableRow.getElementsByTagName('input'));
        const transformInput = input => {
          if (input.value === '') {
            return null;
          } else {
            return +input.value;
          }
        };
        return {
          element: tableRow.dataset.id,
          isolation: transformInput(inputs[0]),
          resistance: transformInput(inputs[1]),
          power: transformInput(inputs[2])
        };
      });
      return dataSet;
    }
  }

  validateData(dataSet) {
    if (!this.state.dateTime) {
      return false;
    }

    const invalidData = dataSet.filter(data => {
      return data.isolation === null ||
        data.resistance === null ||
        data.power === null;
    });

    if (invalidData.length) {
      return false;
    }

    return true;
  }

  handleUploadData() {
    const dataSet = this.aggregateData();
    const isValid = this.validateData(dataSet);

    if (!isValid) {
      this.setState({
        isValid: false
      });
    } else {
      const dataSetWithDate = dataSet.map(data =>
        Object.assign(data, {date: this.state.dateTime}));

      console.log('toUpload: ', dataSetWithDate);
      this.setState({
        isLoading: true,
        isValid: true
      });
      postData(dataSetWithDate)
        .then((newCount) => {
          this.setState({
            isLoading: false,
            isUploaded: true
          });
          this.props.dataUploaded(newCount);
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <Loader />}
        {!this.state.isLoading && !this.state.isUploaded &&
          <div>
            <div>
              <p>Дата снятия показаний:</p>
              <DateTimePicker onSelect={this.onDateTimeSelect} />
              <hr />
              <p>Введите показания каждого элемента:</p>
              <div ref={element => this.container = element}>
                <AddDataTable elements={this.props.elements} />
              </div>
              <div>
                {!this.state.isValid &&
                  <p style={{color: '#EB5E28', textAlign: 'center'}}>
                    Проверьте введенные данные. Чего-то не хватает.
                  </p>}
              </div>
            </div>
            <hr />
            <footer style={{textAlign: 'right'}}>
              <button
                className="btn btn-danger btn-simple"
                onClick={this.props.handleCancel}
              >
                Отменить
              </button>
              <button
                className="btn btn-success btn-simple"
                onClick={this.handleUploadData}
              >
                Загрузить данные
              </button>
            </footer>
          </div>}
          {!this.state.isLoading && this.state.isUploaded && (
            this.renderSuccessUpload()
          )}
      </div>
    );
  }

  renderSuccessUpload() {
    return (
      <div className="row" style={{marginBottom: '20px'}}>
        <div className="col-xs-2">
          <div className="icon-big" style={{textAlign: 'center'}}>
            <i
              style={{color: '#7AC29A'}}
              className='ti-check'
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="col-xs-10">
          <h4 style={{marginTop: '12px'}}>
            Данные успешно загружены.
          </h4>
        </div>
      </div>
    )
  }
}

export default AddData;
