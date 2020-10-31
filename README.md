# bighut-relabel

**Node.js** application for automatically analyzing and managing **Pull Requests** on **GitHub**.

## Features

* [Fluent API](https://en.wikipedia.org/wiki/Fluent_interface)
* Getting information about a Pull Request, including title, description, author info,
  labels, milestone, merge direction, conflicts, files, commits, and comments.
* Updating title, description, labels, and milestone.
* Programmatically adding new comments to Pull Requests.
* Simple conditions for Pull Requests analysis.
* Flex customization.

## Install

```bash
npm install bighut-relabel
```

## Usage

```js
import { createConfig, fix, test } from 'bighut-relabel';

// create config
const config = createConfig();

config
  .addLabel('back end')
  .whenFilePath(/\.cs$/gi);

config
  .addLabel('front end')
  .whenFilePath(/\.(((t|j)sx?)|(s?css))$/gi);

// repository options
const options = {
  config: config,
  auth: {
    owner: '%GITHUB USERNAME OR ORG NAME HERE%',
    repo:  '%GITHUB REPOSITORY NAME HERE%',
    // https://github.com/sfm-tools/bighut-relabel
    //                   ^^^^^^^^  ^^^^^^^^^^^^^^
    //                   user      repo
    token: '%YOUR GITHUB TOKEN HERE%',
    // https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token
  },
  // optional
  /*
  options: {
    threads: 10,
    limit: 50,
    rateLimitNotify: 2500,
    cache: {
      ttl: 600, // caching for 600 seconds
    },
  }
  */
};

// preview - without making any changes to pull requests
test(options);

// or apply changes to pull requests
// fix(options);
```

## License
MIT
