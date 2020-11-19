import { Review } from '../ApiProviders';
import { WhenReviewStateConditionOptions } from '../ConditionOptions';
import { LabelerContext } from '../LabelerContext';
import { BaseCondition } from './BaseCondition';

type ReviewState = 'NO_REVIEW' | 'APPROVED' | 'CHANGES_REQUESTED';
type Reviewer = { login: string, approved: boolean };

export class WhenReviewStateCondition extends BaseCondition<ReviewState, WhenReviewStateConditionOptions> {

  constructor(state: ReviewState, options?: WhenReviewStateConditionOptions) {
    super(state, options);
  }

  public async test(context: LabelerContext): Promise<boolean> {
    const {
      all,
      oneOf,
      value,
    } = this.getOptions(context);

    const users = [...value || []];
    const hasUsers = !!users.length;
    const state = this.predicate;
    const reviews = await context.pullRequest.reviews.get();

    if (state === 'NO_REVIEW') {
      // NOTE: The list can only contain comments.
      // I think that we should take them into account too,
      // even if the PR was not approved or changes were not requested.

      if (hasUsers) {
        if (oneOf) {
          return this.testResult(
            reviews.filter(
              (review: Review): boolean => (
                !users.includes(review.author.login)
              )
            ).length > 0,
            context
          );
        }

        if (all) {
          return this.testResult(
            reviews.every(
              (review: Review): boolean => (
                !users.includes(review.author.login)
              )
            ),
            context
          );
        }
      }

      return this.testResult(!reviews.length, context);
    }

    let approved = false;
    let changesRequested = !!reviews.filter(
      (review: Review): boolean => (
        review.state === 'CHANGES_REQUESTED'
      )
    ).length;

    if (!changesRequested) {
      if (hasUsers) {
        if (oneOf) {
          approved = reviews.filter(
            (review: Review): boolean => (
              review.state === 'APPROVED'
              && users.includes(review.author.login)
            )
          ).length > 0;
        }

        if (all) {
          approved = reviews.filter(
            (review: Review): boolean => (
              review.state === 'APPROVED'
            )
          ).every(
            (review: Review): boolean => (
              users.includes(review.author.login)
            )
          );

          if (approved) {
            users.splice(0, users.length);
          }
        }
      } else {
        approved = reviews.filter(
          (review: Review): boolean => (
            review.state === 'APPROVED'
          )
        ).length > 0;
      }
    } else {
      const reviewers = reviews.reduce(
        (r: Array<Reviewer>, current: Review): Array<Reviewer> => {
          const login = current.author.login;

          let item = r.find((item: Reviewer): boolean => (
            item.login === login
          ));

          if (!item) {
            item = {
              login,
              approved: undefined,
            };

            r.push(item);
          }

          item.approved = (
            current.state !== 'COMMENTED'
              ? current.state === 'APPROVED'
              : (
                item.approved === undefined
                  ? undefined
                  : item.approved
              )
          );

          return r;
        },
        new Array<{ login: string, approved: boolean }>()
      );

      for (const reviewer of reviewers) {
        if (reviewer.approved === undefined) {
          continue;
        }

        approved = reviewer.approved;

        if (users.length) {
          if (oneOf) {
            if (users.includes(reviewer.login)) {
              break;
            } else {
              continue;
            }
          }

          if (all) {
            const index = users.indexOf(reviewer.login);

            if (index !== -1) {
              if (
                (state === 'APPROVED' && approved)
                || (state === 'CHANGES_REQUESTED' && !approved)
              ) {
                users.splice(index, 1);
              }
            }

            if (users.length) {
              continue;
            } else {
              break;
            }
          }
        }

        if (!approved) {
          break;
        }
      }
    }

    if (all && hasUsers && users.length) {
      if (approved) {
        approved = false;
      }

      if (changesRequested) {
        changesRequested = false;
      }
    }

    if (state === 'APPROVED') {
      return this.testResult(approved, context);
    }

    if (state === 'CHANGES_REQUESTED') {
      return this.testResult(changesRequested && !approved, context);
    }

    throw new Error(`State "${state}" is not supported.`);
  }

}
