module.exports = function ( bar, baz ) {
  var barM = require( './bar' );
  barM.someMethod( bar, baz );

  var modules = requireArr( 'arr/**/*.js' );
  modules.forEach( function ( m ) {
    m.init && m.init();
  } );
};
