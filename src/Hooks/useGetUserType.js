import { useQuery } from 'react-query';
import axios from '../api/axiosAuthBearer';

const getUserType = async ({ queryKey }) => {
  const uid = queryKey[1];

  try {
    const { data } = await axios.get(`/api/usertype/${uid}`);
    return data;
  } catch (error) {
    throw new Error(`${error?.response?.data || error?.message}`);
  }
};

export const useGetUserType = ({ name, uid, isEnabled = true }) => {
  return useQuery([name, uid], getUserType, {
    enabled: isEnabled,
  });
};
