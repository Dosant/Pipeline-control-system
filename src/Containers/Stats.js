//@flow
import React, {Component} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer
} from 'recharts';
import {getElementsStats} from '../api/elements';
import {getSystemStats} from '../api/states';
import moment from 'moment';
import PieChart from '../Components/Charts/PieChart';

const SimpleBarChart = ({data}) => {
  return (
    <div className="bar-chart-container">
      <ResponsiveContainer>
        <BarChart width={600} height={300} data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="count" fill="#F3BB45" name={'Количество инцидентов'}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


const TimeSeriesGraph = ({data}: {data: Array<{state: number, date: Date}>}) => {
  return (
    <ResponsiveContainer>
      <LineChart
        width={1000}
        data={data}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="state" name={'Состояние Системы'} stroke="#7AC29A" activeDot={{r: 6}} />
      </LineChart>
  </ResponsiveContainer>
  );
};

class Stats extends Component {
  state: {
    isLoading: boolean,
    timeSeriesGraph: Array<{state: number, date: Date}>,
    stateClassStats: Array<{value: number, name: string}>,
    elementsStats: Array<{count: number, name: string, _id: string}>
  };
  constructor() {
    super();
    this.state = {
      isLoading: true,
      timeSeriesGraph: [],
      stateClassStats: [],
      elementsStats: []
    };
  }
  componentDidMount() {
    const systemStatsPrmise = getSystemStats()
      .then(({timeSeriesGraph, stateClassStats}: {timeSeriesGraph: Array<Object>, stateClassStats: any}) => {
        timeSeriesGraph = timeSeriesGraph.map((data) => {
          return {
            state: data.state,
            date: moment(data.date).format('DD MMM : hh:mm')
          }
        })

        stateClassStats = Object.keys(stateClassStats).map((key) => {
          return {
            value: stateClassStats[key].count,
            name: stateClassStats[key].stateClass.name,
            color: stateClassStats[key].stateClass.color
          };
        });

        return {
          timeSeriesGraph,
          stateClassStats
        };
      });

    const elementsStatsPromise = getElementsStats();

    Promise.all([
      systemStatsPrmise,
      elementsStatsPromise
    ])
    .then(([systemStats, elementsStats]) => {
      this.setState({
        ...systemStats,
        elementsStats,
        isLoading: false
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="row">
          Загрузка ...
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h4 className="title">Состояние системы в зависимости от времени</h4>
              <p className="category">Состояние в зависимости от времени</p>
            </div>
            <div className="content">
              <TimeSeriesGraph data={this.state.timeSeriesGraph} />
              <div className="footer">
                <hr />
                <div className="stats">
                  <i className="ti-timer" /> За неделю
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-6">
          <div className="card ">
            <div className="header">
              <h4 className="title">График нахождения системы в одном из классов</h4>
              <p className="category">
                Процентное соотношение времени нахожденя системы в одном из классов
              </p>
            </div>
            <div className="content">
              <PieChart data={this.state.stateClassStats} />
              <div className="footer">
                <div className="stats">
                  <i className="ti-check" /> Информация конфиденциальна
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-6">
          <div className="card ">
            <div className="header">
              <h4 className="title">Статистика по элементам трубопровода</h4>
              <p className="category">
                Количество раз нахождения в критическом состоянии для каждого элемента
              </p>
            </div>
            <div className="content">
              <SimpleBarChart data={this.state.elementsStats} />
              <div className="footer">
                <div className="stats">
                  <i className="ti-check" /> Информация конфиденциальна
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;
