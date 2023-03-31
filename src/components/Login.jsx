import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, loginFunction } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validate: true,
    };
  }

  changeValue = ({ target: { value } }) => {
    this.setState({ email: value }, () => this.handleCheck());
  };

  handleCheck = () => {
    const { email, password } = this.state;
    const six = 6;
    if (password.length < six) return this.setState({ validate: true });
    const regexEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
    const teste = regexEmail.test(email);
    console.log(teste);
    return this.setState({ validate: !teste });
  };

  checkPassword = ({ target: { value } }) => {
    this.setState({ password: value }, () => this.setState(
      { validate: false },
      () => this.handleCheck(),
    ));
  };

  sendValues = (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(fetchApi());
    dispatch(loginFunction(email));
    history.push('/carteira');
  };

  render() {
    const { email, validate, password } = this.state;
    return (
      <>
        <form>
          <input
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.changeValue }
          />
          <input
            type="password"
            onChange={ this.checkPassword }
            data-testid="password-input"
            value={ password }
          />
        </form>
        <button
          type="submit"
          disabled={ validate }
          onClick={ this.sendValues }
        >
          Entrar
        </button>

      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
