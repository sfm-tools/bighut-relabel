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
  // TODO: create manually the required labels in the repository
  // and map labels to files
  labels: [
    {
      label: 'back end',
      test: (value: string): boolean => /.cs$/gi.test(value),
    },
    {
      label: 'front end',
      test: (value: string): boolean => /.(((t|j)sx?)|(p?css))$/gi.test(value),
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
  // TODO: create manually the required milestones in the repository
  // and map target branches to milestones
  milestone: [
    {
      milestone: 'v9',
      branches: ['master'],
    },
    {
      milestone: 'v8',
      branches: ['v8'],
    },
    {
      milestone: 'Test',
      branches: ['test'],
    },
  ],
};
