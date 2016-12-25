#subzero [![npm version](https://badge.fury.io/js/subzero.svg)](https://badge.fury.io/js/subzero) [![Build Status](https://travis-ci.org/msteckyefantis/subzero.svg?branch=master)](https://travis-ci.org/msteckyefantis/subzero)

[![mksfw.gif](https://s30.postimg.org/vd4asvu9t/mksfw.gif)](https://postimg.org/image/vd4asvu9p/)

##About:

Freeze a class, freeze a function, or freeze an object.

##install:

```
npm install subzero
```

##usage:

####function list (each function explained in more detail below):

1. [subzero.freeze](#1-subzerofreeze-functionorclassorobjecttofreeze-)
2. [subzero.megaFreeze](#2-subzeromegafreeze-functionorclassorobjecttofreeze-)

>Note: the mega freeze function was inspired by [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) and  [deep-freeze](https://github.com/substack/deep-freeze).

<br>
❄️🎅🏿🎅🏽🎅🏾🎅🏼⛄️🎿🗻🏂

####no-op:
If the input value is not an object, a function, or a class for either of subzero's functions, the return value will be the input value unaltered.


[![letitgo.gif](https://s27.postimg.org/gym5t7iib/letitgo.gif)](https://postimg.org/image/ptn03q7an/)


###1) subzero.freeze( functionOrClassOrObjectToFreeze )
Freeze a class or a function and its prototype. For object input, it acts the exact same way as [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

```.js
'use strict';

const subzero = require( 'subzero' );

/*
	this example uses a class,
    subzero.freeze also works with objects and functions
*/
class C {

	static f() { return 69; }

	f() { return 22; }
}

const reference = subzero.freeze( C );

/*
	the following statements will now return true:
*/

// ( reference === C );
// Object.isFrozen( C );
// Object.isFrozen( C.prototype );

/*
	as a result the following statements will now throw TypeErrors in strict mode:
*/

// C.g = function() { return 42 };
// C.f = function() { return 42 };
// delete C.f;
// C.constant = 42;
// C.prototype.g = function() { return 42 };
// C.prototype.f = function() { return 42 };
// delete C.prototype.f;
// C.prototype.constant = 42;
```


[![freezer.jpg](https://s29.postimg.org/gjwm9hhmv/freezer.jpg)](https://postimg.org/image/6zczmlsar/)


###2) subzero.megaFreeze( functionOrClassOrObjectToFreeze )
Deep freeze a class, a function, or an object. This will freeze any classes, functions, and objects within the class/function/object being mega-frozen. It works by recursively freezing anything of type `"object"` or `"function"`.

```.js
'use strict';

const subzero = require( 'subzero' );

/*
	this example uses a function,
    subzero.megaFreeze also works with objects and classes
*/
function f() {}

const InnerClass = class {};

InnerClass.x = {

    y: {}
};

const innerFunction = function() {};

innerFunction.x = {

    y: {}
};

const objectInsideAlreadyFrozenObject = {};

const functionInsideAlreadyFrozenObject = function() {};

const objectInsideAlreadyFrozenFunction = {};

const functionInsideAlreadyFrozenFunction = function() {};

const functionToFreeze = function() {};

functionToFreeze.objectInsideAlreadyFrozenFunction = objectInsideAlreadyFrozenFunction;

functionToFreeze.functionInsideAlreadyFrozenFunction = functionInsideAlreadyFrozenFunction;

const frozenFunctionWithNonFrozenObjectAndFunctionInside = Object.freeze( functionToFreeze );

const buff = new Buffer( 69 );

buff.x = {

    y: {},

    f: function() {}
};

f.a = {

    b: {

        c: {

            d: {

                InnerClass,

                innerFunction,

                buff,

                e: Object.freeze({

                    objectInsideAlreadyFrozenObject,

                    functionInsideAlreadyFrozenObject
                }),

                frozenFunctionWithNonFrozenObjectAndFunctionInside
            }
        }
    }
};

f.prototype.x = {

    y: {

        z: {}
    },

    w: {}
};

/*
    It's time to freeze your opponent for the flawless victory with fatality.

	None of the following assertions will throw an AssertionError:
*/

console.assert( !Object.isFrozen( f ) );
console.assert( !Object.isFrozen( f.prototype ) );
console.assert( !Object.isFrozen( f.a ) );
console.assert( !Object.isFrozen( f.a.b ) );
console.assert( !Object.isFrozen( f.a.b.c ) );
console.assert( !Object.isFrozen( f.a.b.c.d ) );
console.assert( !Object.isFrozen( f.prototype.x ) );
console.assert( !Object.isFrozen( f.prototype.x.y ) );
console.assert( !Object.isFrozen( f.prototype.x.y.z ) );
console.assert( !Object.isFrozen( f.prototype.x.w ) );
console.assert( !Object.isFrozen( InnerClass ) );
console.assert( !Object.isFrozen( InnerClass.prototype ) );
console.assert( !Object.isFrozen( InnerClass.x ) );
console.assert( !Object.isFrozen( InnerClass.x.y ) );
console.assert( !Object.isFrozen( innerFunction ) );
console.assert( !Object.isFrozen( innerFunction.prototype ) );
console.assert( !Object.isFrozen( innerFunction.x ) );
console.assert( !Object.isFrozen( innerFunction.x.y ) );
console.assert( !Object.isFrozen( objectInsideAlreadyFrozenObject ) );
console.assert( !Object.isFrozen( objectInsideAlreadyFrozenFunction ) );
console.assert( !Object.isFrozen( functionInsideAlreadyFrozenObject ) );
console.assert( !Object.isFrozen( functionInsideAlreadyFrozenObject.prototype ) );
console.assert( !Object.isFrozen( functionInsideAlreadyFrozenFunction ) );
console.assert( !Object.isFrozen( functionInsideAlreadyFrozenFunction.prototype ) );
console.assert( !Object.isSealed( buff ) ); // you cannot freeze buffers
console.assert( !Object.isFrozen( buff.x ) );
console.assert( !Object.isFrozen( buff.x.y ) );
console.assert( !Object.isFrozen( buff.x.f ) );
console.assert( !Object.isFrozen( buff.x.f.prototype ) );

// Mega Freeze f
const reference = subzero.megaFreeze( f );

console.assert( ( reference === f ) );

console.assert( Object.isFrozen( f ) );
console.assert( Object.isFrozen( f.prototype ) );
console.assert( Object.isFrozen( f.a ) );
console.assert( Object.isFrozen( f.a.b ) );
console.assert( Object.isFrozen( f.a.b.c ) );
console.assert( Object.isFrozen( f.a.b.c.d ) );
console.assert( Object.isFrozen( f.prototype.x ) );
console.assert( Object.isFrozen( f.prototype.x.y ) );
console.assert( Object.isFrozen( f.prototype.x.y.z ) );
console.assert( Object.isFrozen( f.prototype.x.w ) );
console.assert( Object.isFrozen( InnerClass ) );
console.assert( Object.isFrozen( InnerClass.prototype ) );
console.assert( Object.isFrozen( InnerClass.x ) );
console.assert( Object.isFrozen( InnerClass.x.y ) );
console.assert( Object.isFrozen( innerFunction ) );
console.assert( Object.isFrozen( innerFunction.prototype ) );
console.assert( Object.isFrozen( innerFunction.x ) );
console.assert( Object.isFrozen( innerFunction.x.y ) );
console.assert( Object.isFrozen( objectInsideAlreadyFrozenObject ) );
console.assert( Object.isFrozen( objectInsideAlreadyFrozenFunction ) );
console.assert( Object.isFrozen( functionInsideAlreadyFrozenObject ) );
console.assert( Object.isFrozen( functionInsideAlreadyFrozenObject.prototype ) );
console.assert( Object.isFrozen( functionInsideAlreadyFrozenFunction ) );
console.assert( Object.isFrozen( functionInsideAlreadyFrozenFunction.prototype ) );
const nodeVersion = Number( process.version.split( '.' )[0].substring( 1 ) + '.' + process.version.split( '.' )[1] );
if( nodeVersion >= 6.9 ) console.assert( Object.isSealed( buff ) );
console.assert( Object.isFrozen( buff.x ) );
console.assert( Object.isFrozen( buff.x.y ) );
console.assert( Object.isFrozen( buff.x.f ) );
console.assert( Object.isFrozen( buff.x.f.prototype ) );
```

[![frieza22.gif](https://s23.postimg.org/d6ri2wwm3/frieza22.gif)](https://postimg.org/image/djiw93evr/)
