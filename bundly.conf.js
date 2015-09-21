module.exports = function ( cli ) {
  // custom arguments can be pass using the `cli.opts._` array
  // for example bundly -c bundly-config -- debug b-cache b-watch
  // to enable debug, cache and watch.
  var debug = cli.opts._.indexOf( 'debug' ) > -1;
  var noCache = cli.opts._.indexOf( 'no-cache' ) > -1;
  var watch = cli.opts._.indexOf( 'b-watch' ) > -1;

  cli.subtle( 'debug', debug );
  cli.subtle( 'no-cache', noCache );
  cli.subtle( 'watch', watch );

  return {
    target2: {
      files: [
        {
          src: 'src/foo2.js',
          dest: 'dist/foo2.js'
        }
      ],
      options: {
        browserifyOpts: {
          debug: true
        }
      }
    },
    target: {
      src: 'src/target2.js',
      dest: 'dist/target3.js',
      options: {
        useCache: !noCache,
        watch: watch,
        browserifyOpts: {
          // proper way to ignore the transforms
          // specified in a package.json file
          ignoreTransform: [
            'babelify',
            'shimixify',
            'simplessy',
            'require-arr'
          ]
        },
        //minimize: true,
        //revision: '123',
        preBundleCB: function ( b ) {
          if ( debug ) {
            cli.log( 'exposing bar as ./src/bar.js' );
          }

          // once ignored above
          // they can be required back here in a different order
          // or with a different configuration
          b.transform( require('babelify') );
          b.transform( require('require-arr') );
          b.transform( require('simplessy') );

          b.transform( require( 'shimixify').configure( {
            shims: {
              window: 'global.window',
              document: 'global.document',
              react: 'global.React'
            }
          } ))

          b.transform( require( 'consoleify' ) );

          b.require( './src/bar.js', { expose: 'bar' } );
        }
      }
    }
  };
};
