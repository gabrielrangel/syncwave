import { provide } from 'inversify-binding-decorators';
import TYPES from '../../types/types';
import { User } from './user';

export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>;

@provide(TYPES.UsersService)
export default class UsersService {
    public get(id: number, name?: string): User {
        return {
            id,
            email: 'jane@doe.com',
            name: name ?? 'Jane Doe',
            status: 'Happy',
            phoneNumbers: [],
        };
    }

    public create(userCreationParams: UserCreationParams): User {
        return {
            id: Math.floor(Math.random() * 10000), // Random
            status: 'Happy',
            ...userCreationParams,
        };
    }
}

export { UsersService };
