import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { NewUserInput } from './dto/new-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersService } from './users.service';

@Controller('users')
export default class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    async getAllUsers() {
        return await this.userService.findAll();
    }
    @Get(':id')
    async getUserById(@Param('id') id: number) {
        return await this.userService.findById(id);
    }
    @Post()
    async createUser(@Body() newUser: NewUserInput) {
        return await this.userService.create(newUser);
    }
    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() updatedUser: UpdateUserInput) {
        return await this.userService.update(id, updatedUser);
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        await this.userService.delete(id);
        return id;
    }
}