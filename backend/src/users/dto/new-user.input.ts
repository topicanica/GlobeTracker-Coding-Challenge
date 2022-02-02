import { Field, GraphQLISODateTime, ID, InputType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsMobilePhone, IsDate, IsAlpha, IsNumberString } from 'class-validator';
import { type } from "os";
import { UserType } from "../enums/user-type.enum";

@InputType()
export class NewUserInput {
    @Field()
    @IsAlpha()
    firstName: string;

    @Field()
    @IsAlpha()
    lastName: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNumberString()
    @IsMobilePhone('fo-FO')
    phoneNumber: string;

    @Field(type => UserType)
    userType: UserType;
}


