import { useMutation } from 'react-query';
import axios from '../api/axiosAuthBearer'; // axios with the auth header

const addReview = async (reviewData) => {
  if (reviewData) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/api/review',
        data: reviewData,
      });
      return data;
    } catch (error) {
      throw new Error(
        error?.response?.data || error?.message || 'Error placing review.'
      );
    }
  } else {
    throw new Error('Invalid review information.');
  }
};

export const useAddReview = ({ onSuccess, onError }) => {
  return useMutation(addReview, {
    onSuccess,
    onError,
  });
};
