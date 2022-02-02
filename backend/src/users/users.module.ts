import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './models/users.model';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers : [UsersService, UsersResolver],
    exports: [UsersService],
})
export class UsersModule {}
