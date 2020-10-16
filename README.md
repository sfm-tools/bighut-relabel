# bighut-relabel

Node.js console application that allows set labels to **Pull Request** depending on the code as well fix milestones.

## Usage

1. You need to create a file with repository access settings: `./.auth.json`.

```json
{
  "token": "%YOUR TOKEN HERE%",
  "user": "%USERNAME OR ORG NAME HERE%",
  "repo": "%REPOSITORY NAME HERE%"
}
```

For guidance on obtaining a token, see the following link:
https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token

You can find the username and repository name in the URL:

```
https://github.com/sfm-tools/github-labeler
                   ^^^^^^^^  ^^^^^^^^^^^^^^
                   user      repo
```

2. Check the `./Config.ts` file.

3. Run one of two commands in the terminal:
```bash
# check without making changes
npm run check
# check and fix
npm run fix
```

## License
MIT
