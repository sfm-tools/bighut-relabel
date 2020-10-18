import { User } from './User';

export type Commit = {

  hash: string;

  message: string;

  author: User;

}
