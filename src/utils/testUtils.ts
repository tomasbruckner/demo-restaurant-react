export const fakeTranslate = (key: string) => key;

export const fakeLoad = () => Promise.resolve();

export const fakeLogger = {
  info() {},
  error() {},
};

// eslint-disable-next-line no-unused-vars
export const fakeFunction = (): any => {};

export const fakeHistory = {
  push: () => {},
};

export const fakeTranslationProps = {
  t: fakeTranslate,
  i18n: {} as any,
  tReady: true,
};

export const fakeReview = {
  reviewId: 1,
  reviewRatingId: 2,
  restaurantId: 3,
  title: 'title',
  text: 'text',
  dateOfVisit: '',
  hasOwnerResponse: true,
  created: '',
  owner: {
    userId: 4,
    firstName: 'firstName',
    lastName: 'lastName',
    imageLink: 'imageLink',
  },
  ownerResponse: {
    reviewReplyId: 5,
    reviewId: 6,
    creatorId: 7,
    created: '',
    updated: '',
    text: 'text',
  },
  restaurantName: 'restaurantName',
};

export const fakeUser = {
  userId: 1,
  roleId: 2,
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email@email',
  created: '',
  imageLink: 'string',
};

export const fakeRestaurant = {
  restaurantId: 1,
  ownerId: 2,
  name: 'name',
  description: 'description',
  websiteUrl: 'websiteUrl',
  contactPhone: 'contactPhone',
  address: 'address',
  numberOfReviews: 3,
  averageRating: 4,
  hasCurrentUserReviewed: true,
  imageLink: 'imageLink',
};

export const fakeRouterProps = {
  location: {} as any,
  match: {} as any,
  history: { push: () => {} } as any,
};
