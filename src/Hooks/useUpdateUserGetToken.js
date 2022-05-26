import { useMutation } from 'react-query';
import axios from '../api/axiosBaseUrl'; // axios with the baseURL

const updateUserGetToken = async (payload) => {
  if (payload) {
    try {
      const { data } = await axios({
        method: 'PUT',
        url: '/api/user',
        data: payload,
      });

      if (data) {
        localStorage.setItem('paintitblack-at', data);
        return { message: 'JWT SET' };
      }
    } catch (error) {
      throw new Error(
        error?.response?.data || error?.message || 'Error getting access token.'
      );
    }
  } else {
    throw new Error('Invalid user information.');
  }
};

export const useUpdateUserGetToken = ({ onSuccess, onError }) => {
  return useMutation(updateUserGetToken, {
    onSuccess,
    onError,
  });
};
