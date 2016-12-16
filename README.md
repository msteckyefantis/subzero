#subzero [![npm version](https://badge.fury.io/js/subzero.svg)](https://badge.fury.io/js/subzero) [![Build Status](https://travis-ci.org/msteckyefantis/subzero.svg?branch=master)](https://travis-ci.org/msteckyefantis/subzero)

[![mksfw.gif](https://s30.postimg.org/vd4asvu9t/mksfw.gif)](https://postimg.org/image/vd4asvu9p/)

##About:

Freeze a class and its prototype, or freeze an object.

##install:

```
npm install subzero
```

##usage:

####function list (each function explained in more detail below):

1. [subzero.freeze](#1-subzerofreeze-functionorclassorobjecttofreeze-)
2. [subzero.deepFreeze](#2-subzerodeepfreeze-functionorclassorobjecttofreeze-)
3. [subzero.megaFreeze](#3-subzeromegafreeze-functionorclassorobjecttofreeze-)

>Note: the deep freeze function was inspired by [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze). The mega freeze function was inspired by [deep-freeze](https://github.com/substack/deep-freeze).

<br>



###1) subzero.freeze( functionOrClassOrObjectToFreeze )
Freeze a class or function and its prototype. For object input, it acts the exact same way as Object.freeze.

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

[![letitgo.gif](https://s27.postimg.org/gym5t7iib/letitgo.gif)](https://postimg.org/image/ptn03q7an/)

❄️🎅🏿🎅🏽🎅🏾🎅🏼⛄️🎿🗻🏂
###2) subzero.deepFreeze( functionOrClassOrObjectToFreeze )
Deep freeze a class, object, or function (and its prototype for classes/functions). This will **not** freeze any classes or functions within the input object/function/class. It works by recursively freezing anything of type `"object"`.

```.js
'use strict';

const subzero = require( 'subzero' );

/*
	this example uses an object, subzero.deepFreeze also works
	with functions and classes
*/
const o = {};

class InnerClass {}

InnerClass.x = {

    y: {}
};

function InnerFunction() {}

InnerFunction.x = {

    y: {}
};

const willBeFrozen = {};

o.a = {

    b: {

        c: {

            d: {

                InnerClass,

                InnerFunction,

                e: Object.freeze({ willBeFrozen })
            }
        }
    }
};

o.x = {

    y: {

        z: {}
    },

    w: {}
};

const reference = subzero.deepFreeze( o );

/*
	the following statements will now return true:
*/

// ( reference === o );
// Object.isFrozen( o );
// Object.isFrozen( o.a );
// Object.isFrozen( o.a.b );
// Object.isFrozen( o.a.b.c );
// Object.isFrozen( o.a.b.c.d );
// Object.isFrozen( o.x );
// Object.isFrozen( o.x.y );
// Object.isFrozen( o.x.y.z );
// Object.isFrozen( o.x.w );
// !Object.isFrozen( InnerClass );
// !Object.isFrozen( InnerClass.x );
// !Object.isFrozen( InnerClass.x.y );
// !Object.isFrozen( InnerFunction );
// !Object.isFrozen( InnerFunction.x );
// !Object.isFrozen( InnerFunction.x.y );
// Object.isFrozen( willBeFrozen );
```

[![freezer.jpg](https://s29.postimg.org/gjwm9hhmv/freezer.jpg)](https://postimg.org/image/6zczmlsar/)


###3) subzero.megaFreeze( functionOrClassOrObjectToFreeze )
Deep freeze a class, object, or function and its prototype. This **will** freeze any classes, functions, and objects within the class. It works by recursively freezing anything of type `"object"` or `"function"`, if they are **unfrozen**. Note the `* MEGA FREEZE CORNER CASE`.

```.js
'use strict';

/*
	this example uses an function, subzero.megaFreeze also works
	with objects and classes
*/
function f() {}

class InnerClass {};

InnerClass.x = {

    y: {}
};

const controlFunction = function() {};

controlFunction.x = {

    y: {}
};

/* MEGA FREEZE CORNER CASE:
	be careful about objects/functions within already frozen objects and functions
*/
const wontBeFrozen = {};

f.a = {

    b: {

        c: {

            d: {

                InnerClass,

                controlFunction,

                e: Object.freeze({ wontBeFrozen })
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
// Object.isFrozen( InnerClass.x );
// Object.isFrozen( InnerClass.x.y );
// Object.isFrozen( controlFunction );
// Object.isFrozen( controlFunction.x );
// Object.isFrozen( controlFunction.x.y );
// !Object.isFrozen( wontBeFrozen );
```

[![frieza22.gif](https://s23.postimg.org/d6ri2wwm3/frieza22.gif)](https://postimg.org/image/djiw93evr/)