#subzero

[![subzero-mortal-kombat.gif](https://s23.postimg.org/y3g3ohyez/subzero_mortal_kombat.gif)](https://postimg.org/image/dw2nw70xj/)

##About:
Freeze a class and its prototype, or freeze an object.

##install:

```
npm install subzero
```

##usage:

###subzero.freezeClass
Freeze a class and its prototype

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
	and the following statements will now throw TypeErrors in strict mode:
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

###subzero.deepFreezeClass
Deep freeze a class and its prototype. This will **not** freeze any classes within the class. It works by recursively freezing anything of type `"object"`.

```.js
'use strict';

const subzero = require( 'subzero' );

class C {}

class InnerClass {}

InnerClass.x = {

    y: {}
};

C.a = {

    b: {

        c: {

            d: {

                InnerClass
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

```
[![freezer.jpg](https://s29.postimg.org/gjwm9hhmv/freezer.jpg)](https://postimg.org/image/6zczmlsar/)

❄️🎅🏿🎅🏽🎅🏾🎅🏼⛄️🎿🗻🏂
###subzero.deepFreezeObject

Deep freeze an object. This will **not** freeze any classes within the object. It works by recursively freezing anything of type `"object"`.

```.js
'use strict';

const subzero = require( 'subzero' );

const o = {};

class InnerClass {}

InnerClass.x = {

    y: {}
};

o.a = {

    b: {

        c: {

            d: {

                InnerClass
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
```
