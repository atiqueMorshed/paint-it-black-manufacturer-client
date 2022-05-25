import { useMutation } from 'react-query';
import axios from '../api/axiosAuthBearer'; // axios with the auth header

const updateProfile = async (profile) => {
  if (profile) {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: '/api/user',
        data: profile,
      });
      return data;
    } catch (error) {
      throw new Error(
        error?.response?.data || error?.message || 'Error updating profile.'
      );
    }
  } else {
    throw new Error('Invalid profile information.');
  }
};

export const useUpdateProfile = ({ onSuccess, onError }) => {
  return useMutation(updateProfile, {
    onSuccess,
    onError,
  });
};
