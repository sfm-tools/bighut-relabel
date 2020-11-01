# bighut-relabel

[![NPM Version](https://badgen.net/npm/v/bighut-relabel)](https://www.npmjs.com/package/bighut-relabel)
[![Node Version](https://badgen.net/npm/node/bighut-relabel)](https://www.npmjs.com/package/bighut-relabel)
![License](https://badgen.net/npm/license/bighut-relabel)
[![Coverage Status](https://coveralls.io/repos/github/sfm-tools/bighut-relabel/badge.svg?branch=main)](https://coveralls.io/github/sfm-tools/bighut-relabel?branch=main)
![Last Commit](https://badgen.net/github/last-commit/sfm-tools/bighut-relabel/main)

**Node.js** application for automatically analyzing and managing **Pull Requests** on **GitHub**.

## Features

* [Fluent API](https://en.wikipedia.org/wiki/Fluent_interface).
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

// automatic addition of labels depending on file extensions
// please note, labels should already be present in the repository

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
