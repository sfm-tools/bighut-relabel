import { DefaultPredicateType } from '../../Types';
import { ConditionOptionsValues } from './ConditionOptionsValues';

export type WhenCommentTextConditionOptionsValues = ConditionOptionsValues & {

  exclude?: Array<DefaultPredicateType>;

  authorLogin?: string;

  creationDateRange?: {
    from?: Date;
    to?: Date;
  };

};
