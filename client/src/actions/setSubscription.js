export const setSubscription = (subscription, amount, startDate) => {
    return {
      type: 'SET_SUBSCRIPTION',
      payload: {
        subscription,
        amount,
        startDate,
        
      }
    };
  };

  