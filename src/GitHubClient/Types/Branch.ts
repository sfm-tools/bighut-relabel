import { CacheableAction } from '../../CacheableAction';

export type Branch = {

  name: string;

  isExists: CacheableAction<boolean>;

}
