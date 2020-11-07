import { Review } from '../ApiProviders';
import { DefaultConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

type ReviewState = 'NO_REVIEW' | 'APPROVED' | 'CHANGES_REQUESTED';

export class WhenReviewStateCondition extends BaseCondition<ReviewState, DefaultConditionOptions> {

  constructor(state: ReviewState) {
    super(state);
  }

  public async test(context: LabelerContext): Promise<boolean> {
    const state = this.predicate;
    const reviews = await context.pullRequest.reviews.get();

    if (state === 'NO_REVIEW') {
      // NOTE: The list can only contain comments.
      // I think that we should take them into account too,
      // even if the PR was not approved or changes were not requested.
      return this.testResult(!reviews.length);
    }

    let approved = false;
    let changesRequested = !!reviews.filter(
      (review: Review): boolean => (
        review.state === 'CHANGES_REQUESTED'
      )
    ).length;

    if (!changesRequested) {
      approved = reviews.filter(
        (review: Review): boolean => (
          review.state === 'APPROVED'
        )
      ).length > 0;
    } else {
      const groups = reviews.reduce(
        (r: { [key: string]: Array<boolean> }, current: Review): { [key: string]: Array<boolean> } => {
          const login = current.author.login;

          r[login] = r[login] || [];

          if (current.state !== 'COMMENTED') {
            r[login].push(current.state === 'APPROVED');
          }

          return r;
        }, {}
      );

      for (const login of Object.keys(groups)) {
        const userReviews = groups[login];

        if (userReviews.length) {
          approved = userReviews[userReviews.length - 1];

          if (!approved) {
            break;
          }
        }
      }
    }

    if (state === 'APPROVED') {
      return this.testResult(approved);
    }

    if (state === 'CHANGES_REQUESTED') {
      return this.testResult(changesRequested && !approved);
    }

    throw new Error(`State "${state}" is not supported.`);
  }

}
