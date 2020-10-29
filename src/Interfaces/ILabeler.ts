export interface ILabeler {

  test(): Promise<void>;

  fix(): Promise<void>;

}
