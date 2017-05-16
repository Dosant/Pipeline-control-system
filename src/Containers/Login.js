import React, { Component } from 'react';
import { Link } from 'react-router';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: false
    }

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(evt) {
    evt.preventDefault();
    this.setState({
      error: true
    });
  }

  render() {
    return (
      <div>
        <div className="Login full-panel container">
          <div className="row">
            <div className="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-4 loginmodal-container">
              <h4>Система управления трубопроводом</h4>
              <br />
              <form onSubmit={this.onLogin}>
                <input type="text" name="user" placeholder="Логин" />
                <input type="password" name="pass" placeholder="Пароль" />
                <input type="submit" name="login" className="login loginmodal-submit" value="Войти" />
                {this.state.error && <p className="error-message">Неверный логин или пароль. <br/> Не расстраивайтесь, вы можете зайти как <Link to={{pathname: '/menu', state: { user: 'test' }}}>тестовый пользователь</Link></p>}
              </form>

              {/*<div className="login-help">
                <a href="#">Регистрация</a> - <a href="#">Восстановить пароль</a>
              </div>*/}
              <div className="login-help">
                <Link to={{pathname: '/menu', state: { user: 'test' }}}>Тестовый пользователь</Link> - <a href="https://github.com/Dosant/Pipeline-control-system">О Системе</a>
              </div>
            </div>
          </div>
        </div>
        <h6 style={{position:'absolute', bottom: '80px', width: '100%', textAlign: 'center'}}>Досов БГУ, 2017 (с)</h6>
      </div>

    );
  }
}

export default Login;