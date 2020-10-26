export type Auth = {

  /**
   * Username or organization name.
   *
   * @example
   * https://github.com/sfm-tools/bighut-relabel
   *                    ^^^^^^^^  ^^^^^^^^^^^^^^
   *                    owner     repo
   */
  owner: string;

  /**
   * Repository name.
   *
   * @example
   * https://github.com/sfm-tools/bighut-relabel
   *                    ^^^^^^^^  ^^^^^^^^^^^^^^
   *                    owner     repo
   */
  repo: string;

  /**
   * GitHub access token.
   *
   * @see https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token
   */
  token: string;

}
