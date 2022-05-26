import { useMutation } from 'react-query';
import axios from '../api/axiosAuthBearer'; // axios with the auth header

const deleteOrder = async (props) => {
  if (props?.uid) {
    try {
      const { data } = await axios({
        method: 'DELETE',
        url: '/api/orderAdmin',
        data: props,
      });

      return data;
    } catch (error) {
      throw new Error(
        error?.response?.data || error?.message || 'Error deleting order.'
      );
    }
  } else {
    throw new Error('Invalid order information.');
  }
};

export const useDeleteOrderAsAdmin = ({ onSuccess, onError }) => {
  return useMutation(deleteOrder, {
    onSuccess,
    onError,
  });
};
