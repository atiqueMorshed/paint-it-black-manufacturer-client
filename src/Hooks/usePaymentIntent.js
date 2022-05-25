import { useMutation } from 'react-query';
import axios from '../api/axiosAuthBearer'; // axios with the auth header

const paymentIntent = async (item) => {
  if (item) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/api/create-payment-intent',
        data: item,
      });
      return data;
    } catch (error) {
      throw new Error(
        error?.response?.data || error?.message || 'Error placing order.'
      );
    }
  } else {
    throw new Error('Error Processing payment for this tool.');
  }
};

export const usePaymentIntent = ({ onSuccess, onError }) => {
  return useMutation(paymentIntent, {
    onSuccess,
    onError,
  });
};
