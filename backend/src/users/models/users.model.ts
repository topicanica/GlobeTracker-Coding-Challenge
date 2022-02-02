import { Field, ID, ObjectType, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../enums/user-type.enum';

@Entity()
@ObjectType({
    description: 'user ',
})
export class User {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id: number;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    phoneNumber: string;

    @Column()
    @Field(type => UserType)
    userType: UserType;

    @Column()
    @CreateDateColumn()
    @Field(type => GraphQLISODateTime)
    dateCreated: Date;
}