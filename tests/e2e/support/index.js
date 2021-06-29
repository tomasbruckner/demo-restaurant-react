import './mock';
import './login';

Cypress.on('uncaught:exception', () => {
  return false
})
