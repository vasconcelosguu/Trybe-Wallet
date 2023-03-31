import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, addFormsKeys, deleteAnItem, editAnItem } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
  }

  setValue = ({ target }) => {
    this.setState({ value: target.value });
  };

  setDescription = ({ target }) => {
    this.setState({ description: target.value });
  };

  setTheTypeValue = ({ target }) => {
    this.setState({ currency: target.value });
  };

  paymentMethod = ({ target }) => {
    this.setState({ method: target.value });
  };

  chooseTheKind = ({ target }) => {
    this.setState({ tag: target.value });
  };

  sendItems = async (e) => {
    const { editor, expenses } = this.props;
    e.preventDefault();
    if (!editor) {
      const { sendTheExpense } = this.props;
      const data = await fetch('https://economia.awesomeapi.com.br/json/all');
      const exchangeRates = await data.json();
      delete exchangeRates.USDT;
      this.setState({
        id: expenses.length,
      }, () => {
        sendTheExpense({ ...this.state, exchangeRates });
        this.setState({
          value: '',
          description: '',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Alimentação',
        });
      });
    } else {
      const { editWallet, changeValue, idToEdit } = this.props;
      const obj = expenses.find((item) => item.id === idToEdit).exchangeRates;
      this.setState({
        id: idToEdit,
        exchangeRates: obj,
      }, () => {
        changeValue([this.state, ...expenses
          .filter((item) => item.id !== idToEdit)]);
        editWallet();
      });
    }
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <section>
        <form>
          <input
            data-testid="value-input"
            onChange={ this.setValue }
            value={ value }
            placeholder="Valor"
          />
          <input
            onChange={ this.setDescription }
            data-testid="description-input"
            placeholder="Description"
            value={ description }
          />
          <label htmlFor="select">
            Selecione
            <select
              onChange={ this.setTheTypeValue }
              data-testid="currency-input"
              name="select"
              value={ currency }
            >
              {currencies
                .map((curr, i) => (
                  <option
                    key={ i }
                    value={ curr }
                  >
                    { curr }
                  </option>
                ))}
            </select>
          </label>
          <select
            value={ method }
            onChange={ this.paymentMethod }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option
              value="Cartão de crédito"
            >
              Cartão de crédito
            </option>
            <option
              value="Cartão de débito"
            >
              Cartão de débito
            </option>
          </select>
          <select value={ tag } onChange={ this.chooseTheKind } data-testid="tag-input">
            <option
              value="Alimentação"
            >
              Alimentação
            </option>
            <option
              value="Lazer"
            >
              Lazer
            </option>
            <option
              value="Trabalho"
            >
              Trabalho
            </option>
            <option
              value="Transporte"
            >
              Transporte
            </option>
            <option
              value="Saúde"
            >
              Saúde
            </option>
          </select>
        </form>
        <button
          onClick={ this.sendItems }
          type="submit"
        >
          { editor ? 'Editar despesas' : 'Adicionar despesas' }

        </button>
      </section>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  sendTheExpense: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
  editWallet: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  editWallet: () => dispatch(editAnItem()),
  getTheApi: async () => dispatch(fetchApi()),
  changeValue: (id) => dispatch(deleteAnItem(id)),
  sendTheExpense: (val) => dispatch(addFormsKeys(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
