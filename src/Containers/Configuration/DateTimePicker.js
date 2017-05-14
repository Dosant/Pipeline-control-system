import React, {Component} from 'react';
import { SingleDatePicker } from 'react-dates';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

const showSecond = true;


export default class DateTimePicker extends Component {
  constructor() {
    super();

    this.state = {
      date: null,
      time: null,
      focused: false
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleDateChange(date) {
    this.setState({ date }, () => {
      this.selectDateTime();
    })
  }

  handleTimeChange(time) {
    this.setState({time}, () => {
      this.selectDateTime();
    });
  }

  selectDateTime() {
    const {date, time} = this.state;
    if (date && time) {
      const dateString = date.format().split('T')[0];
      const timeString = time.format().split('T')[1];
      const dateTime = moment(`${dateString}T${timeString}`);
      this.props.onSelect(dateTime);
    }
  }

  render(){
    return (
      <div className="DateTimePicker">
        <SingleDatePicker
          date={this.state.date}
          onDateChange={this.handleDateChange}
          focused={this.state.focused}
          onFocusChange={({ focused }) => this.setState({ focused })}
          placeholder='Дата'
          isOutsideRange={() => false}
          isDayBlocked={() => false}
        />
        <TimePicker
          style={{ width: 100 }}
          showSecond={showSecond}
          defaultValue={null}
          onChange={this.handleTimeChange}
          placeholder='Время'
        />
      </div>
    )
  }
}