import StorageService, { USER_TOKEN_STORAGE_KEY } from '../../../src/services/storageService';

const TEST_USER_DATA = {
  "nameid": 1,
  "role": 1,
  "nbf": 1600896480,
  "exp": 2600900080,
  "iat": 1600896480,
  "iss": "https://localhost",
  "aud": "https://localhost"
}

Cypress.Commands.add('login', () => {
  StorageService.set(USER_TOKEN_STORAGE_KEY, `a.${btoa(JSON.stringify(TEST_USER_DATA))}.b`);
});
