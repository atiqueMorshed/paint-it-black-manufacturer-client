import { useMutation } from 'react-query';
import axios from '../api/axiosAuthBearer'; // axios with the auth header

const deleteTool = async (props) => {
  if (props?.uid) {
    try {
      const { data } = await axios({
        method: 'DELETE',
        url: '/api/tool',
        data: props,
      });

      return data;
    } catch (error) {
      throw new Error(
        error?.response?.data || error?.message || 'Error deleting Tool.'
      );
    }
  } else {
    throw new Error('Invalid information.');
  }
};

export const useDeleteTool = ({ onSuccess, onError }) => {
  return useMutation(deleteTool, {
    onSuccess,
    onError,
  });
};
