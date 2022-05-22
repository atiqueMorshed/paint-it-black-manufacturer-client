import { useMutation } from 'react-query';
import axios from '../api/axiosBaseUrl'; // axios with the baseURL

const updateUserGetToken = async ({ uid, isVerified }) => {
  if (uid && typeof isVerified === 'boolean') {
    try {
      const { data } = await axios({
        method: 'PUT',
        url: '/api/user',
        data: {
          uid,
          isVerified,
        },
      });
      console.log(data);

      if (data?.accessToken) {
        localStorage.setItem('paintitblack-at', data.accessToken);
        return { accessToken: data.accessToken };
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
