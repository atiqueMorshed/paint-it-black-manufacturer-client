import { useMutation } from 'react-query';
import axios from '../api/axiosAuthBearer'; // axios with the auth header

const savePaymentToDB = async (payment) => {
  if (payment) {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: '/api/order',
        data: payment,
      });
      return data;
    } catch (error) {
      throw new Error(
        error?.response?.data || error?.message || 'Error saving payment to DB.'
      );
    }
  } else {
    throw new Error('Invalid payment information.');
  }
};

export const useSavePaymentToDB = ({ onSuccess, onError }) => {
  return useMutation(savePaymentToDB, {
    onSuccess,
    onError,
  });
};
