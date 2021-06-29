Cypress.Commands.add('mock', () => {
  cy.server();

  cy.route(
    'POST',
    '**/api/v1/auth/login',
    'fixture:auth-fixtures/loginSuccess.json',
  ).as('login');

  cy.route(
    'GET',
    '**/api/v1/users/me',
    'fixture:user-fixtures/meSuccess.json',
  ).as('me');

  cy.route(
    'POST',
    '**/api/v1/restaurants/filter',
    'fixture:restaurant-fixtures/restaurantList.json',
  ).as('restaurants');

  cy.route(
    'POST',
    '**/api/v1/reviews/filter',
    'fixture:review-fixtures/reviewList.json',
  ).as('reviews');

  cy.route(
    'POST',
    '**/api/v1/reviews',
    'fixture:review-fixtures/reviewDetail.json',
  ).as('createReview');

  cy.route(
    'PUT',
    '**/api/v1/reviews/**',
    'fixture:review-fixtures/reviewDetail.json',
  ).as('editReview');

  cy.route(
    'POST',
    '**/api/v1/review-replies',
    'fixture:review-replies-fixtures/reviewReplyDetail.json',
  ).as('createReviewReply');

  cy.route(
    'PUT',
    '**/api/v1/review-replies/**',
    'fixture:review-replies-fixtures/reviewReplyDetail.json',
  ).as('editReviewReply');

  cy.route(
    'DELETE',
    '**/api/v1/review-replies/**',
  ).as('deleteReviewReply');

  cy.route(
    'POST',
    '**/api/v1/reviews-replies/**',
    'fixture:review-replies-fixtures/reviewReplyDetail.json',
  ).as('createReviewReply');

  cy.route(
    'POST',
    '**/api/v1/users/filter',
    'fixture:user-fixtures/usersList.json',
  ).as('users');

  cy.route(
    'PUT',
    '**/api/v1/users/**',
    'fixture:user-fixtures/userDetail.json',
  ).as('editUser');

  cy.route(
    'DELETE',
    '**/api/v1/users/**',
  ).as('deleteUser');

  cy.route(
    'POST',
    '**/api/v1/restaurants',
    'fixture:restaurant-fixtures/restaurantDetail.json',
  ).as('createRestaurant');

  cy.route(
    'PUT',
    '**/api/v1/restaurants/**',
    'fixture:restaurant-fixtures/restaurantDetail.json',
  ).as('editRestaurant');

  cy.route(
    'DELETE',
    '**/api/v1/restaurants/**',
  ).as('deleteRestaurant');

  cy.route(
    'GET',
    '**/api/v1/restaurants/**',
    'fixture:restaurant-fixtures/restaurantDetail.json',
  ).as('restaurantDetail');
});
