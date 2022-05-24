import { useMutation } from 'react-query';
import axios from '../api/axiosAuthBearer'; // axios with the auth header

const placeOrder = async (orderInformation) => {
  if (orderInformation) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/api/order',
        data: orderInformation,
      });
      return data;
    } catch (error) {
      throw new Error(
        error?.response?.data || error?.message || 'Error placing order.'
      );
    }
  } else {
    throw new Error('Invalid order information.');
  }
};

export const usePlaceOrder = ({ onSuccess, onError }) => {
  return useMutation(placeOrder, {
    onSuccess,
    onError,
  });
};
