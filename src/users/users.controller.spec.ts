import { Test } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { userStub } from './test/stubs/user.stub';
import { UserModel } from './test/support/user.model';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

jest.mock('../users/users.service.ts');

describe(UsersController.name, () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UsersRepository, UserModel],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });
  it('exists', () => {
    expect(UsersController).toBeDefined();
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.getUser(userStub().userId);
      });

      it('then it should call userService', () => {
        expect(usersService.getUserById).toBeCalledWith(userStub().userId);
      });

      it('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersController.getUsers();
      });

      it('then it should call userService', () => {
        expect(usersService.getUsers).toHaveBeenCalled();
      });

      it('then it should return a user', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });
  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;

      beforeEach(async () => {
        createUserDto = {
          email: userStub().email,
          age: userStub().age,
        };

        user = await usersController.createUser(createUserDto);
      });

      it('then it should call userService', () => {
        expect(usersService.createUser).toHaveBeenCalledWith(
          createUserDto.email,
          createUserDto.age,
        );
      });

      it('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let updateUserDto: UpdateUserDto;

      beforeEach(async () => {
        updateUserDto = {
          favoriteFoods: ['Olive'],
          age: 22,
        };

        user = await usersController.updateUser(
          userStub().userId,
          updateUserDto,
        );
      });

      it('then it should call userService', () => {
        expect(usersService.updateUser).toHaveBeenCalledWith(
          userStub().userId,
          updateUserDto,
        );
      });

      it('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
