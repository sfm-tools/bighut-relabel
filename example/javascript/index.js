const fs = require('fs');
const { fix, test } = require('bighut-relabel');

const config = require('./config.js');

const authPath = '.auth.json';

// get GitHub repository access settings
if (!fs.existsSync(authPath)) {
  throw new Error(
    `File "${authPath}" not found. ` +
    `Please create "${authPath}" file in the root directory of the application. ` +
    `You can use file ".auth.example.json" as a sample.`
  );
}

const { github: auth } = JSON.parse(fs.readFileSync(authPath, 'utf8'));

// repository settings
const repository = {
  auth,
  config,
  /*
  // additional settings
  options: {
    threads: 10, // default: 3
    limit: 50, // default: 100
    rateLimitNotify: 2500, // because the number of requests to the GitHub API is limited to 5000 requests per hour
    cache: {
      ttl: 600, // caching for 600 seconds
    },
    log: 'action', // you can use log level: info (default), action, warning, error, debug, and also custom winstone logger options
  },
  */
};

if (process.argv.includes('--test')) {
  test(repository);
} else {
  fix(repository);
}
