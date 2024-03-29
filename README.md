# bighut-relabel

[![NPM Version](https://badgen.net/npm/v/bighut-relabel)](https://www.npmjs.com/package/bighut-relabel)
![License](https://badgen.net/npm/license/bighut-relabel)
[![Build Status](https://travis-ci.com/sfm-tools/bighut-relabel.svg?branch=main)](https://travis-ci.com/sfm-tools/bighut-relabel)
[![Coverage Status](https://coveralls.io/repos/github/sfm-tools/bighut-relabel/badge.svg?branch=main)](https://coveralls.io/github/sfm-tools/bighut-relabel?branch=main)
![Last Commit](https://badgen.net/github/last-commit/sfm-tools/bighut-relabel/main)
[![Node Version](https://badgen.net/npm/node/bighut-relabel)](https://www.npmjs.com/package/bighut-relabel)

**Node.js** library for automatically analyzing and managing
**[pull requests](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests)**
on **GitHub**.

## Features

* [Fluent API](https://en.wikipedia.org/wiki/Fluent_interface).
* Getting information about a pull request, including state, title, description, author info,
  labels, milestone, merge direction, conflicts, files, commits, comments, and reviewers.
* Updating title, description, labels, and milestone.
* Adding new comments to pull requests.
* Creation and removing code review requests.
* Deleting branches.
* Simple conditions for pull requests analysis.
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
  .whenFilePath(/\.cs$/);

config
  .addLabel('front end')
  .whenFilePath(/\.(((t|j)sx?)|(s?css))$/);

// repository options
const repository = {
  config: config,
  auth: {
    owner: '%GITHUB USERNAME OR ORG NAME HERE%',
    repo:  '%GITHUB REPOSITORY NAME HERE%',
    // https://github.com/sfm-tools/bighut-relabel
    //                   ^^^^^^^^  ^^^^^^^^^^^^^^
    //                   owner     repo
    token: '%YOUR GITHUB TOKEN HERE%',
  },
  // optional settings
  /*
  options: {
    threads: 10,
    limit: 50,
    rateLimitNotify: 2500,
    cache: {
      ttl: 600, // caching for 600 seconds
    },
    log: 'actions', // levels: info (default), action, warining, error, debug, custom
  }
  */
};

// preview - without making any changes to pull requests
test(repository);

// or apply changes to pull requests
// fix(repository);
```

## License
MIT
