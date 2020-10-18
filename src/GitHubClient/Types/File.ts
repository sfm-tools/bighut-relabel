export type File = {

  status: 'added' | 'modified' | 'removed';

  content: Promise<string>;

  path: string;

  patch: string;

  additions: number;

  deletions: number;

  changes: number;

};
