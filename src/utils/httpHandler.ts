import axios, { AxiosError } from 'axios';

const HTTP_UNAUTHORIZED = 401;

export const registerLogoutInterceptor = (logoutCallback: Function) => {
  return axios.interceptors.response.use(
    resp => resp,
    (error: AxiosError<{}>) => {
      if (error.response && error.response.status === HTTP_UNAUTHORIZED) {
        logoutCallback();
      }

      return Promise.reject(error);
    },
  );
};

export const unregisterInterceptor = (interceptorId: number) => {
  return axios.interceptors.response.eject(interceptorId);
};

export default axios;
