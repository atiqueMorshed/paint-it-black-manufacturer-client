import { useQuery } from 'react-query';
import axios from '../api/axiosBaseUrl.js';

const getPublicData = async ({ queryKey }) => {
  const url = queryKey[1];

  if (url) {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(
        `Error while fetching. ${error?.response?.data || error?.message}`
      );
    }
  } else {
    throw new Error('Invalid URL');
  }
};

export const useGetPublicData = ({ url, name, isEnabled = true }) => {
  return useQuery([name, url], getPublicData, {
    enabled: isEnabled,
  });
};
