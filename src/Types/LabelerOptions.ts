export type LabelerOptions = {

  /**
   * The number of jobs processed in parallel. Default: 3.
   */
  threads?: number;

  /**
   * The number of Pull Requests to process. Default: 100.
   */
  limit?: number;

};
