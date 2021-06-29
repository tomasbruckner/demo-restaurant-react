import { API_ENDPOINT } from 'config/config';
import httpHandler from 'utils/httpHandler';
import StorageService, { USER_TOKEN_STORAGE_KEY } from 'services/storageService';

const isAbsolutePath = (url: string) => url.startsWith('http');

const createUrl = ({ useApiEndpoint, url }: { useApiEndpoint: boolean; url: string }) => {
  if (!useApiEndpoint || isAbsolutePath(url)) {
    return url;
  }

  return `${API_ENDPOINT}${url}`;
};

type RequestOptions = {
  url: string;
  data?: unknown;
  params?: unknown;
  headers?: any;
  authorization?: boolean;
  useApiEndpoint?: boolean;
};

const generateRequestHandler = (requestMethodName: any) => {
  return (options: RequestOptions) => {
    const {
      url,
      data = {},
      params = {},
      headers = {},
      authorization = true,
      useApiEndpoint = true,
    } = options;
    const requestHeaders = { ...headers };

    if (authorization) {
      requestHeaders.Authorization = `Bearer ${StorageService.get(USER_TOKEN_STORAGE_KEY)}`;
    }

    return httpHandler.request({
      method: requestMethodName,
      url: createUrl({ url, useApiEndpoint }),
      headers: requestHeaders,
      data,
      params,
    });
  };
};

class CoreApiService {
  static get = generateRequestHandler('get');
  static post = generateRequestHandler('post');
  static put = generateRequestHandler('put');
  static delete = generateRequestHandler('delete');

  static getToken = () => StorageService.get(USER_TOKEN_STORAGE_KEY);
}

export default CoreApiService;
