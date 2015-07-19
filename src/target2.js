module.exports = function ( abc, bcd ) {
  var bar = require( './bar' );
  bar.anotherMethod( abc, bcd );
  // some comment
  var views = require( './view' );
  console.log( views );
  var react = require( 'react' );
  console.log( react );
  var win = require( 'window' );
  console.log( win.name );
};
