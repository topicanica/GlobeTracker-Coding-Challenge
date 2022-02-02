import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewUserInput } from './dto/new-user.input';
import { User } from './models/users.model'
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
    constructor(private readonly userService: UsersService) { }
    @Query(returns => User)
    async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
        const user = await this.userService.findById(id);
        return user;
    }
    @Query(returns => [User])
    async getUsers(): Promise<User[]> {
        const users = await this.userService.findAll();
        return users;
    }
    @Mutation(returns => User)
    async createUser(@Args('newUserInput', { type: () => NewUserInput }) newUserInput: NewUserInput): Promise<User> {
        const createdUser = await this.userService.create(newUserInput);
        return createdUser;
    }

    @Mutation(returns => User)
    async updateUser(@Args('newUserInput', { type: () => NewUserInput }) newUserInput: NewUserInput, @Args('id', { type: () => Int }) id: number): Promise<User> {
        const updatedUser = await this.userService.update(id, newUserInput);
        return updatedUser;
    }
    @Mutation(returns => Int)
    async deleteUser(@Args('id', { type: () => Int }) id: number) {
        await this.userService.delete(id);
        return id;
    }
}

