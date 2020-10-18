export type PullRequestStatus = {

  merged: boolean;

  mergeable: boolean;

  rebaseable: boolean;

  mergeableState: 'clean' | 'dirty' | 'unstable';

};
