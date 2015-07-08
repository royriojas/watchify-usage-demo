module.exports = function ( cli ) {
  //custom arguments can be pass using the `cli.opts._` array
  var debug = cli.opts._.indexOf( 'debug' ) > -1;
  var cache = cli.opts._.indexOf( 'b-cache' ) > -1;
  var watch = cli.opts._.indexOf( 'b-watch' ) > -1;

  return {
    src: 'src/target2.js',
    dest: 'dist/target2.js',
    options: {
      cache: cache,
      watch: watch,
      shimixify: {
        shims: {
          react: 'global.React'
        }
      },
      preBundleCB: function ( b ) {
        if ( debug ) {
          cli.log( 'exposing ./src/bar.js as bar' );
        }

        b.require( './src/bar.js', { expose: 'bar' } );
      }
    }
  };
};
