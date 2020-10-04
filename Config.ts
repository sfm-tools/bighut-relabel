// TODO: Customization
type LabelMap = {
  label: string,
  test: (value: string) => boolean,
};

type MilestoneMap = {
  milestone: string,
  branches: Array<string>,
};

type Config = {
  labels: Array<LabelMap>,
  milestone: Array<MilestoneMap>,
};

export const config: Config = {
  labels: [
    {
      label: 'back end',
      test: (value: string): boolean => /.cs$/gi.test(value),
    },
    {
      label: 'front end',
      test: (value: string): boolean => /.(((t|j)sx?)|(p?css))/gi.test(value),
    },
    {
      label: 'razor',
      test: (value: string): boolean => /.cshtml$/gi.test(value),
    },
    {
      label: 'config',
      test: (value: string): boolean => {
        return /.json|.config.js|webpack\/.+.js|.env|.eslintignore|.eslintrc.js|.gitignore|.yml$/gi.test(value)
      },
    }
  ],
  milestone: [
    {
      milestone: 'Release-9',
      branches: ['master'],
    },
    {
      milestone: 'Release-8',
      branches: ['Release-8'],
    },
    {
      milestone: 'Test Prod',
      branches: ['test-prod'],
    },
    {
      milestone: 'Demo',
      branches: ['demo'],
    },
  ],
};
