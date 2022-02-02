import { PartialType } from '@nestjs/mapped-types';
import { NewUserInput } from './new-user.input';

export class UpdateUserInput extends PartialType(NewUserInput) { }
