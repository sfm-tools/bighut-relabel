import { CacheableAction } from '../../CacheableAction';

export type File = {

  status: 'added' | 'modified' | 'removed';

  content: CacheableAction<string>;

  filePath: string;

  patch: string;

  additions: number;

  deletions: number;

  changes: number;

};
