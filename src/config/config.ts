import { isRunningInJest } from 'utils/commonUtils';

// eslint-disable-next-line import/prefer-default-export
const DEFAULT_API_ENDPOINT = 'https://localhost:5001';

const E2E_TEST_PORT = '3093';
const E2E_TEST_URL = 'https://e2e:9999/';
const UNIT_TEST_URL = 'https://jest:9999/';

const getApiEndpoint = () => {
  if (isRunningInJest()) {
    return UNIT_TEST_URL;
  }

  if (window.location.hostname === 'localhost') {
    return window.location.port === E2E_TEST_PORT ? E2E_TEST_URL : DEFAULT_API_ENDPOINT;
  }

  if (process.env.API_ENDPOINT) {
    return process.env.API_ENDPOINT;
  }
  const { host, protocol } = window.location;
  const apiHost = `${host.substring(0, host.indexOf('.'))}-beapi.azurewebsites.net`;

  return `${protocol}//${apiHost}/`;
};

// eslint-disable-next-line import/prefer-default-export
export const API_ENDPOINT = getApiEndpoint();
