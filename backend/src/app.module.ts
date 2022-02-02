import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import UsersController from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot({
      include: [UsersModule],
      autoSchemaFile: 'schema.gql',
      //skipResolverArgs: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      autoLoadEntities: true,
      synchronize: true, //should have migrations 
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule { }
