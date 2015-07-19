// foo.js
module.exports = function ( bar, baz ) {
  var foo2 = require( './foo2' )( bar, baz );
  console.log( foo2 );

  var modules = requireArr( 'arr/**/*.js' );
  modules.forEach( function ( m, i ) {
    m.init && m.init( i );
  } );
};
