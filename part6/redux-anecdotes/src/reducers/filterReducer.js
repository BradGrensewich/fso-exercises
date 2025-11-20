export const changeFilter = (text) => {
  return {
    type: 'CHANGE_FILTER',
    payload: { text },
  };
};

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.payload.text;
    default:
      return state;
  }
};

export default reducer;
