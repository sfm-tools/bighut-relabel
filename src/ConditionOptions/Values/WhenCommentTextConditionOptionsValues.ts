import { ConditionOptionsValues } from './ConditionOptionsValues';

export type WhenCommentTextConditionOptionsValues = ConditionOptionsValues & {

  authorLogin?: string;

  creationDateRange?: {
    from?: Date;
    to?: Date;
  };

};
