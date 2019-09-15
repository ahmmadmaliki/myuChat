const initialStateuser = {
    Users: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
  };
  
  const users = (state = initialStateuser, action) => {
    switch (action.type) {
      case 'GET_USER_PENDING':
        return {
          ...state,
          isLoading: true,
          isFulfilled: false,
          isRejected: false,
        };
      case 'GET_USER_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'GET_USER_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          Users: action.payload.data
        };
      default:
        return state;
    }
  };
  export default users;