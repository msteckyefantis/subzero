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

####No-op
If the input value is not an object, a function, or a class for either of subzero's functions, the return value will be the input value unaltered.


[![letitgo.gif](https://s27.postimg.org/gym5t7iib/letitgo.gif)](https://postimg.org/image/ptn03q7an/)


###1) subzero.freeze( functionOrClassOrObjectToFreeze )
Freeze a class or a function and its prototype. For object input, it acts the exact same way as [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

```.js
'use strict';

const subzero = require( 'subzero' );

/*
	this example uses a class, subzero.freeze also works
	with objects and functions
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
Deep freeze a class, an object, or a function. This **will** freeze any classes, functions, and objects within the class. It works by recursively freezing anything of type `"object"` or `"function"`.

```.js
'use strict';

/*
	this example uses a function, subzero.megaFreeze also works
	with objects and classes
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

f.a = {

    b: {

        c: {

            d: {

                InnerClass,

                innerFunction,

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

const reference = subzero.megaFreeze( f );

/*
	the following statements will now return true:
*/

// ( reference === f );
// Object.isFrozen( f );
// Object.isFrozen( f.a );
// Object.isFrozen( f.a.b );
// Object.isFrozen( f.a.b.c );
// Object.isFrozen( f.a.b.c.d );
// Object.isFrozen( f.prototype );
// Object.isFrozen( f.prototype.x );
// Object.isFrozen( f.prototype.x.y );
// Object.isFrozen( f.prototype.x.y.z );
// Object.isFrozen( f.prototype.x.w );
// Object.isFrozen( InnerClass );
// Object.isFrozen( InnerClass.prototype );
// Object.isFrozen( InnerClass.x );
// Object.isFrozen( InnerClass.x.y );
// Object.isFrozen( innerFunction );
// Object.isFrozen( innerFunction.x );
// Object.isFrozen( innerFunction.x.y );
// Object.isFrozen( innerFunction.prototype );
// Object.isFrozen( objectInsideAlreadyFrozenObject );
// Object.isFrozen( objectInsideAlreadyFrozenFunction );
// Object.isFrozen( functionInsideAlreadyFrozenObject );
// Object.isFrozen( functionInsideAlreadyFrozenFunction );
```

[![frieza22.gif](https://s23.postimg.org/d6ri2wwm3/frieza22.gif)](https://postimg.org/image/djiw93evr/)
