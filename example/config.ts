import { createConfig, IConfig } from 'bighut-relabel';

export function makeExampleConfig(): IConfig {
  const config = createConfig();

  config
    .addLabel('back end')
    .whenFilePath(/\.cs$/gi);

  config
    .addLabel('front end')
    .whenFilePath(/\.(((t|j)sx?)|(s?css))$/gi);

  config
    .addLabel('database')
    .whenFilePath(/\.sql$/gi);

  return config;
}
