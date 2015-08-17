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
        browerifyOpts: {
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
        //minimize: true,
        //revision: '123',
        transforms: {
          babelify: {
            config: {
              exclude: [
                //'/module/'
              ]
            }
          },
          shimixify: {
            config: {
              shims: {
                react: 'global.React'
              }
            }
          }
        },

        preBundleCB: function ( b ) {
          if ( debug ) {
            cli.log( 'exposing bar as ./src/bar.js' );
          }
          b.transform( require( 'consoleify' ) );
          b.require( './src/bar.js', { expose: 'bar' } );
        }
      }
    }
  };
};
