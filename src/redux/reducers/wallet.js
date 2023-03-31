// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { walletVal,
  walletCurr, resultFromTheApi,
  keysToItem, deleteItem, selecetItemToEdit } from '../actions';

const initialState = {
  currencies: [],
  error: null,
  expenses: [],
  data: [],
  editor: false,
  idToEdit: 0,
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case walletVal:
    return {
      ...state,
      currencies: action.payload,
    };
  case resultFromTheApi:
    return {
      ...state,
      currencies: action.data,
    };
  case walletCurr:
    return {
      ...state,
      curr: action.currency,
    };

  case keysToItem:
    return {
      ...state,
      expenses: [...state.expenses, action.items],
    };

  case selecetItemToEdit:
    return {
      ...state,
      editor: !state.editor,
      idToEdit: action.id,
    };

  case deleteItem:
    return {
      ...state,
      expenses: action.item,
    };

  default:
    return state;
  }
}
