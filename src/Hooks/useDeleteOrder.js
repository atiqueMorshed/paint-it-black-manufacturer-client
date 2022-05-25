import { useMutation } from 'react-query';
import axios from '../api/axiosAuthBearer'; // axios with the auth header

const deleteOrder = async (props) => {
  if (props?.uid) {
    try {
      const { data } = await axios({
        method: 'DELETE',
        url: '/api/order',
        data: props,
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

export const useDeleteOrder = ({ onSuccess, onError }) => {
  return useMutation(deleteOrder, {
    onSuccess,
    onError,
  });
};
