module.exports = function ( bar, baz ) {
  var foo2 = require( './foo2' )( bar, baz );
  console.log( foo2 );
};
