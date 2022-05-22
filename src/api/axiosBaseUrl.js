import axios from 'axios';

export default axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_BASEURL_LOCAL
      : process.env.REACT_APP_BASEURL_BACKEND,
});
