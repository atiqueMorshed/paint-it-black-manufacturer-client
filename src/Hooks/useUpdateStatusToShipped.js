import { useMutation } from 'react-query';
import axios from '../api/axiosAuthBearer'; // axios with the auth header

const updateStatusToShipped = async (payload) => {
  if (payload) {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: '/api/orderAdmin',
        data: payload,
      });
      return data;
    } catch (error) {
      throw new Error(
        error?.response?.data || error?.message || 'Error saving status to DB.'
      );
    }
  } else {
    throw new Error('Invalid order information.');
  }
};

export const useUpdateStatusToShipped = ({ onSuccess, onError }) => {
  return useMutation(updateStatusToShipped, {
    onSuccess,
    onError,
  });
};
