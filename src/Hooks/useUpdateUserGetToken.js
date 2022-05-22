import { useMutation } from 'react-query';
import axios from '../api/axiosBaseUrl'; // axios with the baseURL

const updateUserGetToken = async ({ uid }) => {
  if (uid) {
    try {
      const { data } = await axios({
        method: 'PUT',
        url: '/api/user',
        data: {
          uid,
        },
      });

      if (data) {
        console.log(data);
        localStorage.setItem('paintitblack-at', data);
        return { message: 'JWT SET' };
      }
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data || error?.message || 'Error getting access token.'
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
