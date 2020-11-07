import { User } from './User';

export type Review = {

  author: User;

  commintId: string;

  comment: string;

  state: 'APPROVED' | 'CHANGES_REQUESTED' | 'COMMENTED';

  createdDate: Date;

};
