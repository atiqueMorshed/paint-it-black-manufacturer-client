import { useMutation } from 'react-query';
import axios from '../api/axiosAuthBearer'; // axios with the auth header

const addTool = async (payload) => {
  if (payload) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/api/tool',
        data: payload,
      });
      return data;
    } catch (error) {
      throw new Error(
        error?.response?.data || error?.message || 'Error adding tool.'
      );
    }
  } else {
    throw new Error('Invalid tool information.');
  }
};

export const useAddTool = ({ onSuccess, onError }) => {
  return useMutation(addTool, {
    onSuccess,
    onError,
  });
};
