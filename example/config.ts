import { createConfig, IConfig } from 'bighut-relabel';

export function makeConfig(): IConfig {
  const config = createConfig();

  config
    .addLabel('back end')
    .whenFilePath(/\.cs$/);

  config
    .addLabel('front end')
    .whenFilePath(/\.(((t|j)sx?)|(s?css))$/);

  config
    .addLabel('database')
    .whenFilePath(/\.sql$/);

  return config;
}
