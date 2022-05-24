import axios from 'axios';

const axiosAuthBearer = axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_BASEURL_LOCAL
      : process.env.REACT_APP_BASEURL_BACKEND,
});

axiosAuthBearer.interceptors.request.use(
  function (config) {
    // Attaches authorization header
    if (!config.headers.authorization) {
      config.headers.authorization = `Bearer ${localStorage.getItem(
        'paintitblack-at'
      )}`;
    }
    return config;
  },
  function (error) {
    // Returns the error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosAuthBearer.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 403) {
      // token refresh handling
    }
    return Promise.reject(error);
  }
);

export default axiosAuthBearer;
