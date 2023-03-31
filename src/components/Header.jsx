import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  renderTheH1 = () => {
    const { expenses } = this.props;
    let sum = 0.00;
    if (expenses.length > 0) {
      expenses.forEach((item) => {
        sum += Number(item.value) * Number(item.exchangeRates[item.currency].ask);
      });
      return sum;
    }
    return sum;
  };

  render() {
    const { email } = this.props;
    return (
      <section data-testid="email-field">
        <h3>{ email }</h3>
        <p data-testid="total-field">
          { this.renderTheH1().toFixed(2) }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Header);
