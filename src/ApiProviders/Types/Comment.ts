import { User } from './User';

export type Comment = {

  id: number;

  author: User;

  text: string;

  createdDate: Date;

  updatedDate?: Date;

}
