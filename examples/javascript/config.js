const { createConfig } = require('bighut-relabel');

const config = createConfig();

// please make sure the specified labels are created in your repository
config
  .addLabel('back end')
  .whenFilePath(/\.cs$/);

config
  .addLabel('front end')
  .whenFilePath(/\.(((t|j)sx?)|(s?css))$/);

config
  .addLabel('database')
  .whenFilePath(/\.sql$/);

module.exports = config;
