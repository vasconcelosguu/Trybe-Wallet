import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAnItem, editAnItem } from '../redux/actions';

class Table extends Component {
  deleteItem = ({ target }) => {
    const { expenses, exTheDelete } = this.props;
    exTheDelete(expenses.filter((item) => item.id !== +target.id));
  };

  selectTheEdit = ({ target }) => {
    const { expenses, editInTable } = this.props;
    editInTable(expenses.find(({ id }) => id === target.id));
  };

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((el) => (
            <tr key={ el.id }>
              <td>{ el.description }</td>
              <td>{ el.tag }</td>
              <td>{ el.method }</td>
              <td>{ parseFloat(el.value).toFixed(2) }</td>
              <td>{ el.currency }</td>
              <td>{ el.exchangeRates[el.currency].name }</td>
              <td>{ parseFloat(el.exchangeRates[el.currency].ask).toFixed(2) }</td>
              <td>
                {
                  parseFloat(el.value
              * el.exchangeRates[el.currency].ask).toFixed(2)
                }

              </td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  id={ el.id }
                  onClick={ this.selectTheEdit }
                >
                  Editar

                </button>
                {' '}
                <button
                  type="button"
                  data-testid="delete-btn"
                  id={ el.id }
                  onClick={ this.deleteItem }
                >
                  Excluir
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  exTheDelete: PropTypes.func.isRequired,
  editInTable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editInTable: (id) => dispatch(editAnItem(id)),
  exTheDelete: (item) => dispatch(deleteAnItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
