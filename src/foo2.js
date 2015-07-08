module.exports = function ( bar, baz ) {
  var barM = require( './bar' );
  barM.someMethod( bar, baz );
};
