import { FETCH_MEDICINE_OPTIONS_REQUEST, FETCH_MEDICINE_OPTIONS_SUCCESS, FETCH_MEDICINE_OPTIONS_FAILURE } from '../actionType';

const initialState = {
  options: [],
  loading: false,
  error: null,
};

const medicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEDICINE_OPTIONS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MEDICINE_OPTIONS_SUCCESS:
      console.log('Reducer Payload:', action.payload); // Debugging statement
      return { ...state, loading: false, options: Array.isArray(action.payload) ? action.payload : [] };
    case FETCH_MEDICINE_OPTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default medicineReducer;
