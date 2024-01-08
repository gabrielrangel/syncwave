import { inject } from 'inversify';
import {
    interfaces,
    controller,
    httpGet,
    httpPost,
    queryParam,
    requestBody,
    requestParam,
} from 'inversify-express-utils';
import { User } from './user';
import { UsersService, UserCreationParams } from './usersService';
import TYPES from '../../types/types';

@controller('/users')
export class UsersController implements interfaces.Controller {
    constructor(
        @inject(TYPES.UsersService) private usersService: UsersService
    ) {}

    @httpGet('/:userId')
    public async getUser(
        @requestParam('userId') userId: number,
        @queryParam('name') name?: string
    ): Promise<User> {
        return this.usersService.get(userId, name);
    }

    @httpPost('/')
    public async createUser(
        @requestBody() body: UserCreationParams
    ): Promise<void> {
        this.usersService.create(body);
        return;
    }
}

export default UsersController;
