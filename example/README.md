# Configuration example

This is an example of a possible **bighut-relabel** configuration for your project.

You can use this example as a template.

## Install

```bash
git clone https://github.com/sfm-tools/bighut-relabel.git
cd bighut-relabel/example
npm install
```

## Usage

1. You need to create a file `./.auth.json` with access settings:

```json
{
  "github": {
    "token": "%YOUR GITHUB TOKEN HERE%",
    "owner": "%GITHUB USERNAME OR ORGANIZATION NAME HERE%",
    "repo": "%REPOSITORY NAME HERE%"
  }
}
```

For guidance on obtaining a GitHub token, see the following link:
https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token

You can find the username and repository name in the URL:

```
https://github.com/sfm-tools/bighut-relabel
                   ^^^^^^^^  ^^^^^^^^^^^^^^
                   owner     repo
```

2. Check the `./index.ts` file.

3. Run one of two commands in the terminal:

```bash
# check without making changes
npm run check
# check and fix
npm run fix
```

## License
MIT
