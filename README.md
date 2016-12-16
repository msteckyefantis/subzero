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

1. [subzero.freezeClass](#1-subzerofreezeclass-classtofreeze-)
2. [subzero.deepFreezeClass](#2-subzerodeepfreezeclass-classtofreeze-)
3. [subzero.deepFreezeObject](#3-subzerodeepfreezeobject-objecttofreeze-)
4. [subzero.megaFreezeClass](#4-subzeromegafreezeclass-objecttofreeze-)
5. [subzero.megaFreezeObject](#5-subzeromegafreezeclass-objecttofreeze-)

<br>

###1) subzero.freezeClass( ClassToFreeze )
Freeze a class and its prototype.

```.js
'use strict';

const subzero = require( 'subzero' );

class C {

	static f() { return 69; }

	f() { return 22; }
}

subzero.freezeClass( C );

/*
	the following statements will now return true:
*/

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

###2) subzero.deepFreezeClass( ClassToFreeze )
Deep freeze a class and its prototype. This will **not** freeze any classes or functions within the class. It works by recursively freezing anything of type `"object"`.

```.js
'use strict';

const subzero = require( 'subzero' );

class C {}

class InnerClass {}

InnerClass.x = {

    y: {}
};

function InnerFunction() {}

InnerFunction.x = {

    y: {}
};

const willBeFrozen = {};

C.a = {

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

C.prototype.x = {

    y: {

        z: {}
    },

    w: {}
};

subzero.deepFreezeClass( C );

/*
	the following statements will now return true:
*/

// Object.isFrozen( C );
// Object.isFrozen( C.a );
// Object.isFrozen( C.a.b );
// Object.isFrozen( C.a.b.c );
// Object.isFrozen( C.a.b.c.d );
// Object.isFrozen( C.prototype );
// Object.isFrozen( C.prototype.x );
// Object.isFrozen( C.prototype.x.y );
// Object.isFrozen( C.prototype.x.y.z );
// Object.isFrozen( C.prototype.x.w );
// !Object.isFrozen( InnerClass );
// !Object.isFrozen( InnerClass.x );
// !Object.isFrozen( InnerClass.x.y );
// !Object.isFrozen( InnerFunction );
// !Object.isFrozen( InnerFunction.x );
// !Object.isFrozen( InnerFunction.x.y );
// Object.isFrozen( C.a.b.c.d.e.willBeFrozen );
```

❄️🎅🏿🎅🏽🎅🏾🎅🏼⛄️🎿🗻🏂
###3) subzero.deepFreezeObject( objectToFreeze )

Deep freeze an object. This will **not** freeze any classes or functions within the object. It works by recursively freezing anything of type `"object"`.

```.js
'use strict';

const subzero = require( 'subzero' );

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

subzero.deepFreezeObject( o );

/*
	the following statements will now return true:
*/

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
// Object.isFrozen( o.a.b.c.d.e.willBeFrozen );
```

[![freezer.jpg](https://s29.postimg.org/gjwm9hhmv/freezer.jpg)](https://postimg.org/image/6zczmlsar/)

###4) subzero.megaFreezeClass( objectToFreeze )

Deep freeze an object. This **will** freeze any classes, functions, and objects within the class. It works by recursively freezing anything of type `"object"` or `"function"`. Note the `MEGA FREEZE CORNER CASE *`.

```.js
'use strict';

class C {};

class InnerClass {};

InnerClass.x = {

    y: {}
};

const controlFunction = function() {};

controlFunction.x = {

    y: {}
};

// * MEGA FREEZE CORNER CASE: be careful about objects within already frozen objects
const wontBeFrozen = {};

C.a = {

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

C.prototype.x = {

    y: {

        z: {}
    },

    w: {}
};


/*
	the following statements will now return true:
*/

// Object.isFrozen( C );
// Object.isFrozen( C.a );
// Object.isFrozen( C.a.b );
// Object.isFrozen( C.a.b.c );
// Object.isFrozen( C.a.b.c.d );
// Object.isFrozen( C.prototype );
// Object.isFrozen( C.prototype.x );
// Object.isFrozen( C.prototype.x.y );
// Object.isFrozen( C.prototype.x.y.z );
// Object.isFrozen( C.prototype.x.w );
// Object.isFrozen( InnerClass );
// Object.isFrozen( InnerClass.x );
// Object.isFrozen( InnerClass.x.y );
// Object.isFrozen( controlFunction );
// Object.isFrozen( controlFunction.x );
// Object.isFrozen( controlFunction.x.y );
// !Object.isFrozen( C.a.b.c.d.e.wontBeFrozen );
```

[![frieza22.gif](https://s23.postimg.org/d6ri2wwm3/frieza22.gif)](https://postimg.org/image/djiw93evr/)

###5) subzero.megaFreezeClass( objectToFreeze )

Deep freeze an object. This **will** freeze any classes, functions, and objects within the object. It works by recursively freezing anything of type `"object"` or `"function"`. Note the `MEGA FREEZE CORNER CASE *`.

```.js
'use strict';

class C {};

class InnerClass {};

InnerClass.x = {

    y: {}
};

const controlFunction = function() {};

controlFunction.x = {

    y: {}
};

// MEGA FREEZE CORNER CASE *: be careful about objects within already frozen objects
const wontBeFrozen = {};

C.a = {

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

C.prototype.x = {

    y: {

        z: {}
    },

    w: {}
};


/*
	the following statements will now return true:
*/

// Object.isFrozen( C );
// Object.isFrozen( C.a );
// Object.isFrozen( C.a.b );
// Object.isFrozen( C.a.b.c );
// Object.isFrozen( C.a.b.c.d );
// Object.isFrozen( C.prototype );
// Object.isFrozen( C.prototype.x );
// Object.isFrozen( C.prototype.x.y );
// Object.isFrozen( C.prototype.x.y.z );
// Object.isFrozen( C.prototype.x.w );
// Object.isFrozen( InnerClass );
// Object.isFrozen( InnerClass.x );
// Object.isFrozen( InnerClass.x.y );
// Object.isFrozen( controlFunction );
// Object.isFrozen( controlFunction.x );
// Object.isFrozen( controlFunction.x.y );
// !Object.isFrozen( C.a.b.c.d.e.wontBeFrozen );
```
