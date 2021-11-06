import { User } from '../schemas/user.schema';

export const userStub = (): User => {
  return {
    userId: '123',
    email: 'iromashko@me.com',
    age: 24,
    favoriteFoods: ['apples', 'pizza'],
  };
};
