import React, {Component} from 'react';

class Stats extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h4 className="title">Здесь будет статистика. Пока пусто.</h4>
              <p className="category">Состояние ситсемы</p>
            </div>
            <div className="content">

              <div className="footer">
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Хорошее
                  <i className="fa fa-circle text-info" /> Нормальное
                  <i className="fa fa-circle text-danger" /> Аварийное
                  <i className="fa fa-circle text-warning" /> Критическое
                </div>
                <hr />
                <div className="stats">
                  <i className="ti-timer" /> За неделю
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card ">
            <div className="header">
              <h4 className="title">Принятые решения</h4>
              <p className="category">Все принятые решения системы
              </p>
            </div>
            <div className="content">

              <div className="footer">
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Вызывать оперативную бригаду
                  <i className="fa fa-circle text-warning" /> Вызвать бригаду с тяжелой техникой
                  <i className="fa fa-circle text-danger" /> Сообщить Топ-менеджерам
                </div>
                <hr />
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
