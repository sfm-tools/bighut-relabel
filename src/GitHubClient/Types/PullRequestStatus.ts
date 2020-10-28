export type PullRequestStatus = {

  merged: boolean;

  /**
   * If the value is null, then GitHub has started a background job to compute the mergeability.
   */
  mergeable: boolean | null;

  rebaseable: boolean;

  mergeableState: 'clean' | 'dirty' | 'unstable' | 'unknown';

  commits: number;

  comments: number;

  changedFiles: number;

};
