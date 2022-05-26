import { useMutation } from 'react-query';
import axios from '../api/axiosAuthBearer'; // axios with the auth header

const makeAdmin = async (payload) => {
  if (payload) {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: '/api/makeadmin',
        data: payload,
      });
      return data;
    } catch (error) {
      throw new Error(
        error?.response?.data || error?.message || 'Error making admin.'
      );
    }
  } else {
    throw new Error('Invalid information provided.');
  }
};

export const useMakeAdmin = ({ onSuccess, onError }) => {
  return useMutation(makeAdmin, {
    onSuccess,
    onError,
  });
};
