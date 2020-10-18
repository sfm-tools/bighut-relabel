export type File = {

  status: 'added' | 'modified' | 'removed';

  content: Promise<string>;

  path: string;

  additions: number;

  deletions: number;

  changes: number;

};
