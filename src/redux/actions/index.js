export const requestApi = 'requestApi';
export const resultFromTheApi = 'resultFromTheApi';
export const ifError = 'ifError';
export const login = 'Login';
export const walletVal = 'walletVal';
export const walletCurr = 'walletCurr';
export const keysToItem = 'keysToItem';
export const deleteItem = 'deleteItem';
export const selecetItemToEdit = 'editId';

export const requestFromTheApi = () => ({
  type: requestApi,
});
export const responseApi = (data) => ({
  type: resultFromTheApi,
  data,
});
export const loginFunction = (payload) => ({
  type: login,
  payload,
});
export const walletValue = (payload) => ({
  type: walletVal,
  payload,
});
export const walletCur = (payload) => ({
  type: walletCurr,
  payload,
});
export const addFormsKeys = (items) => ({
  type: keysToItem,
  items,
});
export const deleteAnItem = (item) => ({
  type: deleteItem,
  item,
});
export const editAnItem = (id = 0) => ({
  type: selecetItemToEdit,
  id,
});

export function fetchApi() {
  return async (dispatch) => {
    dispatch(requestFromTheApi());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    const toArr = Object.keys(result).filter((item) => item !== 'USDT');
    return dispatch(responseApi(toArr));
  };
}
