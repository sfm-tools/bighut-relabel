import { Branch } from './Branch';
import { Comment } from './Comment';
import { Commit } from './Commit';
import { File } from './File';
import { Milestone } from './Milestone';
import { PullRequestStatus } from './PullRequestStatus';
import { User } from './User';

export type PullRequest = {

  author: User;

  code: number;

  description: string;

  htmlUrl: string;

  id: number;

  labels: Array<string>;

  milestone: Milestone;

  sourceBranch: Branch;

  state: 'open' | 'closed';

  targetBranch: Branch;

  title: string;

  createdDate: Date;

  updatedDate?: Date;

  mergedDate?: Date;

  closedDate?: Date;

  comments: () => Promise<Array<Comment>>;

  commits: () => Promise<Array<Commit>>;

  files: () => Promise<Array<File>>;

  statusInfo: () => Promise<PullRequestStatus>;

};
