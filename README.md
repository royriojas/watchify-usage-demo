# bundly-usage-demo
Simple demo of using [bundly](https://npmjs.org/package/bundly)

## Notes
This branch is using an `npm-shrinkwrap.json` file which is used to force bundly to use the latest version of watchify (3.2.3) in order
to demonstrate the bug when persisting the watchify cache

- do `npm i`
- verify `watchify` is `3.2.x` doing `npm ls watchify`
- run `npm run build:watch`. Press `ctrl + c` to stop it (this first run will generate the cache)
- run `npm run build:watch` again to use the cache from the previous run
- modify any files inside the `src/` folder. You will see that no files trigger the change event because they watchers were not created

To fix it:

- In order to create the watchers put the following line inside the `collect` function.

  ```javascript
  function collect () {
    b.pipeline.get('deps').push(through.obj(function(row, enc, next) {
      var file = row.expose ? b._expose[row.id] : row.file;
      cache[file] = {
          source: row.source,
          deps: xtend({}, row.deps)
      };
      watchFile(row.file); // this is missing in 3.2.3 Adding it works again in my case.
      this.push(row);
      next()
    }));
  }
  ```

## Building it
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
