// Esse reducer será responsável por tratar as informações da pessoa usuária
// import { changeInput } from '../actions/index

const initialState = {
  email: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case 'Login':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}
