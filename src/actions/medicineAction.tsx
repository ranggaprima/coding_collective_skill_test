

import { FETCH_MEDICINE_OPTIONS_REQUEST, FETCH_MEDICINE_OPTIONS_SUCCESS, FETCH_MEDICINE_OPTIONS_FAILURE } from '../actionType';
import axios from 'axios';

export const fetchMedicineOptions = (query) => async (dispatch) => {
  dispatch({ type: FETCH_MEDICINE_OPTIONS_REQUEST });
  try {
    const url = `http://116.193.190.138:9000/api/masterdata_auto/e_resep_barang_with_stok_auto?q=${query}&cekstok=true&margin_option=Layanan&page=1`
    const response = await axios.get(url);
    console.log('API Response:', response.data); // Debugging statement
    dispatch({
      type: FETCH_MEDICINE_OPTIONS_SUCCESS,
      payload: response.data, // Ensure this is an array of options
    });
  } catch (error) {
    console.error('API Error:', error); // Debugging statement
    dispatch({
      type: FETCH_MEDICINE_OPTIONS_FAILURE,
      payload: error.message,
    });
  }
};
