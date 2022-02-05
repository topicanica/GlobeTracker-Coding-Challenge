import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsMobilePhone, IsAlpha, IsNumberString } from 'class-validator';
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


