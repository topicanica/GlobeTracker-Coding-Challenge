import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/users.model';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewUserInput } from './dto/new-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>) { }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async create(newUserInput: NewUserInput): Promise<User> {
    const newUser = this.userRepository.create(newUserInput);
    await this.userRepository.save(newUserInput);
    return newUser;
  }
  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`The user with id: ${id} does not exist!`);
    }
    Object.assign(user, updateUserInput);
    await this.userRepository.save(user);
    return user;
  }
  async delete(id: number) {
    await this.userRepository.delete(id);
    return id;
  }
}
