# bundly-usage-demo
Simple demo of using [bundly](https://npmjs.org/package/bundly)

## building it
- clone this repository
- do `npm i` on the root
- do `npm run build` This will build 2 targets in parallel
- do `npm run build:watch` Build the targets in watch mode and using the cache

## Other commands
- `npm run lint` to validate the code with esbeautifier and eslinter
- `npm run install-hooks` to install the pre-commit and pre-push hooks
- `npm run changelog` to generate the changelog using changelox
- `npm run do-changelog` to generate the changelog and commit it
- `npm run bump` to bump the version

## Changelog

[Changelog](./changelog.md)

## License

[MIT](./LICENSE)
