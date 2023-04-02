const initialState = {
    subscription: '',
    amount: 0,
    startDate: null,
    numberOfQuestion: 0,

  };
  
  const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SUBSCRIPTION':
        return { ...state, subscription: action.payload.subscription, amount: action.payload.amount, startDate: action.payload.startDate,numberOfQuestion:action.payload.numberOfQuestion };
      default:
        return state;
    }
  };

  export default subscriptionReducer;

  //NUMBER OF question hai jo idhar vo alag se add kia tha baad mein ...